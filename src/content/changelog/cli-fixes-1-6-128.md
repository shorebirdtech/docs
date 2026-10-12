---
title: More CLI fixes in 1.6.128
date: 2026-10-11
version: 1.6.128
area: CLI
type: Fixed
---

CLI 1.6.128 also fixes these issues.

- Flavored macOS patches read the release version from the flavor's build.
- iOS framework patches honor `SHOREBIRD_PATCH_DD_MAX_BYTES`.
- Releases on iOS, iOS framework, macOS, and Linux continue when an artifact
  already exists, as Android and Windows did.
- `shorebird release`, `shorebird patch`, and `shorebird preview` no longer
  leave copies of the app in the system temp directory.
- Only expired or revoked credentials count as logged out. A malformed
  credentials file no longer crashes every command, and on macOS and Linux the
  file is now readable only by you.
- `shorebird doctor --fix` shows every issue a fix leaves, and the count of
  fixable issues is accurate. `--fix` with `--json` is now a usage error.
- `shorebird patch aar` without `--release-version` in a non-interactive shell
  fails before building instead of crashing after it.
- Ctrl-C works again after `shorebird preview` launches an iOS app.
