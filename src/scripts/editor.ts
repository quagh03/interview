import { levelLabel, levels, topics, type Level, type Topic } from '../lib/taxonomy';
import {
  clearGithub,
  commitMessage,
  dirForTopic,
  loadGithub,
  pushCommit,
  questionPath,
  saveGithub,
  toMarkdown,
  type GithubCreds,
} from './github';
import { renderDiagrams, renderMarkdown } from './markdown';

const KEY = 'interview-edits';

type Draft = {
  id: string;
  title: string;
  topic: Topic;
  section: string;
  level: Level;
  tags: string[];
  body?: string;
  order?: number;
  local?: boolean;
};

type Store = {
  removed: string[];
  questions: Draft[];
};

const topicSet = new Set<string>(topics);
const levelSet = new Set<string>(levels);

const quoted = (value: string) => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const fold = (value: string) =>
  value.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase();

const slug = (value: string) =>
  fold(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

const isDraft = (value: unknown): value is Draft => {
  if (!value || typeof value !== 'object') return false;
  const draft = value as Draft;
  return (
    typeof draft.id === 'string' &&
    typeof draft.title === 'string' &&
    topicSet.has(draft.topic) &&
    typeof draft.section === 'string' &&
    levelSet.has(draft.level) &&
    Array.isArray(draft.tags) &&
    draft.tags.every((tag) => typeof tag === 'string')
  );
};

const load = (): Store => {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '');
    if (!parsed || typeof parsed !== 'object') return { removed: [], questions: [] };
    const removed = Array.isArray(parsed.removed) ? parsed.removed.filter((id: unknown) => typeof id === 'string') : [];
    const questions = Array.isArray(parsed.questions) ? parsed.questions.filter(isDraft) : [];
    return { removed, questions };
  } catch {
    return { removed: [], questions: [] };
  }
};

const save = (store: Store) => {
  localStorage.setItem(KEY, JSON.stringify(store));
};

const searchBlob = (draft: Draft) => {
  const raw = [draft.title, draft.section, draft.topic, ...draft.tags, (draft.body ?? '').slice(0, 700)]
    .join(' ')
    .toLowerCase();
  const folded = fold(raw);
  return raw === folded ? raw : `${raw}\n${folded}`;
};

const fillTitle = (node: HTMLElement, title: string) => {
  node.replaceChildren();
  title.split(/(`[^`]+`)/g).forEach((part) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      const code = document.createElement('code');
      code.textContent = part.slice(1, -1);
      node.append(code);
      return;
    }
    node.append(part);
  });
};

const fillMeta = (article: HTMLElement, draft: Draft) => {
  const meta = article.querySelector('.q-meta');
  if (!meta) return;
  meta.replaceChildren();
  meta.append(draft.section || draft.tags[0] || '');
  meta.append(' · ');
  const level = document.createElement('span');
  if (draft.level === 'senior') level.className = 'senior';
  level.textContent = levelLabel[draft.level];
  meta.append(level);
};

const actions = () => {
  const wrap = document.createElement('span');
  wrap.className = 'q-actions';
  const edit = document.createElement('button');
  edit.className = 'text-btn';
  edit.type = 'button';
  edit.dataset.edit = '';
  edit.textContent = 'Sửa';
  const remove = document.createElement('button');
  remove.className = 'text-btn danger';
  remove.type = 'button';
  remove.dataset.delete = '';
  remove.textContent = 'Xóa';
  wrap.append(edit, remove);
  return wrap;
};

const ensureBlock = (topic: string, tag: string) => {
  const group = document.querySelector<HTMLElement>(`.group[data-topic="${quoted(topic)}"]`);
  if (!group) return null;
  const found = [...group.querySelectorAll<HTMLElement>(':scope > .block')].find((block) => block.dataset.section === tag);
  if (found) return found;
  const block = document.createElement('section');
  block.className = 'block is-collapsed';
  block.dataset.section = tag;
  const head = document.createElement('button');
  head.className = 'block-head';
  head.type = 'button';
  head.setAttribute('aria-expanded', 'false');
  const caret = document.createElement('span');
  caret.className = 'block-caret';
  caret.setAttribute('aria-hidden', 'true');
  const heading = document.createElement('h3');
  heading.textContent = tag;
  const count = document.createElement('span');
  count.className = 'block-count';
  count.textContent = '0/0';
  head.append(caret, heading, count);
  block.append(head);
  group.append(block);
  return block;
};

const pruneEmptyBlocks = () => {
  document.querySelectorAll<HTMLElement>('.block').forEach((block) => {
    if (!block.querySelector('.q')) block.remove();
  });
};

const syncNav = () => {
  const counts = new Map<string, number>();
  document.querySelectorAll<HTMLElement>('.q').forEach((article) => {
    const topic = article.dataset.topic ?? '';
    counts.set(topic, (counts.get(topic) ?? 0) + 1);
  });
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0);
  document.querySelectorAll<HTMLAnchorElement>('[data-nav-topic]').forEach((link) => {
    const span = link.querySelector('span');
    if (!span) return;
    const topic = link.dataset.navTopic ?? '';
    span.textContent = String(topic ? (counts.get(topic) ?? 0) : total);
  });
};

const place = (article: HTMLElement, draft: Draft, expand: boolean) => {
  const tag = draft.tags[0] || draft.section || 'Khác';
  const block = ensureBlock(draft.topic, tag);
  if (!block) return;
  if (article.parentElement !== block) block.append(article);
  if (expand) {
    block.classList.remove('is-collapsed');
    block.querySelector('.block-head')?.setAttribute('aria-expanded', 'true');
  }
};

const paint = (article: HTMLElement, draft: Draft) => {
  article.dataset.id = draft.id;
  article.dataset.title = draft.title;
  article.dataset.topic = draft.topic;
  article.dataset.section = draft.section;
  article.dataset.level = draft.level;
  article.dataset.tag = draft.tags[0] || draft.section || 'Khác';
  article.dataset.tags = draft.tags.join('|');
  if (typeof draft.order === 'number') article.dataset.order = String(draft.order);
  if (draft.local) article.dataset.local = '1';
  else delete article.dataset.local;
  if (draft.body !== undefined) article.dataset.markdown = draft.body;
  else delete article.dataset.markdown;
  if (article.dataset.origin === undefined) article.dataset.origin = article.dataset.search ?? '';
  const next = searchBlob(draft);
  article.dataset.search = draft.body !== undefined ? next : `${next}\n${article.dataset.origin}`;
  const title = article.querySelector<HTMLElement>('.q-title');
  if (title) fillTitle(title, draft.title);
  fillMeta(article, draft);
  const link = article.querySelector<HTMLAnchorElement>('a.q-link');
  if (link && draft.local) {
    const base = import.meta.env.BASE_URL;
    link.href = `${base}?open=${encodeURIComponent(draft.id)}`;
  }
};

const createArticle = (draft: Draft) => {
  const article = document.createElement('article');
  article.className = 'q';
  const studied = document.createElement('button');
  studied.className = 'studied';
  studied.type = 'button';
  studied.setAttribute('aria-pressed', 'false');
  studied.setAttribute('aria-label', 'Đánh dấu đã học');
  const body = document.createElement('div');
  body.className = 'q-body';
  const link = document.createElement('a');
  link.className = 'q-link';
  const title = document.createElement('span');
  title.className = 'q-title';
  const meta = document.createElement('span');
  meta.className = 'q-meta';
  link.append(title, meta);
  body.append(link, actions());
  article.append(studied, body);
  paint(article, draft);
  return article;
};

const applyStored = () => {
  const store = load();
  const removed = new Set(store.removed);
  removed.forEach((id) => {
    document.querySelector<HTMLElement>(`.q[data-id="${quoted(id)}"]`)?.remove();
  });
  store.questions.forEach((draft) => {
    if (removed.has(draft.id)) return;
    const existing = document.querySelector<HTMLElement>(`.q[data-id="${quoted(draft.id)}"]`);
    if (existing) {
      paint(existing, draft);
      place(existing, draft, false);
      return;
    }
    if (!draft.local && !draft.id.startsWith('local/')) return;
    const article = createArticle({ ...draft, local: true });
    place(article, draft, false);
  });
  pruneEmptyBlocks();
  syncNav();
};

const takenIds = (except = '') => {
  const taken = new Set(
    [...document.querySelectorAll<HTMLElement>('.q')].map((article) => article.dataset.id ?? ''),
  );
  load().questions.forEach((draft) => taken.add(draft.id));
  taken.delete(except);
  return taken;
};

const nextOrder = () => {
  const orders = [...document.querySelectorAll<HTMLElement>('.q')].map((article) => Number(article.dataset.order) || 0);
  return Math.max(1000, ...orders, 0) + 1;
};

const questionId = (dir: string, name: string, except = '') => {
  const taken = takenIds(except);
  let id = `${dir}/${name}`;
  let n = 2;
  while (taken.has(id)) id = `${dir}/${name}-${n++}`;
  return id;
};

const upsert = (draft: Draft) => {
  const store = load();
  const index = store.questions.findIndex((item) => item.id === draft.id);
  if (index >= 0) store.questions[index] = draft;
  else store.questions.push(draft);
  save(store);
};

const removeQuestion = (id: string) => {
  const store = load();
  const draft = store.questions.find((item) => item.id === id);
  store.questions = store.questions.filter((item) => item.id !== id);
  const local = draft?.local || id.startsWith('local/');
  if (!local && !store.removed.includes(id)) store.removed.push(id);
  save(store);
  document.querySelector<HTMLElement>(`.q[data-id="${quoted(id)}"]`)?.remove();
  pruneEmptyBlocks();
  syncNav();
  window.dispatchEvent(new Event('interview:refresh'));
};

const sources = new Map<string, string>();
try {
  const parsed = JSON.parse(document.querySelector('#sources')?.textContent ?? '{}') as Record<string, unknown>;
  Object.entries(parsed).forEach(([id, body]) => {
    if (typeof body === 'string') sources.set(id, body);
  });
} catch {
  /* nguồn Markdown trống */
}

const editor = document.querySelector<HTMLElement>('#editor');
const list = document.querySelector<HTMLElement>('#questions');

if (editor && list) {
  applyStored();

  const titleInput = document.querySelector<HTMLInputElement>('#editor-title');
  const topicInput = document.querySelector<HTMLSelectElement>('#editor-topic');
  const levelInput = document.querySelector<HTMLSelectElement>('#editor-level');
  const sectionInput = document.querySelector<HTMLInputElement>('#editor-section');
  const groupInput = document.querySelector<HTMLInputElement>('#editor-group');
  const tagsInput = document.querySelector<HTMLInputElement>('#editor-tags');
  const bodyInput = document.querySelector<HTMLTextAreaElement>('#editor-body');
  const preview = document.querySelector<HTMLElement>('#editor-preview');
  let opened = '';
  let previewToken = 0;
  let previewChain = Promise.resolve();

  const snapshot = () =>
    JSON.stringify({
      title: titleInput?.value ?? '',
      topic: topicInput?.value ?? '',
      level: levelInput?.value ?? '',
      section: sectionInput?.value ?? '',
      group: groupInput?.value ?? '',
      tags: tagsInput?.value ?? '',
      body: bodyInput?.value ?? '',
    });

  const syncScroll = document.querySelector<HTMLInputElement>('#sync-scroll');
  const applySync = () => {
    if (!syncScroll?.checked || !preview || !bodyInput) return;
    const sourceSpan = bodyInput.scrollHeight - bodyInput.clientHeight;
    const previewSpan = preview.scrollHeight - preview.clientHeight;
    preview.scrollTop = sourceSpan <= 0 || previewSpan <= 0 ? 0 : (bodyInput.scrollTop / sourceSpan) * previewSpan;
  };
  if (syncScroll) {
    syncScroll.checked = localStorage.getItem('interview-sync-scroll') !== '0';
    syncScroll.addEventListener('change', () => {
      localStorage.setItem('interview-sync-scroll', syncScroll.checked ? '1' : '0');
      applySync();
    });
  }

  const drawPreview = () => {
    if (!preview || !bodyInput) return;
    const token = ++previewToken;
    const source = bodyInput.value;
    previewChain = previewChain
      .then(async () => {
        if (token !== previewToken || !preview) return;
        if (!source.trim()) {
          preview.innerHTML = '<p class="missing">Bản xem trước trống.</p>';
          return;
        }
        preview.innerHTML = renderMarkdown(source);
        await renderDiagrams(preview);
        applySync();
      })
      .then(
        () => undefined,
        () => undefined,
      );
  };

  let previewTimer = 0;
  const schedulePreview = () => {
    window.clearTimeout(previewTimer);
    previewTimer = window.setTimeout(drawPreview, 120);
  };

  const closeEditor = (force = false) => {
    if (!force && snapshot() !== opened && !confirm('Bỏ các thay đổi?')) return;
    editor.hidden = true;
  };

  const openEditor = (article?: HTMLElement) => {
    const id = article?.dataset.id ?? '';
    editor.dataset.id = id;
    editor.classList.remove('is-preview');
    editor.querySelectorAll<HTMLButtonElement>('[data-pane]').forEach((button) => {
      button.classList.toggle('is-on', button.dataset.pane === 'write');
    });
    if (titleInput) titleInput.value = article?.dataset.title ?? '';
    const topic = article?.dataset.topic ?? new URLSearchParams(location.search).get('topic') ?? topics[0];
    if (topicInput) topicInput.value = topicSet.has(topic) ? topic : topics[0];
    const level = article?.dataset.level ?? 'junior';
    if (levelInput) levelInput.value = levelSet.has(level) ? level : 'junior';
    if (sectionInput) sectionInput.value = article?.dataset.section ?? '';
    const tags = (article?.dataset.tags ?? '').split('|').filter(Boolean);
    if (groupInput) groupInput.value = tags[0] ?? '';
    if (tagsInput) tagsInput.value = tags.slice(1).join(', ');
    if (bodyInput) {
      bodyInput.value = article
        ? article.dataset.markdown !== undefined
          ? article.dataset.markdown
          : (sources.get(id) ?? '')
        : '';
    }
    opened = snapshot();
    editor.hidden = false;
    drawPreview();
    if (titleInput && !titleInput.value) titleInput.focus();
    else bodyInput?.focus();
  };

  const status = document.querySelector<HTMLElement>('#editor-status');
  const syncStatus = document.querySelector<HTMLElement>('#sync-status');
  const saveButton = document.querySelector<HTMLButtonElement>('#editor-save');
  const githubDialog = document.querySelector<HTMLElement>('#github-dialog');
  const githubForm = document.querySelector<HTMLFormElement>('#github-form');
  const githubToken = document.querySelector<HTMLInputElement>('#github-token');
  const githubOwner = document.querySelector<HTMLInputElement>('#github-owner');
  const githubRepo = document.querySelector<HTMLInputElement>('#github-repo');
  const githubBranch = document.querySelector<HTMLInputElement>('#github-branch');
  const githubError = document.querySelector<HTMLElement>('#github-error');
  let busy = false;
  let pending: 'save' | 'delete' | null = null;
  let pendingArticle: HTMLElement | null = null;

  const showStatus = (text: string) => {
    if (!status) return;
    status.hidden = !text;
    status.textContent = text;
  };

  const showSync = (text: string) => {
    if (!syncStatus) return;
    syncStatus.hidden = !text;
    syncStatus.textContent = text;
  };

  const showGithubError = (text: string) => {
    if (!githubError) return;
    githubError.hidden = !text;
    githubError.textContent = text;
  };

  const openGithub = () => {
    const creds = loadGithub();
    if (githubOwner) githubOwner.value = creds?.owner ?? githubOwner.value;
    if (githubRepo && creds?.repo) githubRepo.value = creds.repo;
    if (githubBranch && creds?.branch) githubBranch.value = creds.branch;
    if (githubToken) {
      githubToken.value = '';
      githubToken.placeholder = creds ? 'Để trống nếu giữ token hiện tại' : 'github_pat_… hoặc ghp_…';
    }
    showGithubError('');
    if (githubDialog) githubDialog.hidden = false;
    githubToken?.focus();
  };

  const credsFromForm = (): GithubCreds | null => {
    const current = loadGithub();
    const token = githubToken?.value.trim() || current?.token || '';
    const owner = githubOwner?.value.trim() ?? '';
    const repo = githubRepo?.value.trim() ?? '';
    const branch = githubBranch?.value.trim() || 'main';
    if (!token || !owner || !repo || !branch) return null;
    if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) return null;
    if (!/^[A-Za-z0-9._/-]+$/.test(branch) || branch.includes('..')) return null;
    return { token, owner, repo, branch };
  };

  const applyDraft = (previousId: string, draft: Draft) => {
    if (previousId && previousId !== draft.id) {
      const store = load();
      store.questions = store.questions.filter((item) => item.id !== previousId);
      if (!previousId.startsWith('local/') && !store.removed.includes(previousId)) store.removed.push(previousId);
      save(store);
    }
    upsert(draft);
    const existing = previousId ? articleById(previousId) : null;
    if (existing) {
      paint(existing, draft);
      place(existing, draft, true);
    } else {
      place(createArticle(draft), draft, true);
    }
    pruneEmptyBlocks();
    syncNav();
    window.dispatchEvent(new Event('interview:refresh'));
  };

  const saveEditor = async () => {
    if (busy || !titleInput || !topicInput || !levelInput || !sectionInput || !groupInput || !tagsInput || !bodyInput) return;
    const title = titleInput.value.trim();
    if (!title) {
      titleInput.focus();
      return;
    }
    if (!topicSet.has(topicInput.value) || !levelSet.has(levelInput.value)) return;
    const creds = loadGithub();
    if (!creds) {
      pending = 'save';
      openGithub();
      return;
    }
    const editing = editor.dataset.id ?? '';
    const topic = topicInput.value as Topic;
    const group = groupInput.value.trim() || sectionInput.value.trim() || 'Khác';
    const extra = tagsInput.value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag && tag !== group);
    const current = editing ? articleById(editing) : null;
    const name = editing && !editing.startsWith('local/') ? (editing.split('/').pop() ?? '') : slug(title) || 'cau-hoi';
    const id = questionId(dirForTopic(topic), name, editing);
    const onGithub = Boolean(editing && !editing.startsWith('local/'));
    const draft: Draft = {
      id,
      title,
      topic,
      section: sectionInput.value.trim() || group,
      level: levelInput.value as Level,
      tags: [group, ...extra].slice(0, 4),
      body: bodyInput.value,
      order: Number(current?.dataset.order) || nextOrder(),
      local: !onGithub || current?.dataset.local === '1',
    };
    const message = commitMessage(onGithub ? 'update' : 'add', title);
    const changes: { path: string; content: string | null }[] = [
      { path: questionPath(id), content: toMarkdown({ ...draft, body: draft.body ?? '', order: draft.order ?? 1000, level: draft.level, topic: draft.topic, section: draft.section, tags: draft.tags, title: draft.title, id: draft.id }) },
    ];
    if (editing && editing !== id && !editing.startsWith('local/')) {
      changes.push({ path: questionPath(editing), content: null });
    }
    busy = true;
    if (saveButton) saveButton.disabled = true;
    showStatus('Đang commit lên GitHub…');
    try {
      await pushCommit(creds, message, changes);
    } catch (error) {
      showStatus(error instanceof Error ? error.message : 'Không commit được.');
      return;
    } finally {
      busy = false;
      if (saveButton) saveButton.disabled = false;
    }
    applyDraft(editing, draft);
    showStatus('');
    showSync(`Đã commit: ${message}`);
    closeEditor(true);
  };

  const deleteQuestion = async (article: HTMLElement, confirmed: boolean) => {
    const title = article.dataset.title || 'câu hỏi này';
    const id = article.dataset.id ?? '';
    if (!id) return;
    if (!confirmed && !confirm(`Xóa “${title}”?`)) return;
    if (id.startsWith('local/')) {
      removeQuestion(id);
      showSync('Đã xóa trên trình duyệt. Câu này chưa có trên GitHub.');
      return;
    }
    const creds = loadGithub();
    if (!creds) {
      pending = 'delete';
      pendingArticle = article;
      openGithub();
      return;
    }
    const message = commitMessage('remove', title);
    showSync('Đang commit lên GitHub…');
    try {
      await pushCommit(creds, message, [{ path: questionPath(id), content: null }]);
    } catch (error) {
      showSync(error instanceof Error ? error.message : 'Không commit được.');
      return;
    }
    removeQuestion(id);
    showSync(`Đã commit: ${message}`);
  };

  document.querySelector('#add-question')?.addEventListener('click', () => openEditor());
  document.querySelector('#editor-cancel')?.addEventListener('click', () => closeEditor());
  document.querySelector('#editor-save')?.addEventListener('click', () => void saveEditor());
  document.querySelector('#github-setup')?.addEventListener('click', () => {
    pending = null;
    openGithub();
  });
  document.querySelector('#github-dismiss')?.addEventListener('click', () => {
    pending = null;
    pendingArticle = null;
    if (githubDialog) githubDialog.hidden = true;
    if (githubToken) githubToken.value = '';
  });
  document.querySelector('#github-forget')?.addEventListener('click', () => {
    clearGithub();
    if (githubToken) {
      githubToken.value = '';
      githubToken.placeholder = 'github_pat_… hoặc ghp_…';
    }
    showGithubError('Đã xóa token khỏi trình duyệt.');
  });
  githubForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const creds = credsFromForm();
    if (!creds) {
      showGithubError('Cần token, chủ repo và tên repo.');
      return;
    }
    saveGithub(creds);
    if (githubToken) githubToken.value = '';
    if (githubDialog) githubDialog.hidden = true;
    const next = pending;
    const article = pendingArticle;
    pending = null;
    pendingArticle = null;
    if (next === 'save') void saveEditor();
    if (next === 'delete' && article) void deleteQuestion(article, true);
  });
  githubDialog?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      pending = null;
      pendingArticle = null;
      githubDialog.hidden = true;
    }
  });
  editor.querySelectorAll<HTMLButtonElement>('[data-pane]').forEach((button) => {
    button.addEventListener('click', () => {
      editor.classList.toggle('is-preview', button.dataset.pane === 'preview');
      editor.querySelectorAll<HTMLButtonElement>('[data-pane]').forEach((item) => {
        item.classList.toggle('is-on', item === button);
      });
    });
  });
  bodyInput?.addEventListener('input', schedulePreview);
  bodyInput?.addEventListener('scroll', applySync);
  bodyInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = bodyInput.selectionStart;
      const end = bodyInput.selectionEnd;
      bodyInput.setRangeText('  ', start, end, 'end');
      schedulePreview();
    }
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      saveEditor();
    }
  });
  editor.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeEditor();
  });

  const articleById = (id: string) => document.querySelector<HTMLElement>(`.q[data-id="${quoted(id)}"]`);

  list.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const edit = target.closest('[data-edit]');
    const remove = target.closest('[data-delete]');
    const article = (edit ?? remove)?.closest<HTMLElement>('.q');
    if (!article) return;
    if (edit) openEditor(article);
    if (remove) void deleteQuestion(article, false);
  });

  const openFromReader = () => {
    const id = document.querySelector('#reader-view')?.getAttribute('data-open') ?? '';
    return id ? articleById(id) : null;
  };
  document.querySelector('#reader-edit')?.addEventListener('click', () => {
    const article = openFromReader();
    if (article) openEditor(article);
  });
  document.querySelector('#reader-delete')?.addEventListener('click', () => {
    const article = openFromReader();
    if (article) void deleteQuestion(article, false);
  });
}
