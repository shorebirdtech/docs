// Typed accessors and date formatting for the generated Flutter release data
// in flutter-releases.json. Regenerate that file with
// `npm run update-flutter-releases`.
//
// Pages read from here rather than importing the JSON directly so that dates
// are formatted one way everywhere, and so the docs never have to hand-edit a
// version number that Flutter has already superseded.
import data from './flutter-releases.json';

export interface ReleaseLine {
  /** The release line, e.g. "3.47". */
  line: string;
  /** Newest patch of the line, e.g. "3.47.1". */
  latestPatch: string;
  /** Dart SDK version bundled with `latestPatch`. */
  dartVersion: string;
  /** When the line first reached stable, e.g. "2026-08-12". */
  releaseDate: string;
  /** When `latestPatch` shipped. */
  latestPatchDate: string;
  patchCount: number;
}

export interface LatestStable {
  version: string;
  dartVersion: string;
  releaseDate: string;
}

export const latestStable: LatestStable = data.latestStable;
export const releaseLines: ReleaseLine[] = data.lines;

export const currentLine = releaseLines[0]!;
export const previousLine = releaseLines[1]!;

export function formatLongDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  });
}

export function formatMonth(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Whole months between `isoDate` and now. */
export function monthsSince(isoDate: string, now = new Date()): number {
  const then = new Date(isoDate);
  const months =
    (now.getUTCFullYear() - then.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - then.getUTCMonth());
  return now.getUTCDate() < then.getUTCDate() ? months - 1 : months;
}

/**
 * Human-readable age, or null for anything less than a month old: the newest
 * release line is days old, and restating that under its release date is noise
 * rather than information.
 */
export function formatAge(months: number): string | null {
  if (months < 1) return null;
  if (months === 1) return '1 month ago';
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const yearLabel = years === 1 ? '1 year' : `${years} years`;
  if (remainder === 0) return `${yearLabel} ago`;

  const monthLabel = remainder === 1 ? '1 month' : `${remainder} months`;
  return `${yearLabel} ${monthLabel} ago`;
}

export const latestStableDate = formatLongDate(latestStable.releaseDate);
