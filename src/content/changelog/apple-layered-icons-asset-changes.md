---
title: Layered app icons no longer count as asset changes
date: 2026-08-28
version: 1.6.120
area: CLI
type: Fixed
---

On iOS and macOS, `shorebird patch` no longer reports an asset change for a
layered app icon (`.icon`) that you didn't change.

- Xcode gives a layered icon's images new generated names on every build, so
  every patch looked like it changed the app's asset catalog.
