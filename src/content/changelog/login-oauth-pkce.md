---
# cspell:ignore PKCE
title: More secure CLI sign-in
date: 2026-10-08
version: 1.6.125
area: CLI
type: Changed
docLink:
  label: Authentication commands
  href: /account/cli/#authentication-commands
---

`shorebird login` now uses standard OAuth with PKCE and `state`, and
`shorebird logout` now warns when the auth server can't confirm that your
session was revoked.

- Google and Microsoft sign-in, and tokens from `shorebird login:ci`, are no
  longer supported. The server stopped accepting them on October 1, 2026. Run
  `shorebird login` to sign in again, and use an API key in `SHOREBIRD_TOKEN`
  for CI.
- If your stored credentials have expired, `shorebird login` signs you in again
  instead of reporting that you're already logged in.
