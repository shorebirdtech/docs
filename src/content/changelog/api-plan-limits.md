---
title: The API enforces the Console's plan limits
date: 2026-10-15
area: API
type: Changed
docLink:
  label: Member roles
  href: /account/orgs/#member-roles
---

Requests the Console refuses because of your plan are now refused by the API
too.

- Setting a spending limit other than 0 on the Hobby plan returns 403 with the
  code `shorebird_plan_insufficient_tier`.
- Inviting someone with, or changing a member to, a role your plan doesn't offer
  returns the same error. Developer is always allowed.
- Renaming an organization to a blank name returns 400 with the code
  `organization_name_blank`.
