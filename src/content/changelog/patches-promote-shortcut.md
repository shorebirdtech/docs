---
title: The patches promote command is back as a set-track shortcut
date: 2026-10-19
version: 1.6.130
area: CLI
type: Changed
docLink:
  label: Promote a patch
  href: /code-push/patch/#promote-a-patch
---

`shorebird patches promote` appears in help again and now runs
`shorebird patches set-track` with the track defaulting to `stable`.

- It takes the same options as `set-track`, including `--track` for a track
  other than `stable`, `--app-id`, and `--json`.
- A patch that's already on the track now succeeds instead of failing.
- If the app has no `stable` channel yet, it offers to create it, as `set-track`
  does.

```sh
shorebird patches promote --release-version 1.0.0+1 --patch-number 1
```
