---
title: Use --channel wherever --track works
date: 2026-10-16
version: 1.6.130
area: CLI
type: New
docLink:
  label: Publishing a patch to a track
  href: /code-push/tracks/#publishing-a-patch-to-a-track
---

`--channel` is now another name for `--track`.

- It works on `shorebird patch`, `shorebird preview`,
  `shorebird patches set-track`, and `shorebird patches promote`.
- The two flags mean the same thing, so existing scripts that use `--track` keep
  working.

```sh
shorebird patch android --channel staging
```
