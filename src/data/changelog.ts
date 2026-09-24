// cspell:words rollforward

// Shared by the changelog page (`src/pages/changelog.astro`), its
// agent-facing Markdown twin (`src/pages/changelog.md.ts`), and its RSS feed
// (`src/pages/changelog.xml.ts`), so all three list the same entries.

export const CHANGELOG_TITLE = 'Changelog';
export const CHANGELOG_DESCRIPTION =
  'What we shipped to Code Push, the CLI, and the API, newest first.';

// The parts of Shorebird a change can be filed under. Fixed on purpose:
// this drives the area filter chips, so it should stay in sync with the
// products we actually ship rather than growing a new value per entry.
export const AREAS = ['Code Push', 'CLI', 'Console', 'API', 'Flutter'] as const;
export type Area = (typeof AREAS)[number];

export interface ChangelogEntry {
  /** Anchor id and permalink slug for this entry. */
  id: string;
  /** Release date, as `YYYY-MM-DD`. */
  date: string;
  /** The Shorebird CLI release that shipped the change, without the `v`. */
  version: string;
  area: Area;
  type: 'New' | 'Fixed' | 'Changed' | 'Deprecated';
  title: string;
  summary: string;
  bullets: string[];
  code?: string;
  docLink?: { label: string; href: string };
}

// Hand-written, in any order; readers see them newest first. Add an entry
// here when something ships that a developer integrating Code Push would want
// to know about. Wrap commands and flags in backticks in `summary` and
// `bullets` to render them as inline code, as in Markdown.
export const ENTRIES: ChangelogEntry[] = [
  {
    id: 'flutter-version-fvm-and-system',
    date: '2026-09-21',
    version: '1.6.123',
    area: 'CLI',
    type: 'New',
    title: 'Release with the Flutter version you already use',
    summary:
      '`--flutter-version` now accepts `fvm` and `system`, so you no longer have to look up and repeat your Flutter version number.',
    bullets: [
      '`--flutter-version=fvm` uses the version fvm resolves for your project from its `.fvmrc`. It requires `fvm` on your `PATH`.',
      '`--flutter-version=system` uses the version reported by the `flutter` on your `PATH`.',
      "Shorebird still builds with its own fork of Flutter at that version, not with your fvm or system install. A version Shorebird doesn't support fails the same way as one you name explicitly.",
    ],
    code: 'shorebird release android --flutter-version=fvm',
    docLink: {
      label: 'Match the Flutter version you already use',
      href: '/getting-started/flutter-version/#match-the-flutter-version-you-already-use',
    },
  },
  {
    id: 'failed-patch-checks-for-replacement',
    date: '2026-09-16',
    version: '1.6.122',
    area: 'Code Push',
    type: 'Fixed',
    title: 'A patch that fails to load is replaced on the same launch',
    summary:
      'When a patch fails to load, the device now checks for a replacement patch right away instead of waiting for the next launch.',
    bullets: [
      'Previously, reporting the failure suppressed the update check, so the device ran the base release and stayed on the bad patch until it launched again.',
      'Patch checks now report the patch the device is actually running, so each device is attributed to the right patch.',
      'These fixes are in the updater built into your app, so they apply to releases built with Shorebird 1.6.122 or later.',
    ],
    docLink: {
      label: 'Patch integrity and automatic rollback',
      href: '/code-push/rollback/#patch-integrity-and-automatic-rollback',
    },
  },
  {
    id: 'flutter-3-47-4',
    date: '2026-09-16',
    version: '1.6.122',
    area: 'Flutter',
    type: 'New',
    title: 'Flutter 3.47.4 support',
    summary: 'Shorebird now supports Flutter 3.47.4 and Dart 3.13.3.',
    bullets: [
      'iOS: native assets now require iOS 15, raised from iOS 13.',
      'iOS: a build now warns when Device Support Symbols are missing, instead of failing partway through.',
      'Windows: Application Control and security policy blocks are handled instead of failing the build.',
    ],
    code: 'shorebird release ios --flutter-version=3.47.4',
    docLink: {
      label: 'Flutter versions',
      href: '/getting-started/flutter-version/',
    },
  },
  {
    id: 'shorebird-apps-commands',
    date: '2026-09-14',
    version: '1.6.121',
    area: 'CLI',
    type: 'New',
    title: 'Manage apps from the CLI',
    summary:
      'New `shorebird apps` commands list, rename, delete, and transfer apps without opening the Console.',
    bullets: [
      '`shorebird apps transfer --org-id <id>` moves an app into another organization. Run `shorebird account orgs` to find the id.',
      '`shorebird apps rename --name <name>` changes the display name.',
      "`shorebird apps delete` has no prompt. Pass `--confirm-name` with the app's current display name to confirm.",
    ],
    code: 'shorebird apps transfer --app-id <id> --org-id 42',
    docLink: {
      label: 'Transfer an app',
      href: '/account/orgs/#transfer-an-app',
    },
  },
  {
    id: 'shorebird-channels-commands',
    date: '2026-09-14',
    version: '1.6.121',
    area: 'CLI',
    type: 'New',
    title: 'Manage channels from the CLI',
    summary:
      'New `shorebird channels` commands create, list, and delete the channels (tracks) an app can publish to.',
    bullets: [
      'Publishing a patch with `--track=<name>` still creates that channel automatically.',
      '`shorebird channels delete` is permanent and has no prompt. Pass `--confirm-name` with the channel name to confirm.',
    ],
    code: 'shorebird channels create --app-id <id> --name qa',
    docLink: {
      label: 'Staging patches',
      href: '/code-push/guides/staging-patches/',
    },
  },
  {
    id: 'patches-rollback-and-rollforward',
    date: '2026-08-28',
    version: '1.6.120',
    area: 'CLI',
    type: 'New',
    title: 'Roll patches back and forward from the CLI',
    summary:
      '`shorebird patches rollback` and `shorebird patches rollforward` do the same as the Rollback and Roll Forward actions in the Console.',
    bullets: [
      'Both take `--release-version` and `--patch-number`.',
      'By default, a patch that is already in the requested state is reported and the command succeeds. Add `--require-change` to exit with an error instead.',
    ],
    code: 'shorebird patches rollback --release-version 1.0.0+1 --patch-number 1',
    docLink: {
      label: 'Roll back a patch',
      href: '/code-push/rollback/',
    },
  },
];

/** Link to the GitHub release notes for a CLI version. */
export function releaseNotesUrl(version: string): string {
  return `https://github.com/shorebirdtech/shorebird/releases/tag/v${version}`;
}

/** A copy of `entries`, newest first. Same-day entries keep their order. */
export function newestFirst(entries: ChangelogEntry[]): ChangelogEntry[] {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date));
}

function formatMonth(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * `ENTRIES` grouped under "September 2026"-style headings, newest first.
 * `id` ("september-2026") anchors the heading and its table-of-contents link.
 */
export function groupByMonth(
  entries: ChangelogEntry[],
): { id: string; label: string; items: ChangelogEntry[] }[] {
  const groups: { id: string; label: string; items: ChangelogEntry[] }[] = [];
  // Sort rather than trust the array order: one entry out of place would
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
