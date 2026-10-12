---
title: Setting a patch's track again succeeds
date: 2026-10-11
version: 1.6.128
area: CLI
type: Changed
docLink:
  label: Set patch track
  href: /code-push/patch/#set-patch-track
---

`shorebird patches set-track` now succeeds when the patch is already on the
requested track, instead of failing with a usage error.

- It says the patch is already on that track and doesn't promote it again.
- This matches `shorebird patches rollback` and `rollforward`, so a retried CI
  job doesn't fail.
- With `--json`, `changed` is `false` when nothing changed.
