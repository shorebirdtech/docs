---
title: Manage apps from the CLI
date: 2026-09-14
version: 1.6.121
area: CLI
type: New
docLink:
  label: Transfer an app
  href: /account/orgs/#transfer-an-app
---

New `shorebird apps` commands list, rename, delete, and transfer apps without
opening the Console.

- `shorebird apps transfer --org-id <id>` moves an app into another
  organization. Run `shorebird account orgs` to find the id.
- `shorebird apps rename --name <name>` changes the display name.
- `shorebird apps delete` has no prompt. Pass `--confirm-name` with the app's
  current display name to confirm.

```sh
shorebird apps transfer --app-id <id> --org-id 42
```
