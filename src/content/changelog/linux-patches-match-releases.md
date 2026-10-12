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
- Before building, it now checks that you're logged in, that the project is
  initialized, and that the host is Linux, as `shorebird release linux` does.
