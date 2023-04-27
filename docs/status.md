---
sidebar_position: 3
title: 👷 Status
description: Status of the Shorebird project.
---

## Open Beta

Shorebird is currently "Open Beta". A lot is still changing, but we're
ready and interested for feedback from the general public.

Our goal with this open beta is to shake out bugs and ensure that
we are building things people want. We _want_ your feedback. We _want_ you to
break things. We _want_ you to tell us what you want to see next.

Filing [issues](https://github.com/shorebirdtech/shorebird/issues) is a good way
to provide feedback. Feedback via Discord is also welcome.

Our guiding principle for these early days is "first, do no harm".
It should be the case that using Shorebird is never worse than not using Shorebird.
It is still possible using early versions of Shorebird could break your app in
the wild. If you believe that's the case, please reach out, we're here to help.

## What works today

You can build and deploy new (release) versions of your app to all Android
users via `shorebird` command line.

All users will update to the new version on next launch in the background
(no control over this behavior yet).

We also have an extensive command line interface for managing your Shorebird
account and apps.

## What doesn't work?

No support for:

- iOS [issue](https://github.com/shorebirdtech/shorebird/issues/381)
- Asset changes (images, icons, etc.) [issue](https://github.com/shorebirdtech/shorebird/issues/318)
- Teams / Organizations sharing apps [issue](https://github.com/shorebirdtech/shorebird/issues/345)
- Flutter beta or master channels (only latest stable 3.7.12 is supported)
- Rollbacks ([issue](https://github.com/shorebirdtech/shorebird/issues/126))
- Staged rollout of patches (channels or percentage based) [issue](https://github.com/shorebirdtech/shorebird/issues/110)
- CI/CD (GitHub Actions, etc.) integration
- Patch signing [issue](https://github.com/shorebirdtech/shorebird/issues/112)
- Analytics
- Web interface
- "Native code" changes (java, kotlin, etc.) -- not planned.

If these, or anything else is blocking your use of Shorebird, please let us know!
https://github.com/shorebirdtech/shorebird/issues
