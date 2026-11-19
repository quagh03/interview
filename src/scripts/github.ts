import { topicDir, type Level, type Topic } from '../lib/taxonomy';

const KEY = 'interview-github';

export type GithubCreds = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

export type QuestionFile = {
  id: string;
  title: string;
  topic: Topic;
  section: string;
  level: Level;
  tags: string[];
  body: string;
  order: number;
};

type Change = {
  path: string;
  content: string | null;
};

export function loadGithub(): GithubCreds | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '');
    if (!parsed || typeof parsed !== 'object') return null;
    const creds = parsed as GithubCreds;
    if (!creds.token || !creds.owner || !creds.repo || !creds.branch) return null;
    return creds;
  } catch {
    return null;
  }
}

export function saveGithub(creds: GithubCreds) {
  localStorage.setItem(KEY, JSON.stringify(creds));
}

export function clearGithub() {
  localStorage.removeItem(KEY);
}

export function questionPath(id: string): string {
  return `src/content/questions/${id}.md`;
}

export function commitMessage(action: 'add' | 'update' | 'remove', title: string): string {
  const clean = title.replace(/\s+/g, ' ').trim();
  const prefix = `docs(questions): ${action} "`;
  const room = 72 - prefix.length - 1;
  const short = clean.length > room ? `${clean.slice(0, Math.max(room - 1, 1))}…` : clean;
  return `${prefix}${short}"`;
}

export function toMarkdown(question: QuestionFile): string {
  const tags = question.tags.map((tag) => `  - ${JSON.stringify(tag)}`).join('\n');
  const body = question.body.replace(/^\n+/, '').replace(/\s+$/, '');
  return `---
title: ${JSON.stringify(question.title)}
topic: ${JSON.stringify(question.topic)}
section: ${JSON.stringify(question.section)}
level: ${question.level}
tags:
${tags || '  []'}
order: ${question.order}
---
${body ? `\n${body}\n` : '\n'}`;
}

export function dirForTopic(topic: Topic): string {
  return topicDir[topic];
}

async function github(creds: GithubCreds, path: string, init?: RequestInit) {
  let response: Response;
  try {
    response = await fetch(`https://api.github.com${path}`, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${creds.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
    });
  } catch {
    throw new Error('Không kết nối được GitHub.');
  }
  if (response.ok) {
    if (response.status === 204) return null;
    return response.json();
  }
  let detail = '';
  try {
    const payload = (await response.json()) as { message?: string };
    detail = payload.message ?? '';
  } catch {
    detail = '';
  }
  if (response.status === 401) throw new Error('Token không hợp lệ.');
  if (response.status === 403) throw new Error('Token không có quyền ghi repo. Cần quyền Contents: Read and write.');
  if (response.status === 404) throw new Error('Không thấy repo hoặc nhánh. Kiểm tra chủ repo, tên repo và nhánh.');
  if (response.status === 422) throw new Error(detail || 'GitHub từ chối commit. Thử lại.');
  throw new Error(detail || 'Không commit được lên GitHub.');
}

export async function pushCommit(creds: GithubCreds, message: string, changes: Change[]) {
  const base = `/repos/${encodeURIComponent(creds.owner)}/${encodeURIComponent(creds.repo)}`;
  const branch = creds.branch.replace(/^\/+|\/+$/g, '');
  const ref = (await github(creds, `${base}/git/ref/heads/${branch}`)) as { object: { sha: string } };
  const parent = ref.object.sha;
  const current = (await github(creds, `${base}/git/commits/${parent}`)) as { tree: { sha: string } };
  const tree = [];
  for (const change of changes) {
    if (change.content === null) {
      tree.push({ path: change.path, mode: '100644', type: 'blob', sha: null });
      continue;
    }
    const blob = (await github(creds, `${base}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({ content: change.content, encoding: 'utf-8' }),
    })) as { sha: string };
    tree.push({ path: change.path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  const nextTree = (await github(creds, `${base}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ base_tree: current.tree.sha, tree }),
  })) as { sha: string };
  const next = (await github(creds, `${base}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: nextTree.sha, parents: [parent] }),
  })) as { sha: string };
  await github(creds, `${base}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: next.sha }),
  });
}
