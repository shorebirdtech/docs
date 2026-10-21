---
title: Export the audit log to a SIEM
date: 2026-10-15
area: API
type: New
docLink:
  label: Export the audit log to a SIEM
  href: /enterprise/audit-logs/#export-the-audit-log-to-a-siem
---

Enterprise organizations can read the audit log through the API oldest first and
forward each event to a SIEM, using a service account with the Auditor role.

- Events are OCSF 1.9.0 API Activity events. Filter by event name with
  `operation`, such as `patch.rollback`.
- `order=asc` returns the oldest events first. Pages use `per_page` (30 by
  default, at most 100), `cursor`, and `next_cursor`.
- The endpoint's earlier, undocumented `limit`, `resourceType`, and `action`
  parameters and its `nextCursor` field were replaced.
- The Console's audit log shows and filters by event name.
