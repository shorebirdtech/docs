---
sidebar_position: 6
title: ⬆️ Update Strategies
description: Ways to use Shorebird to update your app
---

# ⬆️ Update Strategies

## Automatic (Default)

By default, Shorebird checks for and installs new patches in the background on
launch. It does this via a background thread to ensure that it does not affect
the launch speed of your application. Patches installed via Shorebird are then
available on next launch of the app.

## Manual

Shorebird also provides you with the ability to control when patches are
applied. You may want finer-grained control over updates to:

- Control rollout of patches (to only update some accounts at a time to reduce
  your server load or reduce rollout risk, for example).
- Require users to update to the latest version before they can use the app (see
  note below).

To manually manage updates, you can use the
[`package:shorebird_code_push`](https://pub.dev/packages/shorebird_code_push),
which enables programmatic control over when the Shorebird updater checks for
and downloads patches. See the package documentation for more information and
usage examples.

You will also want to disable the default automatic update behavior by adding
this line to your `shorebird.yaml` file:

```yaml
auto_update: false
```

Disabling automatic updates is not required to use `shorebird_code_push`, but
Shorebird will automatically download and apply updates if your shorebird.yaml
file does not contain `auto_update: false`.

:::note
Because Shorebird can only download and apply patches when your app is
running, the user will see the unpatched release version that was first
published in the store when they first launch your app. If it is important to
your business to gate usage of your app on users having the latest code, it
could be appropriate for you to check for updates as part of a login screen, or
other launch gate.
:::

# Triggering updates via notification

It is possible to trigger updates via push notifications.

Shorebird does not provide its own notification service, but it's possible to
use others, such as [Firebase Cloud Messaging
(FCM)](https://firebase.google.com/docs/cloud-messaging) to send a notification
to your app, and then use that notification to trigger an update. Because these
services typically allow you to target specific devices, you could use this to
trigger updates for specific users.

Because any notification service which uses Dart (e.g. FCM) will also trigger
the launch of the Flutter engine when the notification is delivered, the app
will update if it is not already running.

If you are manually managing updates with the `shorebird_code_push` package, you
can check for and trigger updates in your notification handler.

# How should Shorebird interact with other update systems (e.g. `in_app_update`)?

For applications that already ensure users are on the latest version (e.g. with
`in_app_update`, a system on Android whereby the Play Store will automatically
prompt users to update your app), you will likely want to write some code to
coordinate between Shorebird and your existing update system.

[`package:shorebird_code_push`](https://pub.dev/packages/shorebird_code_push)
can help you here. For example, with `in_app_update`, you could use
`package:shorebird_code_push` to check if the user has already applied the
necessary patch and _not_ then prompt them to update.

Shorebird patches are typically much smaller than full app downloads (a few KB
on Android, a few hundred KB on iOS), so it is likely better for your users if
you can use Shorebird to deliver patches instead of `in_app_update`. However,
there are [changes which Shorebird cannot make](concepts#what-types-of-changes-can-be-included-in-a-patch), so
`in_app_update` may be the best solution in some cases.

Shorebird "patches" also do not change the version number of your app, so
`in_app_update` will not see them as a new version. This is by design – patches
are applied to releases, rather than being new releases themselves. This can
complicate your analytics/reporting code as you will have the case where e.g.
`1.0.1+13, patch 1` has identical dart code to `1.0.1+13, no patches`. You can
get the current booted patch number via `package:shorebird_code_push`'s
[currentPatchNumber]
(https://pub.dev/documentation/shorebird_code_push/latest/shorebird_code_push/ShorebirdCodePush/currentPatchNumber.html)
method.

Shorebird also currently makes the guarantee that we do not see or store your
code. Implementing "push to deploy" may not be possible without source code
access, which is not a change we would make lightly.
