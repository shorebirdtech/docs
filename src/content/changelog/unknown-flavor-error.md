---
title: An unknown flavor is an error
date: 2026-10-11
version: 1.6.128
area: CLI
type: Changed
---

Commands that act on an existing app now fail when `--flavor` names a flavor
that `shorebird.yaml` doesn't define, instead of silently using the default app.

- For example, a mistyped `shorebird patches rollback --flavor` previously
  rolled back a patch on the default app.
- This covers the `patches`, `releases`, `channels`, and `apps` commands. The
  error lists the flavors that `shorebird.yaml` defines.
- `--app-id` still takes precedence over `--flavor`.
