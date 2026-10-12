---
title: Patch checks report the patch the device is running
date: 2026-09-16
version: 1.6.122
area: Code Push
type: Fixed
docLink:
  label: Patch integrity and automatic rollback
  href: /code-push/rollback/#patch-integrity-and-automatic-rollback
---

The automatic patch check now starts after the patch the device boots has
loaded, instead of before, so it reports the patch the device is actually
running. With `auto_update: false`, your app's own updater call decides when to
check.

- Each device is now attributed to the patch it is running. Update delivery is
  unchanged.
- Installing a new patch can no longer retire a patch that is still booting for
  the first time.
- When a patch fails to load, the device still checks for a replacement patch on
  that same launch.
- These fixes are in the updater built into Shorebird's Flutter engine, so they
  apply to releases built with Shorebird's Flutter 3.47.4 or later, the default
  in CLI 1.6.122.
