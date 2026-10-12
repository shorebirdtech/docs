---
title: API keys can't delete accounts or change billing limits
date: 2026-10-10
area: API
type: Changed
docLink:
  label: API key permissions
  href: /account/api-keys/#permissions
---

An API key can no longer delete your account or change your billing limits, even
with full access. Sign in to the Console to do these.

- Deleting the account or changing billing limits with a key returns 403 with
  the code `personal_access_token_forbidden`.
- Release and patch only keys can no longer update your account details, create
  organizations, or accept or decline invitations.
- Everything else a full access key could do is unchanged.
