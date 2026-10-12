---
title: macOS patches install on re-signed apps
date: 2026-10-11
version: 1.6.128
area: Code Push
type: Fixed
---

macOS patches now install on apps that were re-signed after release, such as for
Developer ID notarization or the Mac App Store.

- Previously, re-signing changed the binary that patches were built against, so
  every patch failed the device's check that the app matches its release.
- Patches are now built against only the app's Dart code, which re-signing
  doesn't change.
- The fix ships in the engine with CLI 1.6.128. Create a new macOS release with
  CLI 1.6.128 or later to pick it up. Releases built earlier, or with an older
  `--flutter-version`, keep the old behavior.
