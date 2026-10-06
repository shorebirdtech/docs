---
title: The built-in channels can't be deleted
date: 2026-09-01
area: API
type: Changed
docLink:
  label: Delete a track
  href: /code-push/tracks/#delete-a-track
---

Deleting the `stable`, `beta`, or `staging` channel is now refused, since it
would unpublish every patch on that track.

- The API returns 403 with the code `channels_delete_default_channel`.
- Channels you create yourself can still be deleted.
