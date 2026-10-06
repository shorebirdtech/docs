---
title: Flutter 3.47.6 support
date: 2026-10-02
version: 1.6.124
area: Flutter
type: New
docLink:
  label: Flutter versions
  href: /getting-started/flutter-version/
---

Shorebird now supports Flutter 3.47.6 and Dart 3.13.5.

- Windows: fixes a hang in production apps. The fix ships in the engine, so a
  Windows app picks it up only from a new release built with Flutter 3.47.6 or
  later.

```sh
shorebird release windows --flutter-version=3.47.6
```
