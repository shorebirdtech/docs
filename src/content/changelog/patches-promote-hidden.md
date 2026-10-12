---
title: The patches promote command is hidden from help
date: 2026-10-11
version: 1.6.128
area: CLI
type: Deprecated
docLink:
  label: Promote a patch from the CLI
  href: /code-push/tracks/#via-the-cli
---

`shorebird patches promote` no longer appears in `shorebird patches --help`. Use
`shorebird patches set-track` instead.

- `promote` has been deprecated since December 2025. It still runs, so existing
  scripts keep working until it's removed.

```sh
shorebird patches set-track --release-version 1.0.0+1 --patch-number 1 --track stable
```
