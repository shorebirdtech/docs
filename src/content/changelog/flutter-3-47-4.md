---
title: Flutter 3.47.4 support
date: 2026-09-16
version: 1.6.122
area: Flutter
type: New
docLink:
  label: Flutter versions
  href: /getting-started/flutter-version/
---

Shorebird now supports Flutter 3.47.4 and Dart 3.13.3.

- iOS: native assets now require iOS 15, raised from iOS 13.
- iOS: a build now warns when Device Support Symbols are missing, instead of
  failing partway through.
- Windows: Application Control and security policy blocks are handled instead of
  failing the build.

```sh
shorebird release ios --flutter-version=3.47.4
```
