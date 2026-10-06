---
title: The API now reports rate limits
date: 2026-10-04
area: API
type: New
docLink:
  label: Shorebird API
  href: /account/api/
---

Every API response now carries `RateLimit` and `RateLimit-Policy` headers, so
scripts can see their limit and how much of it is left.

- Going over the limit returns 429 with a `Retry-After` header and the code
  `rate_limited`.
- Limits are counted per caller: per API key or token, or per IP address for
  unauthenticated requests.
