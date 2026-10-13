---
title: Invitations match emails in any letter case
date: 2026-10-12
area: Console
type: Fixed
docLink:
  label: Add a member
  href: /account/orgs/#add-a-member
---

Inviting a member or collaborator now finds their account no matter how the
email address is capitalized.

- Previously, an invitation could go to someone who was already a member or
  collaborator, and adding a collaborator through the API as `Abby@example.com`
  when the account was `abby@example.com` failed with
  `User with email ... not found`.
- If the address matches more than one account, the request is refused with a
  message asking you to contact support to merge them. The API returns 409 with
  a code ending in `ambiguous_email`.
