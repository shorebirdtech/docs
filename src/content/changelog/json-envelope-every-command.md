---
title: Every --json command prints one JSON object
date: 2026-10-16
version: 1.6.129
area: CLI
type: Changed
docLink:
  label: Errors
  href: /code-push/ci/scripting/#errors
---

With `--json`, every command writes exactly one JSON object to stdout, including
`--help` and commands that have no data to return.

- A command with no data prints `"data": {}` in its success object.
- When an API call fails, the error includes the server's `api_code` and
  `details`. Without `--json`, the CLI prints the code as `Error code: <code>`.
