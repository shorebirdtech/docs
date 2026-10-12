---
# cspell:ignore XCUITest
title: Flutter 3.47.7 support
date: 2026-10-09
version: 1.6.126
area: Flutter
type: New
docLink:
  label: Flutter versions
  href: /getting-started/flutter-version/
---

Shorebird now supports Flutter 3.47.7 and Dart 3.13.5.

- iOS: fixes accessibility frames for `OverlayPortal`, which were shrunk and
  anchored top-left, so VoiceOver focus and XCUITest taps missed the visible
  controls.
- iOS: fixes VoiceOver focus jumping to the top left of the screen in a
  `ReorderableListView`.

```sh
shorebird release ios --flutter-version=3.47.7
```
