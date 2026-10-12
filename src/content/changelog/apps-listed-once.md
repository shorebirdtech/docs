---
title: Apps are listed once
date: 2026-10-09
area: API
type: Fixed
docLink:
  label: List apps
  href: /account/cli/#list-apps
---

The app list no longer shows an app twice when you have both a role in its
organization and a role granted on the app itself.

- This affected `GET /api/v1/apps`, `shorebird account apps`,
  `shorebird apps list`, and the app picker in `shorebird preview`.
- The Console's app list wasn't affected.
