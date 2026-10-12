---
title: Preview a flavor without a prompt
date: 2026-10-11
version: 1.6.128
area: CLI
type: New
docLink:
  label: Preview options
  href: /code-push/preview/#options
---

`shorebird preview` now takes `--flavor`, like other commands that act on an
app, so it can pick the flavor's app without asking.

- An unknown flavor fails with the same error as other commands.
- `shorebird releases get-apks` now takes `--app-id`, and with it no longer
  needs to run in a Shorebird project. Pass `--out` in that case.

```sh
shorebird preview --flavor internal --release-version 1.0.0+1
```
