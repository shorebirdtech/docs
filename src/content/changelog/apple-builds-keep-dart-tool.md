---
title: Apple builds keep your .dart_tool caches
date: 2026-10-16
version: 1.6.129
area: CLI
type: Fixed
---

iOS, iOS framework, and macOS builds no longer delete the project's whole
`.dart_tool` directory, so `build_runner` caches and native asset outputs
survive a Shorebird build.

- Only `.dart_tool/flutter_build` and `.dart_tool/version` are cleared.
