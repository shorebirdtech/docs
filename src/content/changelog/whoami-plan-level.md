---
title: See your plan from the CLI
date: 2026-09-14
version: 1.6.121
area: CLI
type: New
docLink:
  label: Current account
  href: /account/cli/#current-account
---

`shorebird account whoami` now shows your plan level and whether you have an
active subscription.

- The plan level is `free`, `pro`, `business`, or `enterprise`.
- With `--json`, the level is in a new `plan_level` field. The existing `plan`
  field still reads `paid` or `free`, so scripts that use it keep working.

```sh
shorebird account whoami
```
