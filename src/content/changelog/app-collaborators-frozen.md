---
title: New per-app collaborators can no longer be added
date: 2026-10-17
area: Console
type: Deprecated
docLink:
  label: Per-app collaborators
  href: /account/orgs/#per-app-collaborators
---

To give someone access to an app, invite them to the organization that owns it.
The app's "Collaborators" tab no longer has an invite button, and the API's
endpoints for adding a collaborator or sending an app invitation now return
`410 Gone`.

- Existing collaborators keep their access. You can still change their role or
  remove them.
- Invitations to an app that were already sent can still be accepted, and you
  can still revoke them.
