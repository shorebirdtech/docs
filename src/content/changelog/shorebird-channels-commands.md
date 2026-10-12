---
title: Manage channels from the CLI
date: 2026-09-14
version: 1.6.121
area: CLI
type: New
docLink:
  label: Manage tracks from the CLI
  href: /code-push/tracks/#managing-tracks-from-the-cli
---

New `shorebird channels` commands create, list, and delete the channels (tracks)
an app can publish to.

- Publishing a patch with `--track=<name>` still creates that channel
  automatically.
- `shorebird channels delete` has no prompt. Pass `--confirm-name` with the
  channel name to confirm. Devices on a deleted channel stop receiving patches.
- The built-in `stable`, `beta`, and `staging` channels can't be deleted.

```sh
shorebird channels create --app-id <id> --name qa
```
