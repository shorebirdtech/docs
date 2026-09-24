import { existsSync, readFileSync } from 'node:fs';
import { getCollection, render } from 'astro:content';
import { unlistedPages } from '~/unlisted';
import { AREAS, type Area, type ChangeType } from './changelog-schema';

// Shared by the changelog page (`src/pages/changelog.astro`), its
// agent-facing Markdown twin (`src/pages/changelog.md.ts`), and its RSS feed
// (`src/pages/changelog.xml.ts`), so all three list the same entries.
//
// Entries are hand-written, one Markdown file each, in
// `src/content/changelog/`. Copy `_template.md` there to add one.

export { AREAS, type Area };

export const CHANGELOG_TITLE = 'Changelog';
export const CHANGELOG_DESCRIPTION =
  'New features, fixes, and supported Flutter versions in Shorebird, newest first.';

export interface ChangelogEntry {
  /** Anchor id and permalink slug for this entry: its file name. */
  id: string;
  /** Release date, as `YYYY-MM-DD`. */
  date: string;
  /**
   * The Shorebird CLI release that shipped the change, without the `v`.
   * Absent for changes that don't ship in the CLI, like Console updates.
   */
  version?: string;
  area: Area;
  type: ChangeType;
  title: string;
  /** May mark inline code with backticks, as in Markdown. */
  summary: string;
  /** May mark inline code with backticks, as in Markdown. */
  bullets: string[];
  /** One command per line, without a leading `$`. */
  code?: string;
  docLink?: { label: string; href: string };
}

const BODY_HELP =
  'The body must be a summary paragraph, then a "- " bullet list, then ' +
  'optionally one ```sh code block. See src/content/changelog/_template.md.';

/**
 * The page renders only backticks (as inline code), while `/changelog.md`
 * passes text through as Markdown. Returns what in `text` would render
 * differently between the two, or `undefined` if nothing would.
 */
function inlineProblem(text: string, allowCode = true): string | undefined {
  const parts = text.split('`');
  if (!allowCode && parts.length > 1)
    return 'Backticks are not supported here.';
  if (parts.length % 2 === 0) return 'A backtick is never closed.';
  const prose = parts.filter((_, i) => i % 2 === 0).join(' ');
  if (/\[[^\]]*\]\([^)]*\)/.test(prose)) {
    return 'Links are not supported in entry text. Put the link in docLink.';
  }
  if (/\*\*|__/.test(prose)) return 'Bold text is not supported.';
  // Emphasis needs a closing marker, so `snake_case` and `_template.md` pass.
  if (/(^|[\s(])([*_])\S(?:[^*_\n]*?\S)?\2(?=$|[\s.,;:!?)])/.test(prose)) {
    return 'Italic text is not supported.';
  }
  if (/<[^>]*>/.test(prose)) {
    return 'Wrap placeholders like <id> in backticks, or they vanish from /changelog.md.';
  }
  if (/&(#\d+|[a-z]+);/i.test(prose)) {
    return 'Write characters as they are, not as HTML entities like &amp;.';
  }
  if (/\\[\\`*_{}[\]()#+\-.!|]/.test(prose)) {
    return 'Backslash escapes are not supported. Put the text in backticks instead.';
  }
  if (/https?:\/\/|www\./.test(prose)) {
    return 'Links are not supported in entry text. Put the link in docLink.';
  }
  return undefined;
}

/**
 * Splits an entry's Markdown body into its summary, bullets, and command.
 * Only that shape is accepted, so a stray heading or second paragraph fails
 * the build instead of silently disappearing from the page.
 */
function parseBody(
  file: string,
  body: string,
): Pick<ChangelogEntry, 'summary' | 'bullets' | 'code'> {
  // Report positions as `file:line` in the whole file, frontmatter included,
  // so they can be clicked in a terminal or editor.
  let offset = 0;
  try {
    const raw = readFileSync(file, 'utf8');
    const at = raw.indexOf(body);
    if (at >= 0) offset = raw.slice(0, at).split('\n').length - 1;
  } catch {
    // Without the file, line numbers stay relative to the body.
  }
  const fail = (line: number | undefined, problem: string): never => {
    const where = line === undefined ? file : `${file}:${line + offset}`;
    throw new Error(`${where}: ${problem} ${BODY_HELP}`);
  };

  // Blank out comments line by line, so line numbers in errors still match.
  const lines = body
    .replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ''))
    .split(/\r?\n/);

  const summary: string[] = [];
  let summaryLine = 0;
  const bullets: string[] = [];
  const bulletLines: number[] = [];
  let code: string[] | undefined;
  let block: 'none' | 'summary' | 'bullet' = 'none';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const n = i + 1;
    if (line.trim() === '') {
      block = 'none';
    } else if (/^(#|>|\d+\.\s)/.test(line)) {
      fail(n, 'Headings, quotes, and numbered lists are not supported.');
    } else if (line.startsWith('```')) {
      if (code) fail(n, 'Only one code block is allowed.');
      if (!/^```(sh|bash|shell)?\s*$/.test(line)) {
        fail(n, 'The code block must be ```sh.');
      }
      code = [];
      // Keep lines as written: indentation and blank lines can matter, and
      // only a `$ ` prompt is stripped, never a `$VARIABLE`.
      for (i++; i < lines.length && !lines[i].startsWith('```'); i++) {
        code.push(lines[i].trimEnd().replace(/^\$\s+/, ''));
      }
      if (i === lines.length) fail(n, 'This code block is never closed.');
      while (code.length && !code[0]) code.shift();
      while (code.length && !code[code.length - 1]) code.pop();
      block = 'none';
    } else if (code) {
      fail(n, 'Nothing can follow the code block.');
    } else if (/^[-*]\s/.test(line)) {
      if (summary.length === 0) fail(n, 'The summary paragraph comes first.');
      bullets.push(line.replace(/^[-*]\s+/, '').trim());
      bulletLines.push(n);
      block = 'bullet';
    } else if (block === 'bullet' && /^\s/.test(line)) {
      bullets[bullets.length - 1] += ` ${line.trim()}`;
    } else if (block === 'summary') {
      summary.push(line.trim());
    } else if (summary.length === 0 && block === 'none') {
      summary.push(line.trim());
      summaryLine = n;
      block = 'summary';
    } else {
      fail(n, `Unexpected text: "${line.trim().slice(0, 40)}".`);
    }
  }

  if (summary.length === 0)
    fail(undefined, 'The summary paragraph is missing.');
  if (bullets.length === 0) fail(undefined, 'At least one bullet is required.');
  if (code?.length === 0) fail(undefined, 'The code block is empty.');

  const summaryText = summary.join(' ');
  const summaryProblem = inlineProblem(summaryText);
  if (summaryProblem) fail(summaryLine, summaryProblem);
  bullets.forEach((b, i) => {
    const problem = inlineProblem(b);
    if (problem) fail(bulletLines[i], problem);
  });

  return {
    summary: summaryText,
    bullets,
    code: code?.join('\n'),
  };
}

/**
 * Fails the build if an internal `docLink` doesn't point at a docs page, or
 * its `#fragment` doesn't match a heading on that page. Starlight's link
 * validator only covers links inside docs pages, not these.
 */
async function checkDocLink(file: string, href: string): Promise<void> {
  const url = new URL(href, 'https://docs.shorebird.dev');
  if (url.origin !== 'https://docs.shorebird.dev') return;
  const path = url.pathname.replace(/^\/|\/$/g, '');
  const docs = await getCollection('docs');
  const doc = docs.find((d) => d.id === path || d.id === `${path}/index`);
  // Linking an unlisted or draft page would advertise it, which is what
  // `src/unlisted.ts` exists to prevent (and a draft 404s in production).
  if (doc && (doc.data.draft || unlistedPages.includes(doc.id))) {
    throw new Error(
      `${file}: docLink.href "${href}" is an unlisted or draft page. Link a ` +
        'published page instead.',
    );
  }
  // Standalone pages like /roadmap/ aren't in the docs collection.
  const standalone = [
    `src/pages/${path}.astro`,
    `src/pages/${path}/index.astro`,
  ];
  if (!doc && path && standalone.some((f) => existsSync(f))) return;
  if (!doc) {
    throw new Error(
      `${file}: docLink.href "${href}" doesn't match any docs page. Use the ` +
        'path from the address bar, like /code-push/rollback/.',
    );
  }
  const fragment = decodeURIComponent(url.hash.slice(1));
  if (!fragment) return;
  const { headings } = await render(doc);
  if (!headings.some((h) => h.slug === fragment)) {
    throw new Error(
      `${file}: docLink.href "${href}" links to #${fragment}, but that page ` +
        `has no such heading. Its headings are: ` +
        headings.map((h) => `#${h.slug}`).join(', '),
    );
  }
}

/**
 * A copy of `entries`, newest first. Same-day entries are ordered by file
 * name, since the order `getCollection` returns them in isn't guaranteed.
 */
export function newestFirst(entries: ChangelogEntry[]): ChangelogEntry[] {
  return [...entries].sort(
    (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id),
  );
}

let cached: Promise<ChangelogEntry[]> | undefined;

/** Every published entry, newest first, validated. */
export function getEntries(): Promise<ChangelogEntry[]> {
  cached ??= (async () => {
    const files = await getCollection('changelog');
    const entries = await Promise.all(
      files.map(async ({ id, data, body, filePath }) => {
        const file = filePath ?? `src/content/changelog/${id}.md`;
        // The file name is the entry's anchor, so it can't be a month's.
        if (
          /^(january|february|march|april|may|june|july|august|september|october|november|december)-\d{4}$/.test(
            id,
          )
        ) {
          throw new Error(
            `${file}: the file name matches a month heading's anchor. Rename it.`,
          );
        }
        const titleProblem = inlineProblem(data.title, false);
        if (titleProblem) throw new Error(`${file}: title: ${titleProblem}`);
        if (data.docLink) await checkDocLink(file, data.docLink.href);
        return {
          id,
          ...data,
          date: data.date.toISOString().slice(0, 10),
          ...parseBody(file, body ?? ''),
        };
      }),
    );
    return newestFirst(entries);
  })();
  return cached;
}

/** Link to the GitHub release notes for a CLI version. */
export function releaseNotesUrl(version: string): string {
  return `https://github.com/shorebirdtech/shorebird/releases/tag/v${version}`;
}

function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Entries grouped under "September 2026"-style headings, newest first.
 * `id` ("september-2026") anchors the heading and its table-of-contents link.
 */
export function groupByMonth(
  entries: ChangelogEntry[],
): { id: string; label: string; items: ChangelogEntry[] }[] {
  const groups: { id: string; label: string; items: ChangelogEntry[] }[] = [];
  // Sort rather than trust the input order: one entry out of place would
  // otherwise start a second heading for its month.
  for (const e of newestFirst(entries)) {
    const label = formatMonth(e.date);
    let group = groups.find((g) => g.label === label);
    if (!group) {
      const id = label.toLowerCase().replace(' ', '-');
      groups.push((group = { id, label, items: [] }));
    }
    group.items.push(e);
  }
  return groups;
}
