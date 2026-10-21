---
title: Deletes and rollbacks reach devices right away
date: 2026-10-15
area: Code Push
type: Fixed
docLink:
  label: What happens when a patch is rolled back
  href: /code-push/rollback/#what-happens-when-a-patch-is-rolled-back
---

Deleting a track or a release, or rolling a patch back or forward, now takes
effect on the next patch check.

- Devices on a deleted track could keep receiving its last patch. That cached
  answer is now cleared.
- If clearing the cache fails during a rollback or roll forward, the request
  returns `patch_rollback_cache_error` or `patch_rollforward_cache_error`.
  Running it again clears the cache.
- Deleting one platform of a release also deletes that platform's patches, so
  devices aren't offered patches that fail to download.
