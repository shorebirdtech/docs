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
in a terminal, and `--yes` skips the question. Without a terminal, `--yes` is
required.

- `--confirm-name` is deprecated for these two commands and prints a warning.
- `shorebird apps delete` still needs the app's display name, typed at the
  prompt or passed with `--confirm-name`. It has no `--yes`.
- Declining a confirmation now exits with status 1 instead of 0. This covers the
  delete commands and `shorebird patches set-track`.
