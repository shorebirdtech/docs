---
title: Crash fixes for login, doctor, and set-track
date: 2026-10-10
version: 1.6.127
area: CLI
type: Fixed
---

Three commands that could crash now work or fail with a clear message.

- `shorebird login` no longer crashes with
  `Bad state: read(ScopedRef<Browser>)`, a bug introduced in 1.6.126.
- `shorebird doctor --verbose` shows Gradle as not detected when the Gradle
  version lookup fails, instead of crashing.
- `shorebird patches set-track` and `shorebird patches promote` report a patch
  number that isn't a number as a usage error instead of crashing.
