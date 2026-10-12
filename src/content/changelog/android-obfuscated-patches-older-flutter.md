---
title: Patch obfuscated Android releases built with older Flutter
date: 2026-10-08
version: 1.6.125
area: CLI
type: Fixed
---

Patching an Android release built with `--obfuscate` on a Flutter version older
than 3.41.2 no longer fails with `Unrecognized flags: load_obfuscation_map`.

- Upgrade the CLI and patch as usual. Existing obfuscated releases become
  patchable without a new release.
- iOS patches still need the release to use Flutter 3.41.2 or later for
  obfuscation, and now fail up front with a clear error instead of a
  `gen_snapshot` failure.
- `shorebird release` now checks the Flutter version it actually builds with,
  including `--flutter-version`.
