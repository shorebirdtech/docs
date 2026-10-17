---
title: shorebird api takes the method first and reads every page
date: 2026-10-16
version: 1.6.130
area: CLI
type: New
docLink:
  label: Calling the API from the command line
  href: /account/api/#calling-the-api-from-the-command-line
---

`shorebird api` accepts the HTTP method before the endpoint, and `--paginate`
reads a whole paged list in one call.

- The method can be GET, POST, PUT, PATCH, DELETE, or HEAD, in any case. Passing
  a different method in `-X` is a usage error.
- `--paginate` follows `next_cursor` and prints the pages as one JSON object,
  with list fields joined. `--jq` runs on the joined result.
- `--paginate` works only with GET. A failed page stops the command with exit
  status 1 instead of printing part of the list.

```sh
shorebird api GET /apps
shorebird api /apps -f per_page=100 --paginate --jq '.apps[].app_id'
```
