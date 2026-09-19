// cspell:words rollouts

// Shared by the changelog page (`src/pages/changelog.astro`) and its
// agent-facing Markdown twin (`src/pages/changelog.md.ts`), so both always
// list the same entries.

export const CHANGELOG_TITLE = 'Changelog';
export const CHANGELOG_DESCRIPTION =
  'Everything we shipped to Code Push, the CLI, and the API.';

// The parts of Shorebird a change can be filed under. Fixed on purpose —
// this drives the area filter chips, so it should stay in sync with the
// products we actually ship rather than growing a new value per entry.
export const AREAS = ['Code Push', 'CLI', 'Console', 'API', 'Flutter'] as const;
export type Area = (typeof AREAS)[number];

export interface ChangelogEntry {
  /** Anchor id and permalink slug for this entry. */
  id: string;
  date: string;
  version: string;
  area: Area;
  type: 'New' | 'Fixed' | 'Changed' | 'Deprecated';
  title: string;
  summary: string;
  bullets: string[];
  code?: string;
  docLink?: { label: string; href: string };
}

// Hand-written, newest first. Add an entry here when something ships that a
// developer integrating Code Push would want to know about.
export const ENTRIES: ChangelogEntry[] = [
  {
    id: 'staged-rollouts-in-one-command',
    date: '2026-09-10',
    version: '1.7.2',
    area: 'Code Push',
    type: 'New',
    title: 'Staged rollouts in one command',
    summary:
      'shorebird patch --track=beta now takes --rollout, so a staged patch can start at 5% without a second command.',
    bullets: [
      '--rollout takes a whole percentage from 1 to 100. Omit it and the patch goes to the entire track, exactly as before.',
      'Raise or halt a rollout from the console, or with shorebird patch rollout set 25.',
      'Rollback still applies to the whole track — halting a rollout leaves the previous patch installed.',
    ],
    code: 'shorebird patch android --track=beta --rollout=5',
    docLink: {
      label: 'Percentage-based rollouts',
      href: '/code-push/guides/percentage-based-rollouts/',
    },
  },
];

function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** `ENTRIES` grouped under "September 2026"-style headings, newest first. */
export function groupByMonth(
  entries: ChangelogEntry[],
): { label: string; items: ChangelogEntry[] }[] {
  const groups: { label: string; items: ChangelogEntry[] }[] = [];
  for (const e of entries) {
    const label = formatMonth(e.date);
    let group = groups.find((g) => g.label === label);
    if (!group) groups.push((group = { label, items: [] }));
    group.items.push(e);
  }
  return groups;
}
