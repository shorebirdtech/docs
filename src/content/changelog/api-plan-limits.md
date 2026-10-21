---
title: The API enforces the Console's plan limits
date: 2026-10-15
area: API
type: Changed
docLink:
  label: Member roles
  href: /account/orgs/#member-roles
---

Some requests the Console refuses are now refused by the API too, so scripts and
the CLI meet the same plan limits.

- Setting a spending limit other than 0 on the Free plan returns 403 with the
  code `shorebird_plan_insufficient_tier`.
- Inviting someone with, or changing a member to, a role the organization's plan
  doesn't offer returns the same error. Developer is always allowed.
- Creating or renaming an organization with a blank name returns 400 with the
  code `organization_name_blank`.
