import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tagsForQuestion } from './tag-rules.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const questionsDir = path.join(root, 'src/content/questions');
const counts = new Map();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) retag(full);
  }
}

function retag(file) {
  const source = fs.readFileSync(file, 'utf8');
  const topic = JSON.parse(source.match(/^topic:\s*(.+)$/m)?.[1] ?? '""');
  const section = JSON.parse(source.match(/^section:\s*(.+)$/m)?.[1] ?? '""');
  const title = JSON.parse(source.match(/^title:\s*(.+)$/m)?.[1] ?? '""');
  if (!topic || !section || !title) return;
  const tags = tagsForQuestion(topic, section, title);
  const next = source.replace(/^tags:\s*.+$/m, `tags: ${JSON.stringify(tags)}`);
  fs.writeFileSync(file, next);
  counts.set(tags[0], (counts.get(tags[0]) ?? 0) + 1);
}

walk(questionsDir);
const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
console.log(rows.map(([tag, count]) => `${count}\t${tag}`).join('\n'));
console.log(`groups ${rows.length}`);
