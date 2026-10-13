---
title: Size analysis says when a release can't be analyzed
date: 2026-10-09
area: Console
type: Fixed
---

The Size tab for a release with no Android or iOS build now says that size
analysis supports Android and iOS only, instead of saying to check back in a few
minutes.

- This affects releases built only for macOS, Windows, or Linux, which are never
  analyzed.
- Releases with an Android or iOS build are unchanged.
