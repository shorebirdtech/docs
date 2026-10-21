---
title: Audit log entries say which key or session acted
date: 2026-10-16
area: Console
type: New
docLink:
  label: Event format
  href: /enterprise/audit-logs/#event-format
---

Audit log entries now name the API key or sign-in session behind each action,
and say whether the sign-in used multi-factor authentication when the sign-in
provider reports it.

- Creating an app and editing a patch's notes are now recorded.
- Changes Shorebird staff make to your organization appear in its audit log as
  `Shorebird staff`.
- Reading the log oldest first leaves out the most recent minute, so a later
  read doesn't skip an event that was still being written.
