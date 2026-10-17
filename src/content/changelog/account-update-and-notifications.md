---
title: Change your display name and email settings from the CLI
date: 2026-10-19
version: 1.6.130
area: CLI
type: New
docLink:
  label: Change your display name
  href: /account/cli/#change-your-display-name
---

`shorebird account update --name` changes your display name, and
`shorebird account notifications` shows or changes whether Shorebird emails you.

- The emails Shorebird sends today warn that an app is near or over its plan's
  patch install limit.
- `--email on` and `--email off` change the setting. With `--json`, the output
  includes `email` set to `true` or `false`.

```sh
shorebird account update --name "Jane Doe"
shorebird account notifications --email off
```
