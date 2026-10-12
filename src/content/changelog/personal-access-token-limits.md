---
title: API keys hold exactly their permission level
date: 2026-10-10
area: API
type: Changed
docLink:
  label: API key permissions
  href: /account/api-keys/#permissions
---

API keys now hold exactly what their permission level grants. A full access key
can do everything your role allows, except delete your account, change your
billing limits, or manage your sessions and API keys. Sign in to the Console to
do these.

- Deleting the account or changing billing limits with a key returns 403 with
  the code `personal_access_token_forbidden`. Keys were already refused both,
  with other error codes.
- Full access keys gained what their old fixed permission list left out, such as
  reading audit logs and managing invitations.
- Release and patch only keys can no longer update your account details, create
  organizations, or accept or decline invitations.
