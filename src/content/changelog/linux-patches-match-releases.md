---
title: Linux patches build like Linux releases
date: 2026-10-10
version: 1.6.127
area: CLI
type: Fixed
---

`shorebird patch linux` now builds with `--target` and the arguments passed
after `--`, so the patch matches the release it targets.

- Previously the patch was built from the default entrypoint and without the
  arguments after `--`, such as `--dart-define` values, so it could differ from
  its release.
- It also runs the same checks as other platforms before building: logged in,
  project initialized, `shorebird doctor`, and a Linux host.
