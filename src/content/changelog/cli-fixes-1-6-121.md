---
title: More CLI fixes in 1.6.121
date: 2026-09-14
version: 1.6.121
area: CLI
type: Fixed
---

CLI 1.6.121 also fixes these issues.

- After an Xcode upgrade, iOS and macOS patches no longer report every asset
  catalog as changed when no asset changed.
- When an Android build fails and a plugin still references the legacy
  `flutter.jar`, the error names the plugin to upgrade.
- `shorebird init` no longer separates a comment in your pubspec's `flutter:`
  section from the key it describes when it adds the `assets:` entry.
- Mistakes in the signing flags of `shorebird release` and `shorebird patch` now
  name the flag to fix. For example, a key file that doesn't exist names the
  flag it was passed to, and `shorebird patch` with only one of
  `--public-key-path` and `--private-key-path` names the one that's missing.
- iOS patch errors, like a missing `.xcarchive` or a release built with Flutter
  older than 3.22.2, now say what to do next.
- An interrupted Flutter install, such as for `--flutter-version`, now resumes
  on the next run instead of needing `shorebird cache clean`.
