---
title: Invitations match emails in any letter case
date: 2026-10-12
area: Console
type: Fixed
docLink:
  label: Add a member
  href: /account/orgs/#add-a-member
---

Inviting a member or adding an app collaborator now finds their account no
matter how the email address is capitalized.

- Previously, adding a collaborator as `Abby@example.com` when the account was
  `abby@example.com` failed with `User with email ... not found`, and an
  invitation could go to someone who was already a member.
- If an address matches more than one account, the request is refused with 409
  and a code ending in `ambiguous_email`.
