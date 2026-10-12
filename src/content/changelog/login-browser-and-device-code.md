---
title: Sign in from any machine
date: 2026-10-09
version: 1.6.126
area: CLI
type: New
docLink:
  label: Login
  href: /account/cli/#login
---

`shorebird login` now opens your browser, and when no browser can open, such as
over SSH, in CI, or on Linux without a display, it shows a code to enter in a
browser on any device.

- The login URL is still printed, in case the browser doesn't open.
- Pass `--device` to use a code even when a browser is available.
- On 1.6.126, `shorebird login` without `--device` crashes with
  `Bad state: read(ScopedRef<Browser>)`. Upgrade to 1.6.127 or later.

```sh
shorebird login --device
```
