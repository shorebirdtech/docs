---
title: Personal API keys expire within a year
date: 2026-10-20
area: API
type: Changed
docLink:
  label: API key expiration
  href: /account/api-keys/#expiration
---

A new personal API key now expires within a year. The Console no longer offers
No expiration for one, and a key created through the API with no expiration set
expires in 1 year.

- Keys you already have are unchanged. A key created without an expiration keeps
  working until you revoke it.
- For a key that never expires, or one that keeps working when you leave the
  organization, use a service account.
