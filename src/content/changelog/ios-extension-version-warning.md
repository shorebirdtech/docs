---
# cspell:ignore appex ITMS
title: Warning for app extension versions that don't match the app
date: 2026-10-08
version: 1.6.125
area: CLI
type: New
---

`shorebird release ios` now warns when an app extension's version or build
number differs from the app's, which App Store Connect rejects with ITMS-90473.

- The warning names each extension and the mismatched value, like
  `NotificationService.appex: CFBundleShortVersionString is "1.15.32", the app is "1.15.67"`.
- Shorebird doesn't change the versions for you. Update the extension targets in
  Xcode so they match the app.
