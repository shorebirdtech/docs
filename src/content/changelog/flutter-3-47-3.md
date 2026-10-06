---
title: Flutter 3.47.3 support
date: 2026-09-14
version: 1.6.121
area: Flutter
type: New
docLink:
  label: Flutter versions
  href: /getting-started/flutter-version/
---

Shorebird now supports Flutter 3.47.3 and Dart 3.13.3.

- Android: fixes license detection for cmdline-tools 23.0 and newer.
- iOS and macOS: a missing Xcode is now handled instead of failing hard.
- Windows: fixes Dart cross-compilation.
- B-series PowerVR GPUs no longer use Vulkan.

```sh
shorebird release android --flutter-version=3.47.3
```
