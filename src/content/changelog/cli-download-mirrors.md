---
title: Download Flutter and engine tools from an internal mirror
date: 2026-10-19
version: 1.6.131
area: CLI
type: New
docLink:
  label: Using an internal mirror
  href: /system/firewalls-and-mirrors/#using-an-internal-mirror
---

Three new environment variables point the CLI at an internal mirror, such as
Artifactory, for everything it downloads outside Shorebird's API.

- `SHOREBIRD_DOWNLOAD_URL` replaces `https://download.shorebird.dev` for
  Flutter's artifacts, Shorebird's engine, and the tools used to build patches.
- `SHOREBIRD_FLUTTER_GIT_URL` replaces the GitHub URL of Shorebird's Flutter
  fork when the CLI clones it.
- `SHOREBIRD_BUNDLETOOL_URL` replaces the GitHub URL of the bundletool jar. The
  jar's checksum is still checked.
