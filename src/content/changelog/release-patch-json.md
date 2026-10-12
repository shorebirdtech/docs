---
title: Script releases and patches with JSON output
date: 2026-10-08
version: 1.6.125
area: CLI
type: New
docLink:
  label: JSON output
  href: /code-push/ci/scripting/#json-output
---

`shorebird release` and `shorebird patch` now support `--json`, so a script gets
the new release or patch as data instead of parsing log lines.

- `shorebird release --json` reports the app ID, the platforms, and each release
  with its version, Flutter version, and per-platform status.
- `shorebird patch --json` reports the app ID, the track, and each patch with
  its platform, release version, patch number, and link percentage.
- With `--dry-run`, both report what would have been published, with `dry_run`
  set to `true`.
- With `--json`, stdout holds only the JSON object. Progress and logs go to
  stderr.

```sh
shorebird patch android --release-version=latest --json
```
