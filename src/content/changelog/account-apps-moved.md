---
title: Apps are listed with apps list, not account apps
date: 2026-10-17
version: 1.6.130
area: CLI
type: Changed
docLink:
  label: List apps
  href: /account/cli/#list-apps
---

`shorebird account apps` no longer lists apps. It prints `shorebird apps list`,
which shows the same list, and exits with a usage error.

- Scripts that call `shorebird account apps` need to switch to
  `shorebird apps list`. Its output, including `--json`, is the same.

```sh
shorebird apps list
```
