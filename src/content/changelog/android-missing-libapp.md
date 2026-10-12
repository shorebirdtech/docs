---
title: Clear error when an Android build drops libapp.so
date: 2026-09-14
version: 1.6.121
area: CLI
type: Fixed
---

`shorebird release android` and `shorebird patch android` now stop with an
explanation when the built app bundle has no `libapp.so`, your compiled Dart
code, for any architecture.

- Previously this failed with a generic error about missing artifacts that
  pointed at ABI filters.
- The usual cause is a custom Gradle setup that relocates build directories, so
  the bundle is packaged before `libapp.so` is written.
- A patch that covers only some of the release's architectures now warns and
  lists the skipped ones, since devices on those architectures won't get it.
