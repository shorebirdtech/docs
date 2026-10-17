---
title: See which credential the CLI is using
date: 2026-10-19
version: 1.6.130
area: CLI
type: New
docLink:
  label: Check which credential is active
  href: /account/cli/#check-which-credential-is-active
---

`shorebird auth status` shows which credential the CLI signed in with and who it
acts as, and `shorebird auth token` prints the access token it sends.

- The credential is an API key from `SHOREBIRD_TOKEN`, GitHub Actions OIDC, or
  your `shorebird login`, tried in that order.
- `shorebird account whoami` adds a `Credential` line, and `credential` in
  `--json`.
- Bare `shorebird account` now runs `shorebird account whoami`.
- Treat the output of `shorebird auth token` as a secret. It's left out of the
  run's log file.

```sh
shorebird auth status
shorebird account
```
