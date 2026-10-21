---
# cspell:ignore havent swiftobjective ckotlinjava
title: Android patch warnings show what changed code references
date: 2026-10-17
version: 1.6.130
area: CLI
type: New
docLink:
  label: Native changes warning
  href: /code-push/troubleshooting/#your-app-contains-native-changes-warning-when-creating-a-patch-even-though-you-havent-changed-swiftobjective-ckotlinjava-code
---

When Java or Kotlin changes trigger the native changes warning on an Android
patch, the output names the classes, methods, and fields that each changed
method's differing instructions reference, so you can tell which dependency
changed.

- By default it details up to 10 methods per DEX file and 4 instructions on each
  side, with string literals replaced by their length.
- `shorebird patch --show-dex-diff` prints every changed method and instruction
  in full, including string constants.
- What the check accepts hasn't changed.
