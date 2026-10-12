---
title: The CLI refuses to delete built-in tracks
date: 2026-10-11
version: 1.6.128
area: CLI
type: Changed
docLink:
  label: Delete a track
  href: /code-push/tracks/#delete-a-track
---

`shorebird channels delete` now refuses `stable`, `beta`, and `staging` with a
usage error before contacting the server, which already refuses them.

- With `--json`, the success object no longer includes `is_default_track`, since
  a successful delete can no longer involve a built-in track.
