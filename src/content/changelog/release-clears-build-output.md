---
title: Releases no longer upload files from an earlier build
date: 2026-10-11
version: 1.6.128
area: CLI
type: Fixed
---

`shorebird release` now clears `build/<platform>/shorebird/` before building on
every platform, so files left by an earlier build aren't uploaded with a new
release.

- Previously only iOS and iOS framework releases cleared it.
- Nothing else in `build/` is touched.
