---
title: Manage channels from the CLI
date: 2026-09-14
version: 1.6.121
area: CLI
type: New
docLink:
  label: Staging patches
  href: /code-push/guides/staging-patches/
---

New `shorebird channels` commands create, list, and delete the channels (tracks)
an app can publish to.

- Publishing a patch with `--track=<name>` still creates that channel
  automatically.
- `shorebird channels delete` is permanent and has no prompt. Pass
  `--confirm-name` with the channel name to confirm.

```sh
shorebird channels create --app-id <id> --name qa
```
