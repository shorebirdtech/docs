---
title: Linux patches build like Linux releases
date: 2026-10-10
version: 1.6.127
area: CLI
type: Fixed
---

`shorebird patch linux` now builds with `--target` and the arguments passed
after `--`, so the patch matches the release it targets.

- Previously a patch built from the default entrypoint, without your
  `--dart-define` values, and could differ from its release.
- It also runs the same checks as other platforms before building: logged in,
  project initialized, `shorebird doctor`, and a Linux host.
