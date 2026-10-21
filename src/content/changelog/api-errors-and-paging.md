---
title: API errors link to the docs, and lists can be paged
date: 2026-10-15
area: API
type: New
docLink:
  label: Common patterns
  href: /account/api/#common-patterns
---

Every JSON error from the API now carries a `documentation_url`, and the lists
of apps, releases, and patches can be read a page at a time.

- Those lists accept `per_page` and `cursor` and return `next_cursor`. Without
  them, they still return everything.
- Lists of invitations and audit log events are always paged. An invalid
  `cursor` returns 400 with the code `invalid_cursor`.
- A 401 response to a bearer token, or a 403 because the token's scope doesn't
  allow the request, includes a `WWW-Authenticate` header that says why.
