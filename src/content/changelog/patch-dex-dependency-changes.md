---
# cspell:ignore havent swiftobjective ckotlinjava
title: Android patches name the dependency changes behind DEX diffs
date: 2026-10-02
version: 1.6.124
area: CLI
type: New
docLink:
  label: Native changes warning
  href: /code-push/troubleshooting/#your-app-contains-native-changes-warning-when-creating-a-patch-even-though-you-havent-changed-swiftobjective-ckotlinjava-code
---

When `shorebird patch android` finds DEX changes, it now lists the Android
libraries whose versions differ from the release, which usually explains a
native change you didn't make.

- Each changed library is shown with its release and patch versions, like
  `io.branch.sdk.android:library 5.21.2 -> 5.21.3`, along with added and removed
  libraries.
- The list comes from dependency metadata in both app bundles. If either bundle
  was built without it, nothing is listed.
- Pin dependency versions, or use Gradle dependency locking, so patch builds
  resolve the same versions as the release. If the listed changes explain every
  difference and your Dart code doesn't rely on them, `--allow-native-diffs` is
  safe for that patch.
- In CI and other non-interactive runs, the `--allow-native-diffs` and
  `--allow-asset-diffs` hints are now printed before the command fails.
