---
title: iOS previews show your app's logs again
date: 2026-10-09
version: 1.6.126
area: CLI
type: Fixed
docLink:
  label: Preview a release
  href: /code-push/preview/
---

With Xcode 26 or later, `shorebird preview` on an iOS device now shows the app's
`print` output and `[shorebird]` updater lines, as Android and macOS previews
do.

- Previously the app launched but none of its output appeared.
- The command stays attached until the app exits.
