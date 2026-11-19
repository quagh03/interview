import { renderDiagrams, renderMarkdown } from './markdown';
import { loadStudied, saveStudied } from './studied';

const PAGE_SIZE = 15;
const RING = 2 * Math.PI * 15;
const levelNames: Record<string, string> = {
  intern: 'Intern',
  junior: 'Junior',
  mid: 'Mid',
  senior: 'Senior',
};

const list = document.querySelector<HTMLElement>('#questions');
const pager = document.querySelector<HTMLElement>('#pager');
const groupPanel = document.querySelector<HTMLElement>('#group-panel');
const split = document.querySelector<HTMLElement>('#split');

if (list && pager && groupPanel && split) {
  const input = document.querySelector<HTMLInputElement>('#q');
  const empty = document.querySelector<HTMLElement>('#empty');
  const topicLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-topic]')];
  let questions = [...list.querySelectorAll<HTMLElement>('.q')];
  const menus = [...document.querySelectorAll<HTMLElement>('.dd')];
  const levelLabel = document.querySelector<HTMLElement>('[data-dd-label="level"]');
  const groupLabel = document.querySelector<HTMLElement>('[data-dd-label="group"]');
  const levelOptions = [...document.querySelectorAll<HTMLButtonElement>('[data-dd="level"] [data-value]')];
  const readerEmpty = document.querySelector<HTMLElement>('#reader-empty');
  const readerView = document.querySelector<HTMLElement>('#reader-view');
  const readerCrumb = document.querySelector<HTMLElement>('#reader-crumb');
  const readerTitle = document.querySelector<HTMLElement>('#reader-title');
  const readerTags = document.querySelector<HTMLElement>('#reader-tags');
  const readerBody = document.querySelector<HTMLElement>('#reader-body');
  const readerStudied = document.querySelector<HTMLButtonElement>('#reader-studied');
  const readerBack = document.querySelector<HTMLButtonElement>('#reader-back');

  const params = new URLSearchParams(location.search);
  let topic = params.get('topic') ?? '';
  let level = params.get('level') ?? '';
  let tag = params.get('tag') ?? '';
  let tagScope: 'primary' | 'any' = params.get('scope') === 'any' ? 'any' : 'primary';
  let openId = params.get('open') ?? '';
  let page = Number(params.get('page') ?? '1');
  if (!Number.isFinite(page) || page < 1) page = 1;
  if (input && params.get('q')) input.value = params.get('q') ?? '';

  let studied = loadStudied();
  let shownId = '';
  let placed = false;

  const fold = (value: string) =>
    value.normalize('NFD').replace(/\p{M}/gu, '').replace(/[đĐ]/g, 'd').toLowerCase();

  const tagsOf = (item: HTMLElement) => (item.dataset.tags ?? '').split('|').filter(Boolean);

  const matches = (item: HTMLElement, query: string, needle: string) => {
    const blob = item.dataset.search ?? '';
    return (
      (!topic || item.dataset.topic === topic) &&
      (!level || item.dataset.level === level) &&
      (!tag || (tagScope === 'any' ? tagsOf(item).includes(tag) : item.dataset.tag === tag)) &&
      (!query || blob.includes(query) || blob.includes(needle))
    );
  };

  const closeMenus = () => {
    menus.forEach((menu) => {
      menu.querySelector<HTMLElement>('.dd-panel')?.setAttribute('hidden', '');
      menu.querySelector('.dd-btn')?.setAttribute('aria-expanded', 'false');
    });
  };

  const paintStudied = () => {
    questions.forEach((item) => {
      const button = item.querySelector<HTMLButtonElement>('.studied');
      if (!button) return;
      button.setAttribute('aria-pressed', String(studied.has(item.dataset.id ?? '')));
    });
    if (!readerStudied) return;
    const on = openId !== '' && studied.has(openId);
    readerStudied.textContent = on ? 'Đã học' : 'Đánh dấu đã học';
    readerStudied.setAttribute('aria-pressed', String(on));
  };

  const setRing = (block: HTMLElement, done: number, total: number) => {
    const ring = block.querySelector<HTMLElement>('[data-ring]');
    const value = block.querySelector<SVGCircleElement>('.ring-value');
    const label = block.querySelector<HTMLElement>('.ring-label');
    const ratio = total === 0 ? 0 : done / total;
    if (value) value.style.strokeDashoffset = String(RING * (1 - ratio));
    if (label) label.textContent = `${done}/${total}`;
    if (ring) ring.setAttribute('aria-label', `${done} trên ${total} đã học`);
  };

  const option = (label: string, value: string, count: number | null, selected: boolean) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('role', 'option');
    button.dataset.value = value;
    button.setAttribute('aria-selected', String(selected));
    button.append(label);
    if (count !== null) {
      const mark = document.createElement('span');
      mark.textContent = String(count);
      button.append(mark);
    }
    button.addEventListener('click', () => {
      if (value === '') {
        tag = '';
        tagScope = 'primary';
      } else if (button.dataset.scope === 'any') {
        tag = value;
        tagScope = 'any';
      } else {
        tag = value;
        tagScope = 'primary';
      }
      page = 1;
      closeMenus();
      apply(true, true);
    });
    return button;
  };

  const renderGroupMenu = () => {
    if (groupLabel) groupLabel.textContent = tag || 'Tất cả';
    groupPanel.replaceChildren();
    groupPanel.append(option('Tất cả', '', null, tag === ''));
    const counts = new Map<string, number>();
    list.querySelectorAll<HTMLElement>('.block').forEach((block) => {
      const group = block.closest<HTMLElement>('.group');
      if (topic && group?.dataset.topic !== topic) return;
      const name = block.dataset.section ?? '';
      if (!name) return;
      const count = block.querySelectorAll('.q').length;
      counts.set(name, (counts.get(name) ?? 0) + count);
    });
    if (tag && !counts.has(tag)) {
      const extra = option(tag, tag, null, true);
      extra.dataset.scope = 'any';
      groupPanel.append(extra);
    }
    for (const [name, count] of counts) {
      groupPanel.append(option(name, name, count, name === tag && tagScope === 'primary'));
    }
  };

  const renderPager = (total: number, pages: number) => {
    pager.replaceChildren();
    if (pages <= 1) {
      pager.hidden = true;
      return;
    }
    pager.hidden = false;
    const start = (page - 1) * PAGE_SIZE;
    const status = document.createElement('span');
    status.className = 'pager-status';
    status.textContent = `${start + 1}–${Math.min(start + PAGE_SIZE, total)} / ${total}`;

    const addButton = (label: string, target: number, current = false) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.disabled = target < 1 || target > pages;
      button.classList.toggle('is-active', current);
      if (current) button.setAttribute('aria-current', 'page');
      button.addEventListener('click', () => {
        page = target;
        apply(true);
        list.closest('.list-pane')?.scrollTo({ top: 0 });
      });
      pager.append(button);
    };

    addButton('Trước', page - 1);
    const numbers = new Set<number>(
      pages <= 7 ? Array.from({ length: pages }, (_, index) => index + 1) : [1, pages, page - 1, page, page + 1],
    );
    let previous = 0;
    [...numbers]
      .filter((number) => number >= 1 && number <= pages)
      .sort((a, b) => a - b)
      .forEach((number) => {
        if (previous && number - previous > 1) {
          const gap = document.createElement('span');
          gap.className = 'pager-gap';
          gap.textContent = '…';
          pager.append(gap);
        }
        addButton(String(number), number, number === page);
        previous = number;
      });
    pager.append(status);
    addButton('Sau', page + 1);
  };

  const attachCopy = (root: ParentNode) => {
    root.querySelectorAll('pre').forEach((pre) => {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : '';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'copy';
      button.textContent = 'Copy';
      button.addEventListener('click', () => {
        const done = () => {
          button.textContent = 'Đã chép';
          window.setTimeout(() => {
            button.textContent = 'Copy';
          }, 1200);
        };
        const fallback = () => {
          const area = document.createElement('textarea');
          area.value = text;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.left = '-9999px';
          document.body.append(area);
          area.select();
          const ok = document.execCommand('copy');
          area.remove();
          if (ok) done();
        };
        if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, fallback);
        else fallback();
      });
      pre.append(button);
    });
  };

  const showReader = () => {
    const item = questions.find((entry) => entry.dataset.id === openId);
    const changed = openId !== shownId;
    questions.forEach((entry) => entry.classList.toggle('is-open', entry.dataset.id === openId && openId !== ''));
    if (!item || !openId || !readerView || !readerEmpty) {
      shownId = '';
      split.classList.remove('is-reading');
      readerView?.removeAttribute('data-open');
      if (readerView) readerView.hidden = true;
      if (readerEmpty) readerEmpty.hidden = false;
      return;
    }
    split.classList.add('is-reading');
    readerView.dataset.open = openId;
    if (!changed) return;
    shownId = openId;
    readerEmpty.hidden = true;
    readerView.hidden = false;
    if (readerCrumb) {
      readerCrumb.replaceChildren();
      const bits = [item.dataset.topic ?? '', item.dataset.section ?? '', levelNames[item.dataset.level ?? ''] ?? ''];
      bits.filter(Boolean).forEach((bit, index) => {
        if (index > 0) readerCrumb.append(index === 1 ? ' / ' : ' · ');
        const span = document.createElement('span');
        if (item.dataset.level === 'senior' && bit === levelNames.senior) span.className = 'badge-senior';
        span.textContent = bit;
        readerCrumb.append(span);
      });
    }
    if (readerTitle) {
      readerTitle.replaceChildren();
      const source = item.querySelector('.q-title');
      if (source) readerTitle.append(...[...source.childNodes].map((node) => node.cloneNode(true)));
    }
    if (readerTags) {
      readerTags.replaceChildren();
      tagsOf(item).forEach((name) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'mini-tag';
        button.textContent = name;
        button.addEventListener('click', () => {
          tag = name;
          tagScope = 'any';
          page = 1;
          apply(true, true);
        });
        readerTags.append(button);
      });
    }
    if (readerBody) {
      readerBody.replaceChildren();
      const missing = () => {
        const note = document.createElement('p');
        note.className = 'missing';
        note.textContent = 'Chưa có ghi chú.';
        readerBody.append(note);
      };
      if (item.dataset.markdown !== undefined) {
        if (item.dataset.markdown.trim()) {
          readerBody.innerHTML = renderMarkdown(item.dataset.markdown);
          attachCopy(readerBody);
          void renderDiagrams(readerBody);
        } else missing();
      } else {
        const template = document.getElementById(`body-${openId}`);
        if (template instanceof HTMLTemplateElement) {
          readerBody.append(template.content.cloneNode(true));
          void renderDiagrams(readerBody).finally(() => attachCopy(readerBody));
        } else missing();
      }
    }
    const pane = document.querySelector('.reader');
    if (pane) pane.scrollTop = 0;
    if (window.matchMedia('(max-width: 800px)').matches) pane?.scrollIntoView({ block: 'start' });
    if (!item.hidden) item.scrollIntoView({ block: 'nearest' });
  };

  const writeUrl = () => {
    const url = new URL(location.href);
    url.search = '';
    if (topic) url.searchParams.set('topic', topic);
    if (level) url.searchParams.set('level', level);
    if (tag) url.searchParams.set('tag', tag);
    if (tag && tagScope === 'any') url.searchParams.set('scope', 'any');
    const typed = input?.value.trim() ?? '';
    if (typed) url.searchParams.set('q', typed);
    if (page > 1) url.searchParams.set('page', String(page));
    if (openId) url.searchParams.set('open', openId);
    history.replaceState(null, '', url);
  };

  const setCollapsed = (block: HTMLElement, collapsed: boolean) => {
    block.classList.toggle('is-collapsed', collapsed);
    block.querySelector('.block-head')?.setAttribute('aria-expanded', String(!collapsed));
  };

  const expandOnly = (block: HTMLElement | null) => {
    list.querySelectorAll<HTMLElement>('.block').forEach((entry) => setCollapsed(entry, entry !== block));
  };

  const foldToContext = () => {
    const openBlock = openId
      ? (questions.find((item) => item.dataset.id === openId)?.closest<HTMLElement>('.block') ?? null)
      : null;
    list.querySelectorAll<HTMLElement>('.block').forEach((block) => {
      const named = tag !== '' && tagScope === 'primary' && block.dataset.section === tag && !block.hidden;
      setCollapsed(block, !(named || block === openBlock));
    });
  };

  const apply = (updateHistory: boolean, refold = false) => {
    const query = (input?.value ?? '').trim().toLowerCase();
    const needle = fold(query);
    const matched = questions.filter((item) => matches(item, query, needle));
    const matchedSet = new Set(matched);

    paintStudied();
    questions.forEach((item) => {
      item.hidden = !matchedSet.has(item);
    });

    list.querySelectorAll<HTMLElement>('.group').forEach((group) => {
      const inGroup = [...group.querySelectorAll<HTMLElement>('.q')];
      const groupMatched = inGroup.filter((item) => matchedSet.has(item));
      const groupStudied = groupMatched.filter((item) => studied.has(item.dataset.id ?? '')).length;
      setRing(group, groupStudied, groupMatched.length);
      group.querySelectorAll<HTMLElement>('.block').forEach((block) => {
        const inBlock = [...block.querySelectorAll<HTMLElement>('.q')];
        const blockMatched = inBlock.filter((item) => matchedSet.has(item));
        const blockStudied = blockMatched.filter((item) => studied.has(item.dataset.id ?? '')).length;
        block.hidden = blockMatched.length === 0;
        const count = block.querySelector<HTMLElement>('.block-count');
        if (count) count.textContent = `${blockStudied}/${blockMatched.length}`;
      });
      group.hidden = groupMatched.length === 0;
    });

    if (empty) empty.hidden = matched.length !== 0;
    if (levelLabel) levelLabel.textContent = levelNames[level] ?? 'Tất cả';
    levelOptions.forEach((button) => {
      button.setAttribute('aria-selected', String((button.dataset.value ?? '') === level));
    });
    renderGroupMenu();
    renderPager(matched.length, 1);
    if (!placed || refold) {
      placed = true;
      foldToContext();
    }
    topicLinks.forEach((link) => {
      link.classList.toggle('is-active', (link.dataset.navTopic ?? '') === topic);
    });
    showReader();
    if (updateHistory) writeUrl();
  };

  input?.addEventListener('input', () => {
    page = 1;
    apply(true, true);
  });

  levelOptions.forEach((button) => {
    button.addEventListener('click', () => {
      level = button.dataset.value ?? '';
      page = 1;
      closeMenus();
      apply(true, true);
    });
  });

  menus.forEach((menu) => {
    menu.querySelector('.dd-btn')?.addEventListener('click', (event) => {
      event.stopPropagation();
      const button = menu.querySelector('.dd-btn');
      const expanded = button?.getAttribute('aria-expanded') === 'true';
      closeMenus();
      if (!expanded) {
        menu.querySelector<HTMLElement>('.dd-panel')?.removeAttribute('hidden');
        button?.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('.dd')) closeMenus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenus();
  });

  topicLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const next = link.dataset.navTopic ?? '';
      topic = next === topic && next !== '' ? '' : next;
      tag = '';
      tagScope = 'primary';
      page = 1;
      apply(true, true);
    });
  });

  list.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const head = target.closest<HTMLButtonElement>('.block-head');
    if (head) {
      const block = head.closest<HTMLElement>('.block');
      if (!block) return;
      if (block.classList.contains('is-collapsed')) expandOnly(block);
      else setCollapsed(block, true);
      return;
    }
    const studiedButton = target.closest<HTMLButtonElement>('.studied');
    if (studiedButton) {
      const id = studiedButton.closest<HTMLElement>('.q')?.dataset.id ?? '';
      if (!id) return;
      if (studied.has(id)) studied.delete(id);
      else studied.add(id);
      saveStudied(studied);
      apply(false);
      return;
    }
    const link = target.closest<HTMLAnchorElement>('a.q-link');
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const item = link.closest<HTMLElement>('.q');
    openId = item?.dataset.id ?? '';
    expandOnly(item?.closest<HTMLElement>('.block') ?? null);
    apply(true);
  });

  readerStudied?.addEventListener('click', () => {
    if (!openId) return;
    if (studied.has(openId)) studied.delete(openId);
    else studied.add(openId);
    saveStudied(studied);
    apply(false);
  });

  readerBack?.addEventListener('click', () => {
    openId = '';
    apply(true);
  });

  window.addEventListener('pageshow', () => {
    studied = loadStudied();
    apply(false);
  });

  window.addEventListener('interview:refresh', () => {
    questions = [...list.querySelectorAll<HTMLElement>('.q')];
    if (openId && !questions.some((entry) => entry.dataset.id === openId)) openId = '';
    shownId = '';
    apply(true);
  });

  apply(false);
}
