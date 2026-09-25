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

When a patch fails to load, the device now checks for a replacement patch on
that same launch, instead of waiting for the next one. This applies when
automatic updates are on; with `auto_update: false`, your app's own updater call
decides when to check.

- Previously, reporting the failure suppressed the update check, so a device
  couldn't pick up a fixed patch until it launched again.
- Patch checks now report the patch the device is actually running, so each
  device is attributed to the right patch.
- These fixes are in the updater built into Shorebird's Flutter engine, so they
  apply to releases built with Shorebird's Flutter 3.47.4 or later, the default
  in CLI 1.6.122.
