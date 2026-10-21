---
title: More CLI fixes in 1.6.130
date: 2026-10-17
version: 1.6.130
area: CLI
type: Fixed
---

CLI 1.6.130 also fixes these issues.

- Prompts no longer crash with `No terminal attached to stdout` when stdout
  can't show a prompt, such as when it's redirected to `/dev/null`. The command
  runs as non-interactive and, when it needs a confirmation, asks for `--yes` or
  `--confirm-name`.
- Declining a prompt no longer prints the generic advice to re-run with
  `--verbose`.
- `shorebird doctor` and `shorebird upgrade` on a Shorebird checkout at a
  commit, a tag, or a branch with no upstream explain how to get back to
  `stable`.
- Every request the CLI makes identifies it with a
  `User-Agent: shorebird-cli/<version> (<os>; dart <version>)` header, which
  audit log entries record.
