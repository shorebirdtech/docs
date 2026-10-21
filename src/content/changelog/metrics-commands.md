---
title: See app metrics from the CLI
date: 2026-10-16
version: 1.6.129
area: CLI
type: New
docLink:
  label: Metrics commands
  href: /account/cli/#metrics-commands
---

`shorebird metrics` shows the metrics the Console shows under Insights, such as
patch installs, downloads, adoption, and active devices.

- The subcommands are `active-hours`, `adoption`, `downloads`, `heatmap`,
  `installs`, `new-devices`, `users`, and `versions`.
- Pick the app with `--app-id` or `--flavor`, and narrow the results with
  `--start`, `--end`, `--granularity`, `--group-by`, and `--release-version`.
- With `--json`, `data` holds the API's response.
