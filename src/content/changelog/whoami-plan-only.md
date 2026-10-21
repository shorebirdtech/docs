---
title: The whoami command no longer prints a subscription line
date: 2026-10-16
version: 1.6.129
area: CLI
type: Changed
docLink:
  label: Current account
  href: /account/cli/#current-account
---

`shorebird account whoami` no longer prints a `Subscription:` line. `Plan:`
shows your plan level.

- In `--json` output, `plan` is `free` on the free level, `paid` on any other
  level, and `null` when the server doesn't report a level.
