---
sidebar_position: 5
title: 👷 Status
description: Status of the Shorebird project.
---

## Stable

Shorebird is currently available to the general public and many customers are using it in
production.

We're working closely with our customers to ensure we're building things
they want. We _want_ your feedback. We _want_ you to tell us what you want to see next.

Filing [issues](https://github.com/shorebirdtech/shorebird/issues) is a good way
to provide feedback. Feedback via Discord is also welcome.

Our guiding principle for these early days is "first, do no harm". It should be
the case that using Shorebird is never worse than not using Shorebird. It is
still possible using early versions of Shorebird could break your app in the
wild. If you believe that's the case, please reach out, we're here to help.

## iOS Alpha

Shorebird is currently in alpha on iOS.

You can see a [demo of Shorebird](https://www.youtube.com/watch?v=7KDgFvdogsE)
working on iOS, or try it yourself with
`shorebird release ios-alpha`, `shorebird preview` and
`shorebird patch ios-alpha`.

Using Shorebird code push on iOS, it is possible to deploy fixes to any Dart
code in your app, instantly to your users.

Performance and patch sizes from the iOS alpha do not reflect the final
product. We expect to reach parity with Shorebird on Android around September
2023.

It is safe to ship with Shorebird iOS, just note the performance
and size differences of the alpha product.

Known issues:

- iOS apps built with `shorebird release ios-alpha` run Dart code up to 10x
  slower than `flutter build ipa --release` builds.
  issues [1](https://github.com/shorebirdtech/shorebird/issues/673) [2]https://github.com/shorebirdtech/shorebird/issues/674]
- iOS patches are proportional to the size of the app, rather than the size of
  the change, and thus larger than patches on Android.
  [issue](https://github.com/shorebirdtech/shorebird/issues/675)
- `shorebird patch ios-alpha` does not warn for non-Dart changes
  [issue](https://github.com/shorebirdtech/shorebird/issues/679)

## What works today

All users will update to the new version on next launch in the background.
Your app can check for updates and download them using the
[shorebird_code_push](https://pub.dev/packages/shorebird_code_push) package.

We also have an extensive command line interface for managing your Shorebird
account and apps and CI/CD integration via GitHub Actions.

We also have a [console](https://console.shorebird.dev) through which you can
sign up, login, and view your apps. The console will expose more functionality
and information in the near future.

## What doesn't work yet?

No support for:

- Asset changes (images, icons, etc.) [issue](https://github.com/shorebirdtech/shorebird/issues/318)
- Older Flutter versions or `beta` and `master` channels (only latest `stable` is supported): [issue](https://github.com/shorebirdtech/shorebird/issues/472)
- Rollbacks ([issue](https://github.com/shorebirdtech/shorebird/issues/126))
- Staged rollout of patches (channels or percentage based) [issue](https://github.com/shorebirdtech/shorebird/issues/110)
- Patch signing [issue](https://github.com/shorebirdtech/shorebird/issues/112)
- Analytics [issue](https://github.com/shorebirdtech/shorebird/issues/197)
- "Native code" changes (java, kotlin, etc.) -- not planned.
- Fastlane integration [issue](https://github.com/shorebirdtech/shorebird/issues/257)
- Self-hosting or on-premises deployments [issue](https://github.com/shorebirdtech/shorebird/issues/485)

If these, or anything else is blocking your use of Shorebird, please let us know!
https://github.com/shorebirdtech/shorebird/issues
