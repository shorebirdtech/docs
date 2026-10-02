---
title: Flutter 3.47.2 support
date: 2026-08-28
version: 1.6.120
area: Flutter
type: New
docLink:
  label: Flutter versions
  href: /getting-started/flutter-version/
---

Shorebird now supports Flutter 3.47.2 and Dart 3.13.2.

- iOS and macOS: Swift package dependencies are always updated.
- Windows: fixes hot reload failing on file time truncation.
- Desktop: `--build-name` and `--build-number` are now forwarded to
  `version.json`.

```sh
shorebird release android --flutter-version=3.47.2
```
