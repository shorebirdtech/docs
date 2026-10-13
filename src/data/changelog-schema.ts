import { z } from 'astro/zod';

// Kept apart from `changelog.ts` so `src/content.config.ts` can import it
// without pulling in `astro:content`.

// The parts of Shorebird a change can be filed under. Fixed on purpose: this
// drives the area filter chips, so it should stay in sync with the products
// we actually ship rather than growing a new value per entry.
export const AREAS = ['Code Push', 'CLI', 'Console', 'API', 'Flutter'] as const;
export type Area = (typeof AREAS)[number];

// Changes in these areas always ship in a CLI release, so they need a version.
const VERSIONED_AREAS: readonly Area[] = ['CLI', 'Flutter'];

export const TYPES = ['New', 'Fixed', 'Changed', 'Deprecated'] as const;
export type ChangeType = (typeof TYPES)[number];

/**
 * Frontmatter of a `src/content/changelog/*.md` entry. The messages are
 * written for whoever is adding an entry, since they surface as build errors.
 */
export const changelogSchema = z
  .strictObject({
    title: z.string().trim().min(1),
    date: z.date({
      error: 'date must be YYYY-MM-DD with no quotes, like 2026-09-21',
    }),
    // Optional: a Console, API, or server-side Code Push change doesn't ship
    // in a CLI release.
    version: z.coerce
      .string()
      .regex(
        /^\d+\.\d+\.\d+$/,
        'version must be the Shorebird CLI release without a "v", like 1.6.123',
      )
      .optional(),
    area: z.enum(AREAS),
    type: z.enum(TYPES),
    docLink: z
      .strictObject({
        label: z.string().trim().min(1),
        // A relative href would resolve against /changelog/ on the page.
        href: z
          .string()
          .trim()
          .regex(
            /^(\/|https:\/\/)/,
            'docLink.href must start with "/" for a docs page, like ' +
              '/code-push/rollback/, or with "https://"',
          ),
      })
      .optional(),
  })
  .refine((d) => d.version || !VERSIONED_AREAS.includes(d.area), {
    path: ['version'],
    error:
      'version is required for CLI and Flutter changes, since they ship in ' +
      'a CLI release',
  });
