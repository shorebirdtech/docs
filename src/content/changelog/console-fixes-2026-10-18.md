---
title: Console fixes for yearly plans, account deletion, and app transfers
date: 2026-10-18
area: Console
type: Fixed
---

The Console fixes three issues.

- Yearly plans show their price per year, `/yr`, instead of `/mo`.
- Deleting an account that has many apps no longer times out. Through the API,
  `DELETE /api/v1/users/me` now answers 202 with `remaining_app_count` while
  apps are left to delete. Repeat the request until it answers 204.
- When you transfer an app, organizations where you aren't an Admin or Owner are
  listed but can't be chosen. Before, choosing one failed after you submitted.
