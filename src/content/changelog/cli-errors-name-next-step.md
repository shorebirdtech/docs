---
title: Errors say what to do next
date: 2026-10-08
version: 1.6.125
area: CLI
type: Changed
---

Errors from `shorebird init`, `shorebird patch`, `shorebird preview`, and the
checks that run before a command now name the step that fixes them.

- `shorebird patch --force` explains that there's no `--force` flag and points
  to `--allow-native-diffs` and `--allow-asset-diffs`.
- With `--json`, the same advice is in the error's `hint`.
