---
title: Release with the Flutter version you already use
date: 2026-09-21
version: 1.6.123
area: CLI
type: New
docLink:
  label: Match the Flutter version you already use
  href: /getting-started/flutter-version/#match-the-flutter-version-you-already-use
---

`--flutter-version` now accepts `fvm` and `system`, so you no longer have to
look up and repeat your Flutter version number.

- `--flutter-version=fvm` uses the version fvm resolves for your project from
  its `.fvmrc`. It requires `fvm` on your `PATH`.
- `--flutter-version=system` uses the version reported by the `flutter` on your
  `PATH`.
- Shorebird still builds with its own fork of Flutter at that version, not with
  your fvm or system install. A version Shorebird doesn't support fails the same
  way as one you name explicitly.

```sh
shorebird release android --flutter-version=fvm
```
