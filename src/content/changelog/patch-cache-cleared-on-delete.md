---
title: Deleted tracks and releases stop serving patches
date: 2026-10-15
area: Code Push
type: Fixed
docLink:
  label: Delete a track
  href: /code-push/tracks/#delete-a-track
---

Deleting a track now takes effect on the next patch check, and deleting a
release can no longer leave its patches cached.

- Devices on a deleted track could keep receiving its last patch. That cached
  answer is now cleared.
- If clearing the cache fails during a rollback or roll forward, the request
  returns `patch_rollback_cache_error` or `patch_rollforward_cache_error`.
  Running it again clears the cache.
- After you delete one platform of a release, devices on that platform are no
  longer offered its patches. Before, they were, and the download failed because
  the patch files had been deleted with the platform.
