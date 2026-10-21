---
title: Confirm deletes with --yes
date: 2026-10-16
version: 1.6.129
area: CLI
type: Changed
docLink:
  label: Destructive commands
  href: /code-push/ci/scripting/#destructive-commands
---

`shorebird channels delete` and `shorebird releases delete` ask you to confirm
in a terminal, and `--yes` skips the question. Without a terminal, in CI, or
with `--json`, `--yes` is required.

- `--confirm-name` is deprecated for these two commands and prints a warning.
- Before deleting, each command says what the delete removes, such as a
  release's patches.
- `shorebird apps delete` now asks you to type the app's display name in a
  terminal. Scripts still pass it with `--confirm-name`, and there's no `--yes`.
- Declining a prompt now exits with status 1 instead of 0. This covers
  `shorebird patches set-track`, the native and asset change prompts of
  `shorebird patch`, and the new delete prompts.
