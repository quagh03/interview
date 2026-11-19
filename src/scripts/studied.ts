const KEY = 'interview-studied';

export function loadStudied(): Set<string> {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((item) => typeof item === 'string'));
  } catch {
    return new Set();
  }
}

export function saveStudied(ids: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...ids]));
}

export function toggleStudied(id: string): boolean {
  const ids = loadStudied();
  const on = !ids.has(id);
  if (on) ids.add(id);
  else ids.delete(id);
  saveStudied(ids);
  return on;
}
