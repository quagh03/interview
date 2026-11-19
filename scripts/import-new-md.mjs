import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tagsForQuestion } from './tag-rules.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = fs.readFileSync(path.join(root, 'new.md'), 'utf8');
const outRoot = path.join(root, 'src/content/questions');

const topicRows = [
  ['1.', 'Java Core', 'java-core', 'Java Core'],
  ['2.', 'JVM', 'jvm', 'Memory'],
  ['3.', 'Spring', 'spring', 'Spring'],
  ['4.', 'JPA & Hibernate', 'jpa', 'JPA'],
  ['5.', 'Database', 'database', 'Database'],
  ['6.', 'Security', 'security', 'Authentication'],
  ['7.', 'System Design', 'system-design', 'Kiến trúc'],
  ['8.', 'Redis & Kafka', 'redis-kafka', 'Redis'],
  ['9.', 'DevOps', 'devops', 'Nền tảng'],
  ['10.', 'Tình huống', 'tinh-huong', 'Production'],
  ['11.', 'Coding', 'coding', 'Bài tập'],
];

const questions = [];
let topic = null;
let dir = null;
let section = '';
let order = 0;
let mode = 'skip';
let current = null;
let preamble = [];

function slugify(input) {
  const value = input
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72);
  return value || 'cau-hoi';
}

function clean(lines) {
  let inFence = false;
  const out = [];
  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      out.push(line.trim());
      continue;
    }
    out.push(inFence ? line : line.replace(/^ {1,4}/, ''));
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function skipPreamble(line) {
  const text = line.trim();
  if (!text) return true;
  if (text.startsWith('|') || text.startsWith('🤯') || text.startsWith('[')) return true;
  if (/https?:\/\//.test(text)) return true;
  if (/Medium|linkedin|blog/i.test(text)) return true;
  if (/^(What Are|Client-Server|Must-Know|40\+|2\. Introduction|Đây là nhóm)/.test(text)) return true;
  return false;
}

function takePreamble() {
  const text = preamble.join('\n').trim();
  preamble = [];
  return text;
}

function closeCurrent() {
  if (!current) return;
  const answer = clean(current.lines);
  const body = [current.preamble, answer].filter(Boolean).join('\n\n');
  questions.push({ ...current, body });
  current = null;
}

function addQuestion(title, extra = {}) {
  order += 1;
  const pending = takePreamble();
  current = {
    title: title.trim(),
    topic,
    dir,
    section,
    lines: [],
    preamble: pending,
    order,
    ...extra,
  };
}

function levelFor(item) {
  if (item.codingLevel === 'Easy') return 'junior';
  if (item.codingLevel === 'Medium') return 'mid';
  if (item.codingLevel === 'Hard') return 'senior';

  const blob = `${item.section} ${item.title}`.toLowerCase();
  if (item.topic === 'Tình huống') return 'senior';
  if (item.topic === 'System Design') {
    if (item.section.includes('thực tế')) return 'senior';
    if (/saga|cqrs|eventual|idempotency|circuit breaker|distributed system|rate limiting/.test(blob)) return 'senior';
    return 'mid';
  }
  if (item.topic === 'JVM') {
    if (/g1gc|memory leak|debug|classloader|parent delegation/.test(blob)) return 'senior';
    if (/jvm, jre|heap và stack|garbage collection là gì/.test(blob)) return 'junior';
    return 'mid';
  }
  if (item.topic === 'Java Core') {
    if (item.section.startsWith('OOP')) return 'intern';
    if (item.section.startsWith('Collections')) {
      return /concurrenthashmap|fail-fast|mutable object/.test(blob) ? 'mid' : 'junior';
    }
    if (item.section.startsWith('Java 8')) {
      return /parallel stream|completablefuture/.test(blob) ? 'mid' : 'junior';
    }
    if (item.section.startsWith('Multithreading')) {
      return /deadlock|memory model|threadlocal|reentrantlock|countdownlatch/.test(blob) ? 'senior' : 'mid';
    }
  }
  if (item.topic === 'Spring') {
    if (/circular dependency|bean lifecycle|conditionalonproperty|custom auto/.test(blob)) return 'mid';
    if (item.section.includes('MVC') && /cors|filter và interceptor|validate/.test(blob)) return 'mid';
    return 'junior';
  }
  if (item.topic === 'JPA & Hibernate') {
    if (/jpa và hibernate|orm là gì|entity là gì/.test(blob)) return 'junior';
    return 'mid';
  }
  if (item.topic === 'Database') {
    if (item.section.startsWith('Tối ưu') || /lost update|10 triệu|thiết kế database/.test(blob)) return 'senior';
    if (item.section.startsWith('Index') || item.section.startsWith('Transaction')) return 'mid';
    if (/window function|keyset|thuật toán|sql injection|chuẩn hóa|stored procedure/.test(blob)) return 'mid';
    return 'junior';
  }
  if (item.topic === 'Security') {
    return /authentication và authorization|jwt là gì|password nên/.test(blob) ? 'junior' : 'mid';
  }
  if (item.topic === 'Redis & Kafka') {
    if (/exactly-once end-to-end|tránh xử lý một message/.test(blob)) return 'senior';
    if (item.section.startsWith('Kafka') || /distributed lock|penetration|avalanche|persistence|invalidation/.test(blob)) return 'mid';
    return 'junior';
  }
  if (item.topic === 'DevOps') {
    return /kubernetes|blue-green|ci\/cd|pod, deployment/.test(blob) ? 'mid' : 'junior';
  }
  return 'junior';
}

function tagsFor(item) {
  return tagsForQuestion(item.topic, item.section, item.title);
}

function yamlString(value) {
  return JSON.stringify(value);
}

for (const line of source.split(/\r?\n/)) {
  if (line.startsWith('# ')) {
    closeCurrent();
    preamble = [];
    const heading = line.replace(/^#\s+/, '');
    const row = topicRows.find(([prefix]) => heading.startsWith(prefix));
    if (!row || heading.startsWith('12.')) {
      mode = 'skip';
      topic = null;
      continue;
    }
    topic = row[1];
    dir = row[2];
    section = row[3];
    mode = heading.startsWith('11.') ? 'coding' : 'questions';
    continue;
  }

  if (mode === 'coding') {
    const row = line.match(/^\| (.+?) \| (Easy|Medium|Hard) \|$/);
    if (row && row[1] !== 'Bài tập') addQuestion(row[1], { codingLevel: row[2], lines: [] });
    closeCurrent();
    continue;
  }

  if (mode !== 'questions') continue;

  if (line.startsWith('### ')) {
    closeCurrent();
    section = line.replace(/^###\s+/, '');
    preamble = [];
    continue;
  }

  const numbered = line.match(/^\d+\.\s+(.+)$/);
  if (numbered && /[?.]$/.test(numbered[1].trim())) {
    closeCurrent();
    addQuestion(numbered[1]);
    continue;
  }

  if (topic === 'System Design' && line.startsWith('- ')) {
    closeCurrent();
    addQuestion(line.slice(2));
    continue;
  }

  if (current) current.lines.push(line);
  else if (!skipPreamble(line)) preamble.push(line);
}
closeCurrent();

const used = new Set();
const counts = {};

for (const dirName of new Set(topicRows.map((row) => row[2]))) {
  fs.rmSync(path.join(outRoot, dirName), { recursive: true, force: true });
}

for (const item of questions) {
  const level = levelFor(item);
  const tags = tagsFor(item);
  let slug = slugify(item.title);
  let filename = slug;
  let n = 2;
  while (used.has(`${item.dir}/${filename}`)) filename = `${slug}-${n++}`;
  used.add(`${item.dir}/${filename}`);

  const folder = path.join(outRoot, item.dir);
  fs.mkdirSync(folder, { recursive: true });
  const body = [
    '---',
    `title: ${yamlString(item.title)}`,
    `topic: ${yamlString(item.topic)}`,
    `section: ${yamlString(item.section)}`,
    `level: ${level}`,
    `tags: ${JSON.stringify(tags)}`,
    `order: ${item.order}`,
    '---',
    '',
    item.body,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(folder, `${filename}.md`), body);
  counts[item.topic] = (counts[item.topic] ?? 0) + 1;
}

console.log(JSON.stringify({ total: questions.length, counts }, null, 2));
