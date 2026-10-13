---
title: Move an older patch to another track
date: 2026-09-23
area: Console
type: Fixed
docLink:
  label: Promote a patch in the Console
  href: /code-push/tracks/#via-the-shorebird-console
---

Change Track is now offered on a patch that a newer patch has superseded on its
track, so an older `staging` patch can still be promoted to `stable`.

- Previously the action was hidden on any patch with a newer patch on its track
  that wasn't rolled back.
- The dialog now explains what moving the patch will do.
