---
title: Sign-in no longer creates a second account for a differently cased email
date: 2026-10-12
area: Console
type: Changed
---

Signing in with an email that matches an existing account's except for letter
case no longer creates a second account. It follows the same rules as an exact
match.

- If that account uses a different sign-in provider, sign-in asks you to use the
  one you originally used.
- Creating an account, or linking a sign-in to an existing account by email, now
  needs an email your provider has verified. Otherwise sign-in shows
  `Email not verified`.
- If the email differs only in letter case from more than one existing account,
  sign-in is refused and asks you to contact support.
- Signing in with the same provider account as before is unchanged.
