---
title: Call the Shorebird API from the CLI
date: 2026-10-16
version: 1.6.129
area: CLI
type: New
docLink:
  label: Calling the API from the command line
  href: /account/api/#calling-the-api-from-the-command-line
---

`shorebird api` sends an authenticated request to the Shorebird API and prints
the response. `--jq` filters a successful response before it's printed.

- Endpoints are relative to `https://api.shorebird.dev/api/v1`, and `{appId}` is
  filled in from `shorebird.yaml`.
- `-X` or `--method` sets the method. It defaults to GET, or POST when you pass
  fields with `-f` or `-F`, or a body with `--input`.
- A response outside the 2xx range still prints its body. The error goes to
  stderr and the command exits with status 1.
- Requests that change data are never retried.

```sh
shorebird api /apps --jq '.apps[].app_id'
```
