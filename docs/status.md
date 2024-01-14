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

We expect to reach parity with Shorebird on Android around Feb 2024. This has
taken longer that we'd hoped, but you can follow our progress on any of the open
issues for iOS [on
GitHub](https://github.com/shorebirdtech/shorebird/issues?q=is%3Aopen+is%3Aissue+label%3Aios),
notably on [iOS speed](https://github.com/shorebirdtech/shorebird/issues/674).

### Why is iOS Alpha?

iOS is alpha for two reasons:

- Our iOS alpha product is slower than our Android product. In testing, many
  apps do not notice notice a difference, some feel a bit slower. Our internal
  benchmarks suggest we can make the Dart code execute up to 100x faster than it
  currently does in ios-alpha and we've built an new Dart runtime to solve this
  speed issue, but it's not ready yet. We update our progress on
  https://github.com/shorebirdtech/shorebird/issues/674 every week and on
  Discord https://discord.gg/shorebird every day.
- We've seen a few few crashes reported from early users when testing this new
  runtime. We're working with our early customers to resolve these issues. The
  plan is to mark iOS "beta" as soon as we're comfortable with the speed, and
  1.0 once we've seen enough deployments to know it's not crashing for anyone.

## Commonly requested features on iOS and Android:

- Self-hosting or on-premises deployments [issue](https://github.com/shorebirdtech/shorebird/issues/485)
- Asset changes (images, icons, etc.) [issue](https://github.com/shorebirdtech/shorebird/issues/318)
  [issue](https://github.com/shorebirdtech/shorebird/issues/1100)
- Manual rollbacks (automatic single-device rollbacks on errors already work) ([issue](https://github.com/shorebirdtech/shorebird/issues/126))
- Staged rollout of patches (channels or percentage based) [issue](https://github.com/shorebirdtech/shorebird/issues/110)
- Patch signing (hashes are checked for download integrity) [issue](https://github.com/shorebirdtech/shorebird/issues/112)
- "Native code" changes (java, kotlin, etc.) -- not planned.

If these, or anything else is blocking your use of Shorebird, please let us know!
https://github.com/shorebirdtech/shorebird/issues
