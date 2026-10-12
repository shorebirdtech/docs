---
title: JSON errors explain failed checks
date: 2026-10-11
version: 1.6.128
area: CLI
type: Changed
docLink:
  label: JSON errors
  href: /code-push/ci/scripting/#errors
---

With `--json`, every failing command now prints an error object on stdout, and a
failed check before the command runs reports `precondition_failed` with a
message and a hint.

- Checks that report `precondition_failed` include not being logged in and not
  being in a Shorebird project.
- Previously some of these failures left stdout empty, and the reason was only
  on stderr.
- `shorebird patches set-track` now reports `changed` and the patch, as
  `rollback` and `rollforward` already did, so a script can tell whether the run
  did anything.
