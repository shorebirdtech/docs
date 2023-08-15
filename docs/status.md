---
sidebar_position: 7
title: 👷 Status
description: Status of the Shorebird project.
---

## Stable

Shorebird is available on Android and iOS (alpha), with many apps shipping
to the Play Store and App Store.

We're working closely with our customers to ensure we're building things they
want. We _want_ your feedback. We _want_ you to tell us what you want to see
next.

Filing [issues](https://github.com/shorebirdtech/shorebird/issues) is a good way
to provide feedback. Feedback via [Discord](https://discord.gg/shorebird) is
also welcome.

Our guiding principle has been "first, do no harm". It should be
the case that using Shorebird is never worse than not using Shorebird. Of the
thousands of apps have already tried Shorebird this year we're only aware
of two having seen issues with Shorebird in the wild (one with a bad interaction
with a third party library and another with crasher in iOS alpha).

## iOS Alpha

Shorebird is currently in alpha on iOS. Instructions for using Shorebird on
iOS are available in the [Getting Started](/) guide.

It is safe to ship with Shorebird on iOS. Please note there may be performance
(currently slower than Android) and patch size (larger than Android) differences
in the alpha product.

We expect to reach parity with Shorebird on Android around September 2023.

You can see all open issues for iOS [on
GitHub](https://github.com/shorebirdtech/shorebird/issues?q=is%3Aopen+is%3Aissue+label%3Aios)

## Known issues

Commonly requested features on iOS and Android:

- Self-hosting or on-premises deployments [issue](https://github.com/shorebirdtech/shorebird/issues/485)
- Asset changes (images, icons, etc.) [issue](https://github.com/shorebirdtech/shorebird/issues/318)
- Older Flutter versions (only recent stable versions are currently supported) [issue](https://github.com/shorebirdtech/shorebird/issues/1100)
- Analytics [issue](https://github.com/shorebirdtech/shorebird/issues/197)
- Manual rollbacks (automatic single-device rollbacks on errors already work) ([issue](https://github.com/shorebirdtech/shorebird/issues/126))
- Staged rollout of patches (channels or percentage based) [issue](https://github.com/shorebirdtech/shorebird/issues/110)
- Patch signing (patch hashes are already checked) [issue](https://github.com/shorebirdtech/shorebird/issues/112)
- Fastlane integration [issue](https://github.com/shorebirdtech/shorebird/issues/257)
- "Native code" changes (java, kotlin, etc.) -- not planned.

iOS "alpha" specific issues (which will be resolved before production):

- iOS apps built with `shorebird release ios-alpha` may run Dart code slower
  than regular Flutter release builds.
  issues [1](https://github.com/shorebirdtech/shorebird/issues/673)
  [2]https://github.com/shorebirdtech/shorebird/issues/674]
- iOS patches are proportional to the size of the app, rather than the size of
  the change, and thus larger than patches on Android.
  [issue](https://github.com/shorebirdtech/shorebird/issues/675)
- `shorebird patch ios-alpha` does not warn for non-Dart changes
  [issue](https://github.com/shorebirdtech/shorebird/issues/679)

If these, or anything else is blocking your use of Shorebird, please let us know!
https://github.com/shorebirdtech/shorebird/issues
