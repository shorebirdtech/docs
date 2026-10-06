---
# cspell:ignore loginci
title: Legacy login tokens no longer work
date: 2026-10-01
area: API
type: Changed
docLink:
  label: Migrate from shorebird login:ci
  href: /account/api-keys/#migrating-from-shorebird-loginci
---

Since October 1, 2026, tokens from `shorebird login:ci` and logins from CLI
versions older than 1.6.87 are rejected.

- Requests with a legacy token get a 401 with the code `legacy_auth_retired`.
- In CI, create an API key in the Console and set it as `SHOREBIRD_TOKEN`.
- On your own machine, run `shorebird upgrade`, then `shorebird logout` and
  `shorebird login`.
