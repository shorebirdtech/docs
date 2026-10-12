---
title: The Shorebird cache cleans up after itself
date: 2026-10-09
version: 1.6.126
area: CLI
type: New
---

Flutter installs, engine artifacts, and downloaded previews that you no longer
use are now removed automatically, so they stop piling up across upgrades and
`--flutter-version` builds.

- Flutter installs and engine artifacts are removed after 30 days without use.
- Only the 10 most recently used previews are kept, and each is removed after 30
  days without use.
- The Flutter version your CLI is pinned to is never removed.
- `shorebird cache clean --unused` removes unused items now, without clearing
  the rest of the cache.

```sh
shorebird cache clean --unused
```
