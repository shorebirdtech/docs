---
title: Sign-in no longer creates duplicate accounts
date: 2026-10-12
area: Console
type: Changed
---

Signing in with an email that differs from your account's only in letter case,
such as through a different provider, now reaches your existing account instead
of creating a second one.

- Creating an account, or linking a sign-in to an existing account by email, now
  needs an email your provider has verified. Otherwise sign-in shows "Email not
  verified".
- If an email already matches more than one account, sign-in is refused and asks
  you to contact support.
- Signing in with the same provider account as before is unchanged.
