---
title: More CLI fixes in 1.6.129
date: 2026-10-16
version: 1.6.129
area: CLI
type: Fixed
---

CLI 1.6.129 also fixes these issues.

- iOS, iOS framework, and macOS patches no longer leave copies of the app's
  binaries in the system temp directory.
- AAR releases and patches skip architectures that have no `libapp.so`, as
  Android releases do, and warn when a patch covers only some of them.
- iOS framework, Linux, and Windows patches check the release's minimum Flutter
  version before downloading the release's artifacts. On every platform that has
  a minimum, the message names the command that creates a new release.
- Commands run at the same time from one login no longer refresh with a stale
  token. A refresh uses the newest credentials on disk.
- Piping output into a command that exits early, such as `head -1`, exits with
  status 141 instead of crashing.
- Error and progress messages no longer name temporary paths that are deleted
  before the command finishes.
- The release picker shows one hint, and `shorebird patches promote --help`
  describes `--flavor` correctly.
- `shorebird account orgs --help` lists every role, including `none` for an
  organization where you only collaborate on apps.
- When a login can't be refreshed, the CLI says why. An OAuth error from the
  auth service asks you to run `shorebird login`. A network or server error
  leaves your login as it was and exits with status 75 instead of 70.
- iOS and iOS framework patches no longer read `SHOREBIRD_PATCH_DD_MAX_BYTES`.
  Pass `--dd-max-bytes` to `shorebird patch` instead.
- The error for an `--org-id` that isn't a number lists your organizations and
  their ids.
