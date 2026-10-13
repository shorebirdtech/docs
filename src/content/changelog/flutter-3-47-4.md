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
- iOS: when debugging with Xcode 27, a newly paired or upgraded device no longer
  hangs on a white screen for minutes. Flutter now prepares missing Device
  Support Symbols first, or warns with the steps to do it yourself.
- Windows: when Smart App Control or another security policy blocks Flutter's
  binaries, the tool now exits with an actionable error instead of crashing.

```sh
shorebird release ios --flutter-version=3.47.4
```
