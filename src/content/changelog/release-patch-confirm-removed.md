---
title: The release and patch commands no longer take --confirm
date: 2026-10-17
version: 1.6.130
area: CLI
type: Changed
---

The hidden `--confirm` flag is gone from `shorebird release` and
`shorebird patch`. It made each command ask `Would you like to continue?` before
publishing, and that prompt is gone.

- Passing `--confirm` is a usage error, with exit status 64.
- `--no-confirm` is still accepted and does nothing, so existing scripts keep
  working.
