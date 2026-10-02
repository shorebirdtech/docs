---
title: Flutter 3.47.5 support
date: 2026-09-21
version: 1.6.123
area: Flutter
type: New
docLink:
  label: Flutter versions
  href: /getting-started/flutter-version/
---

Shorebird now supports Flutter 3.47.5 and Dart 3.13.4.

- iOS: fixes an occasional crash when debugging on physical iOS 27 devices.
- Widget Previewer: fixes a crash when re-expanding a preview group.
- A Dart Development Service startup failure is now handled instead of crashing.

```sh
shorebird release ios --flutter-version=3.47.5
```
