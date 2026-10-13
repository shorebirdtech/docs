---
title: Retrying a release records the new upload
date: 2026-10-11
area: Code Push
type: Fixed
---

Running `shorebird release` again after a release failed partway now records the
artifacts from the retry instead of keeping the first attempt's details.

- Previously, the hash, size, and location from the failed attempt stayed on the
  release, so the Console could show the wrong size and patches could be built
  against the wrong file.
- This works with every CLI version, since the fix is on the server.
- Releases retried before this fix keep the first attempt's details.
