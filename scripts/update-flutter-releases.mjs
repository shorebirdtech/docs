#!/usr/bin/env node
// Regenerates src/data/flutter-releases.json from Flutter's official release
// feeds. Run with `npm run update-flutter-releases`; a scheduled workflow
// (.github/workflows/flutter-releases.yaml) runs it daily and fails the build
// if the committed file has fallen behind.
//
// The feeds list every build Flutter has ever shipped, per platform. What the
// docs need is one row per release line (3.47, 3.44, ...) carrying its newest
// patch, since Flutter only hotfixes the newest stable and there is never a
// reason to sit on an older patch of a line.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const PLATFORMS = ['macos', 'windows', 'linux'];
const FEED_URL = (platform) =>
  `https://storage.googleapis.com/flutter_infra_release/releases/releases_${platform}.json`;

const OUTPUT_PATH = new URL(
  '../src/data/flutter-releases.json',
  import.meta.url,
);

// Flutter 2.x and earlier predate every version of Shorebird and are far
// outside anything the docs recommend, so they are dropped at the source.
const MIN_MAJOR = 3;

const STABLE_VERSION = /^(\d+)\.(\d+)\.(\d+)$/;

// Stable entries carry a bare "3.13.1", but some older ones use the beta-style
// "3.13.0 (build 3.13.0-1.2.beta)". Keep just the version.
function normalizeDartVersion(raw) {
  if (!raw) return null;
  return raw.split(' ')[0];
}

async function fetchFeed(platform) {
  const response = await fetch(FEED_URL(platform));
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${platform} releases: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

// Collapses the per-platform, per-architecture entries into one record per
// stable version. A version is considered released on the earliest date any
// platform published it.
function collectStableVersions(feeds) {
  const versions = new Map();

  for (const feed of feeds) {
    for (const release of feed.releases) {
      if (release.channel !== 'stable') continue;

      const match = STABLE_VERSION.exec(release.version);
      if (!match) continue;

      const [, major, minor, patch] = match.map(Number);
      if (major < MIN_MAJOR) continue;

      const existing = versions.get(release.version);
      const releaseDate = release.release_date.slice(0, 10);
      const dartVersion = normalizeDartVersion(release.dart_sdk_version);

      if (!existing) {
        versions.set(release.version, {
          version: release.version,
          major,
          minor,
          patch,
          releaseDate,
          dartVersion,
        });
        continue;
      }

      if (releaseDate < existing.releaseDate)
        existing.releaseDate = releaseDate;
      existing.dartVersion ??= dartVersion;
    }
  }

  return [...versions.values()];
}

// One row per release line, newest first.
function buildLines(stableVersions) {
  const byLine = new Map();

  for (const release of stableVersions) {
    const line = `${release.major}.${release.minor}`;
    const existing = byLine.get(line) ?? [];
    existing.push(release);
    byLine.set(line, existing);
  }

  const lines = [...byLine.entries()].map(([line, releases]) => {
    releases.sort((a, b) => a.patch - b.patch);
    const first = releases[0];
    const latest = releases[releases.length - 1];

    return {
      line,
      latestPatch: latest.version,
      dartVersion: latest.dartVersion,
      // When the line first shipped to stable, which is what makes a version
      // "a year old" - not the date of its final hotfix.
      releaseDate: first.releaseDate,
      latestPatchDate: latest.releaseDate,
      patchCount: releases.length,
    };
  });

  lines.sort((a, b) => {
    const [aMajor, aMinor] = a.line.split('.').map(Number);
    const [bMajor, bMinor] = b.line.split('.').map(Number);
    return bMajor - aMajor || bMinor - aMinor;
  });

  return lines;
}

// The newest stable Flutter, which is the answer to "what version of Flutter
// is current". Read from the newest line rather than the feed's
// `current_release.stable` hash so it stays consistent with the table.
function buildLatestStable(lines) {
  const newest = lines[0];
  return {
    version: newest.latestPatch,
    dartVersion: newest.dartVersion,
    releaseDate: newest.latestPatchDate,
  };
}

const feeds = await Promise.all(PLATFORMS.map(fetchFeed));
const lines = buildLines(collectStableVersions(feeds));

if (lines.length === 0) {
  throw new Error('No stable Flutter releases found; refusing to write.');
}

// No generation timestamp: the file should only change when Flutter ships
// something, so a daily no-op run produces no diff and no pull request.
const json = `${JSON.stringify({ latestStable: buildLatestStable(lines), lines }, null, 2)}\n`;

const unchanged =
  existsSync(OUTPUT_PATH) && readFileSync(OUTPUT_PATH, 'utf8') === json;

writeFileSync(OUTPUT_PATH, json);

console.log(
  unchanged
    ? `No change: ${lines.length} release lines, latest ${lines[0].latestPatch}.`
    : `Updated: ${lines.length} release lines, latest ${lines[0].latestPatch}.`,
);
