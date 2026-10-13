---
title: Sessions are named after the app that holds them
date: 2026-10-12
area: Console
type: Changed
---

The Sessions list on your Account page now names each session after the app that
holds it, such as Shorebird Console, Shorebird CLI, or Claude Code, with the
browser it was approved in underneath.

- Previously, sessions were named after the browser, or after an internal ID
  like `shorebird-cli (api)`.
- Existing sessions get the new names too, except Console sign-ins from before
  October 5, 2026, and sessions from CLIs older than 1.6.125, which keep the
  name they had.
