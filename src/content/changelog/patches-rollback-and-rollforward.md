---
title: Roll patches back and forward from the CLI
date: 2026-08-28
version: 1.6.120
area: CLI
type: New
docLink:
  label: Roll back a patch
  href: /code-push/rollback/
---

`shorebird patches rollback` and `shorebird patches rollforward` do the same as
the Rollback and Roll Forward actions in the Console.

- Both take `--release-version` and `--patch-number`.
- By default, a patch that is already in the requested state is reported and the
  command succeeds. Add `--require-change` to exit with an error instead.

```sh
shorebird patches rollback --release-version 1.0.0+1 --patch-number 1
```
