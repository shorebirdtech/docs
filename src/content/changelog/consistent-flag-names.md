---
title: Consistent flag names for set-track and init
date: 2026-10-11
version: 1.6.128
area: CLI
type: Changed
---

`shorebird patches set-track` and `shorebird init` now use the same flag names
as the commands next to them. The old names still work, but no longer appear in
`--help`.

- `shorebird patches set-track` takes `--release-version` and `--patch-number`,
  like the other `patches` commands, in place of `--release` and `--patch`.
- `shorebird init` takes `--org-id`, like `shorebird apps transfer`, in place of
  `--organization-id`.
- Channel, track, and app names that are blank or only whitespace are now
  rejected by every command that takes one.

```sh
shorebird init --org-id 42
```
