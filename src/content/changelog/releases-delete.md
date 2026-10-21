---
title: Delete a release from the CLI
date: 2026-10-16
version: 1.6.129
area: CLI
type: New
docLink:
  label: Delete releases
  href: /code-push/release/#delete-releases
---

`shorebird releases delete` deletes a release, or one platform of it with
`--platform`.

- Without `--platform`, it removes the release's artifacts for every platform
  and every patch of the release.
- With `--platform`, the release and its other platforms stay.
- In a terminal it asks you to confirm. Without one, pass `--yes`.
