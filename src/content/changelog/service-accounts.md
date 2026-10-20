---
title: Service accounts for CI and integrations
date: 2026-10-18
area: Console
type: New
docLink:
  label: Service accounts
  href: /account/service-accounts/
---

Organizations can now create service accounts: accounts that belong to the
organization instead of a person, with keys that keep working when the person
who set them up leaves or changes roles. Find them under Settings, Service
Accounts. They're available on every plan.

- Each service account holds one role, Viewer, Developer, App Manager, or
  Auditor, and its keys do what that role allows. A service account can't be an
  Admin or Owner.
- Keys expire after 1 year by default. Choose 30 days, 90 days, 1 year, or
  never, and issue a second key to rotate without downtime.
- The audit log shows a service account's actions as its name followed by
  `[bot]`, such as `GitHub Actions[bot]`, along with the key it used.
- The new Auditor role reads the audit log and nothing else, for exporting it to
  a SIEM without an Admin's key. The audit log needs the Enterprise plan.
- Use a key like any API key: set it as `SHOREBIRD_TOKEN` for the CLI, or send
  it as a bearer token to the API.
- Admins and Owners manage service accounts. They don't appear on the Members
  page.
