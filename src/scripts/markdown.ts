function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const JAVA_KEYS = new Set(
  'abstract boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new null package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while var record sealed yield true false'.split(' '),
);
const SQL_KEYS = new Set(
  'select from where and or not in is null as on join inner left right full outer cross group by order having limit offset union all distinct insert into values update set delete create table index drop alter add primary key foreign references constraint unique check default cascade case when then else end with over partition count sum avg min max like between exists asc desc begin commit rollback using'.split(' '),
);
const JS_KEYS = new Set(
  'as async await break case catch class const continue default do else export extends false finally for from function if import in instanceof let new null of return static super switch this throw true try typeof var void while yield'.split(' '),
);

function languageFamily(language: string): 'java' | 'sql' | 'js' | 'plain' {
  if (language === 'java' || language === 'kt' || language === 'kotlin') return 'java';
  if (language === 'sql' || language === 'mysql' || language === 'postgresql' || language === 'postgres') return 'sql';
  if (language === 'js' || language === 'javascript' || language === 'ts' || language === 'typescript') return 'js';
  return 'plain';
}

function paintLine(line: string, family: 'java' | 'sql' | 'js' | 'plain', inBlock: boolean): { html: string; inBlock: boolean } {
  const keys = family === 'java' ? JAVA_KEYS : family === 'sql' ? SQL_KEYS : family === 'js' ? JS_KEYS : null;
  let index = 0;
  let html = '';
  const push = (kind: string, text: string) => {
    if (!text) return;
    const body = escapeHtml(text);
    html += kind ? `<span class="tok-${kind}">${body}</span>` : body;
  };
  if (inBlock) {
    const end = line.indexOf('*/');
    if (end < 0) {
      push('cmt', line);
      return { html, inBlock: true };
    }
    push('cmt', line.slice(0, end + 2));
    index = end + 2;
    inBlock = false;
  }
  while (index < line.length) {
    const rest = line.slice(index);
    if ((family !== 'sql' && rest.startsWith('//')) || (family === 'sql' && rest.startsWith('--'))) {
      push('cmt', rest);
      break;
    }
    if (rest.startsWith('/*')) {
      const end = rest.indexOf('*/', 2);
      if (end < 0) {
        push('cmt', rest);
        return { html, inBlock: true };
      }
      push('cmt', rest.slice(0, end + 2));
      index += end + 2;
      continue;
    }
    const quoted = rest.match(/^(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/);
    if (quoted) {
      push('str', quoted[0]);
      index += quoted[0].length;
      continue;
    }
    const number = rest.match(/^\d+(?:\.\d+)?/);
    if (number && (index === 0 || /[^A-Za-z0-9_]/.test(line[index - 1] ?? ''))) {
      push('num', number[0]);
      index += number[0].length;
      continue;
    }
    const word = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (word) {
      const token = word[0];
      const keyword = keys?.has(family === 'sql' ? token.toLowerCase() : token) ?? false;
      push(keyword ? 'kw' : '', token);
      index += token.length;
      continue;
    }
    push('', rest[0] ?? '');
    index += 1;
  }
  return { html, inBlock };
}

function highlightCode(code: string, language: string): string {
  const family = languageFamily(language);
  let inBlock = false;
  return code
    .split('\n')
    .map((line) => {
      const painted = paintLine(line, family, inBlock);
      inBlock = painted.inBlock;
      return `<span class="line">${painted.html}</span>`;
    })
    .join('');
}

function inline(value: string): string {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export function renderMarkdown(source: string): string {
  const fences: string[] = [];
  const text = source.replace(/```([^\n`]*)\n([\s\S]*?)```/g, (_match, lang: string, code: string) => {
    const language = String(lang).trim().toLowerCase();
    const index = fences.length;
    const body = code.replace(/\n$/, '');
    if (language === 'mermaid') {
      fences.push(`<div class="mermaid">${escapeHtml(body)}</div>`);
    } else {
      const safe = language.replace(/[^a-z0-9]/g, '') || 'text';
      fences.push(`<pre class="astro-code" data-language="${safe}"><code>${highlightCode(body, safe)}</code></pre>`);
    }
    return `\n\n@@FENCE${index}@@\n\n`;
  });

  const lines = text.split('\n');
  const out: string[] = [];
  let paragraph: string[] = [];
  let list: { depth: number; tag: 'ul' | 'ol'; text: string }[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    out.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    let index = 0;
    const renderFrom = (depth: number): string => {
      if (index >= list.length || list[index].depth < depth) return '';
      if (list[index].depth > depth) return renderFrom(list[index].depth);
      const chunks: string[] = [];
      while (index < list.length && list[index].depth >= depth) {
        if (list[index].depth > depth) {
          chunks.push(renderFrom(list[index].depth));
          continue;
        }
        const tag = list[index].tag;
        const items: string[] = [];
        while (index < list.length && list[index].tag === tag && list[index].depth === depth) {
          const text = inline(list[index].text);
          index += 1;
          const nested = index < list.length && list[index].depth > depth ? renderFrom(depth + 1) : '';
          items.push(`<li>${text}${nested}</li>`);
        }
        if (items.length) chunks.push(`<${tag}>${items.join('')}</${tag}>`);
      }
      return chunks.join('');
    };
    out.push(renderFrom(list[0].depth));
    list = [];
  };

  for (const line of lines) {
    const fence = line.trim().match(/^@@FENCE(\d+)@@$/);
    if (fence) {
      flushParagraph();
      flushList();
      out.push(fences[Number(fence[1])] ?? '');
      continue;
    }
    const heading = line.match(/^(#{1,6})[ \t]*(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1]?.length ?? 1;
      out.push(`<h${level}>${inline(heading[2] ?? '')}</h${level}>`);
      continue;
    }
    const item = line.match(/^([ \t]*)(?:([-*])|(\d+)\.)[ \t]+(.*)$/);
    if (item) {
      flushParagraph();
      const indent = (item[1] ?? '').replace(/\t/g, '  ');
      list.push({
        depth: Math.floor(indent.length / 2),
        tag: item[3] ? 'ol' : 'ul',
        text: item[4] ?? '',
      });
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    flushList();
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  return `<div class="prose">${out.join('')}</div>`;
}

type MermaidApi = typeof import('mermaid').default;

let mermaidApi: MermaidApi | null = null;
let theme = '';

async function mermaid(): Promise<MermaidApi> {
  mermaidApi ??= (await import('mermaid')).default;
  const next = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'neutral';
  if (next !== theme) {
    theme = next;
    mermaidApi.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: next,
      fontFamily: 'IBM Plex Sans, sans-serif',
    });
  }
  return mermaidApi;
}

const tracked = new Set<ParentNode>();

if (typeof document !== 'undefined') {
  new MutationObserver(() => {
    theme = '';
    tracked.forEach((root) => {
      if (root instanceof HTMLElement && root.isConnected && root.querySelector('.mermaid')) void renderDiagrams(root);
    });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

function adoptMermaidBlocks(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('pre[data-language="mermaid"]').forEach((pre) => {
    const source = (pre.querySelector('code')?.innerText ?? '').replace(/\n$/, '');
    const node = document.createElement('div');
    node.className = 'mermaid';
    node.dataset.source = source;
    node.textContent = source;
    pre.replaceWith(node);
  });
}

export async function renderDiagrams(root: ParentNode): Promise<void> {
  tracked.add(root);
  adoptMermaidBlocks(root);
  const nodes = [...root.querySelectorAll<HTMLElement>('.mermaid')];
  if (!nodes.length) return;
  const api = await mermaid();
  for (const node of nodes) {
    const code = node.dataset.source || node.textContent || '';
    node.dataset.source = code;
    const id = `diagram-${crypto.randomUUID()}`;
    try {
      const { svg } = await api.render(id, code);
      node.classList.remove('is-error');
      node.innerHTML = svg;
    } catch (error) {
      document.getElementById(id)?.remove();
      node.classList.add('is-error');
      node.textContent = error instanceof Error ? error.message : 'Sơ đồ không hợp lệ.';
      node.dataset.source = code;
    }
  }
}
