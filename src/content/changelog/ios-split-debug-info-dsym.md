---
title: iOS debug symbols now upload to symbol servers
date: 2026-09-21
version: 1.6.123
area: CLI
type: Fixed
docLink:
  label: Release options
  href: /code-push/release/#options
---

On iOS, `--split-debug-info` now writes a Mach-O dSYM, so symbol servers ingest
it and Dart stack traces from production become readable.

- Previously the file was an ELF with no debug ID. Uploads reported finding
  nothing, while still exiting cleanly.
- The fix is in Shorebird's Flutter 3.47.5, the default in CLI 1.6.123. A
  release built with an older `--flutter-version` still gets the old file.
