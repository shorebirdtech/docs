---
title: The API now reports rate limits
date: 2026-10-04
area: API
type: New
docLink:
  label: Shorebird API
  href: /account/api/
---

API responses now carry `RateLimit` and `RateLimit-Policy` headers, so scripts
can see their limit and how close they are to it.

- Going over the limit returns 429 with a `Retry-After` header and the code
  `rate_limited`.
- Limits are counted per caller: per API key or token, or per IP address for
  unauthenticated requests.
- Patch checks from your app aren't rate limited.
