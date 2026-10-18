---
title: See and answer invitations from the CLI
date: 2026-10-17
version: 1.6.130
area: CLI
type: New
docLink:
  label: Accept an invitation
  href: /account/orgs/#accept-an-invitation
---

`shorebird invitations list` shows the organization and app invitations sent to
you, and `shorebird invitations accept` and `decline` answer one by its id.

- Before this, an invitation could only be answered from the link in its email.
- With `--json`, `list` returns each invitation's `id`, `kind` (`organization`
  or `app`), `name`, `role`, `inviter_email`, `created_at` and `expires_at`.
- Sign in as the invited email address. Service account keys can't answer
  invitations.

```sh
shorebird invitations list
shorebird invitations accept <id>
```
