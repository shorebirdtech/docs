---
sidebar_position: 5
title: 👷 Status
description: Status of the Shorebird project.
---

## Stable

Shorebird is currently available to the general public and many customers are using it in
production.

We're working closely with our customers to ensure we're building things
they want. We _want_ your feedback. We _want_ you to
break things. We _want_ you to tell us what you want to see next.

Filing [issues](https://github.com/shorebirdtech/shorebird/issues) is a good way
to provide feedback. Feedback via Discord is also welcome.

Our guiding principle for these early days is "first, do no harm". It should be
the case that using Shorebird is never worse than not using Shorebird. It is
still possible using early versions of Shorebird could break your app in the
wild. If you believe that's the case, please reach out, we're here to help.

## What works today

You can build and deploy new (release) versions of your app to all Android
users via `shorebird` command line. iOS support is
[coming soon](https://www.youtube.com/watch?v=7KDgFvdogsE).

All users will update to the new version on next launch in the background
(no control over this behavior yet).

We also have an extensive command line interface for managing your Shorebird
account and apps and CI/CD integration via GitHub Actions.

## What doesn't work yet?

No support for:

- iOS [coming soon](https://www.youtube.com/watch?v=7KDgFvdogsE) [issue](https://github.com/shorebirdtech/shorebird/issues/381)
- Asset changes (images, icons, etc.) [issue](https://github.com/shorebirdtech/shorebird/issues/318)
- Teams / Organizations sharing apps [issue](https://github.com/shorebirdtech/shorebird/issues/216)
- Older Flutter versions or `beta` and `master` channels (only latest `stable` is supported): [issue](https://github.com/shorebirdtech/shorebird/issues/472)
- Rollbacks ([issue](https://github.com/shorebirdtech/shorebird/issues/126))
- Staged rollout of patches (channels or percentage based) [issue](https://github.com/shorebirdtech/shorebird/issues/110)
- Patch signing [issue](https://github.com/shorebirdtech/shorebird/issues/112)
- Analytics [issue](https://github.com/shorebirdtech/shorebird/issues/197)
- Web interface
- "Native code" changes (java, kotlin, etc.) -- not planned.
- Fastlane integration [issue](https://github.com/shorebirdtech/shorebird/issues/257)
- Self-hosting or on-premises deployments [issue](https://github.com/shorebirdtech/shorebird/issues/485)

If these, or anything else is blocking your use of Shorebird, please let us know!
https://github.com/shorebirdtech/shorebird/issues
