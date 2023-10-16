---
sidebar_position: 8
title: 👷 Status
description: Status of the Shorebird project.
---

## Stable

Shorebird is available on Android and iOS (alpha), with many apps shipping
to the Play Store and App Store.

Our guiding principle has been "first, do no harm". It should be
the case that using Shorebird is never worse than not using Shorebird.

We're working closely with our early customers and we would love to hear from
you. Shorebird operates publicly on [Discord](https://discord.gg/shorebird)
every day and we welcome your feedback. Filing
[issues](https://github.com/shorebirdtech/shorebird/issues) works well too.

## iOS Alpha

Shorebird is currently in alpha on iOS. Instructions for using Shorebird on
iOS are available in the [Getting Started](/) guide.

It is safe to ship with Shorebird on iOS. Please note there may be performance
(currently slower than Android) and patch size (larger than Android) differences
in the alpha product.

We expect to reach parity with Shorebird on Android around October 2023.

You can see all open issues for iOS [on
GitHub](https://github.com/shorebirdtech/shorebird/issues?q=is%3Aopen+is%3Aissue+label%3Aios)

## Known issues

Commonly requested features on iOS and Android:

- Self-hosting or on-premises deployments [issue](https://github.com/shorebirdtech/shorebird/issues/485)
- Asset changes (images, icons, etc.) [issue](https://github.com/shorebirdtech/shorebird/issues/318)
- Older Flutter versions (only
  [recent stable versions](https://docs.shorebird.dev/flutter-version) are
  currently supported)
  [issue](https://github.com/shorebirdtech/shorebird/issues/1100)
- Analytics [issue](https://github.com/shorebirdtech/shorebird/issues/197)
- Manual rollbacks (automatic single-device rollbacks on errors already work) ([issue](https://github.com/shorebirdtech/shorebird/issues/126))
- Staged rollout of patches (channels or percentage based) [issue](https://github.com/shorebirdtech/shorebird/issues/110)
- Patch signing (patch hashes are already checked) [issue](https://github.com/shorebirdtech/shorebird/issues/112)
- Fastlane integration [issue](https://github.com/shorebirdtech/shorebird/issues/257)
- "Native code" changes (java, kotlin, etc.) -- not planned.

iOS "alpha" specific issues (which will be resolved before production):

- iOS apps built with `shorebird release ios-alpha` run Dart code [slower than
  normal release builds](https://github.com/shorebirdtech/shorebird/issues/674).
- iOS patches are proportional to the size of the app, rather than the size of
  the change, and thus larger than patches on Android.
  [issue](https://github.com/shorebirdtech/shorebird/issues/675)

If these, or anything else is blocking your use of Shorebird, please let us know!
https://github.com/shorebirdtech/shorebird/issues
