---
title: A patch that fails to load is replaced on the same launch
date: 2026-09-16
version: 1.6.122
area: Code Push
type: Fixed
docLink:
  label: Patch integrity and automatic rollback
  href: /code-push/rollback/#patch-integrity-and-automatic-rollback
---

When a patch fails to load, the device now checks for a replacement patch right
away instead of waiting for the next launch.

- Previously, reporting the failure suppressed the update check, so the device
  ran the base release and stayed on the bad patch until it launched again.
- Patch checks now report the patch the device is actually running, so each
  device is attributed to the right patch.
- These fixes are in the updater built into your app, so they apply to releases
  built with Shorebird 1.6.122 or later.
