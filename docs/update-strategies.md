---
sidebar_position: 5
title: ⬆️ Update Strategies
description: Ways to use Shorebird to update your app
---

# ⬆️ Update Strategies

By default, Shorebird checks for and silently installs any updates in the
background on launch. It does this via a background thread to ensure that it
does not affect the launch speed of your application. Updates installed via
Shorebird are then used on next launch of the app.

For most users, we recommend this default behavior as we believe it's generally
best for users to not have to think about whether or not they're running the
latest version of your app – things are just magically up to date.

However, Shorebird also provides you with the ability to control when updates
are applied. Sometimes you may wish to prevent the user from using the app
until they've updated to the latest version. For example, if you've made a
breaking change between your app and your server, or if you app communicates
between peers and you've made a breaking change to the protocol.

For such cases, we've developed
[`package:shorebird_code_push`](https://pub.dev/packages/shorebird_code_push),
which enables programmatic control over the Shorebird updater. You can use this
package to check for updates at a time of your choosing and to prompt the user
to update if you wish.

You may also wish to _disable_ this default update-on-launch behavior and
instead check for updates only at a time of your choosing.

To disable auto-update behavior, add this line to your `shorebird.yaml` file:

```yaml
auto_update: false
```

You could imagine wanting to do this if you have a large number of users and
wanted to control the rollout of updates (to only update some accounts at a time
to reduce your server load, or reduce rollout risk, for example). Disabling the
default auto-update behavior would allow you to instead check for and install
updates only when you want to.

# Triggering updates via notification

It is possible to trigger updates via push notifications.

Shorebird does not provide its own notification service, but it's possible to
use others, such as
[Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging)
to send a notification to your app, and then use that notification to trigger an
update. Because these services typically allow you to target specific devices,
you could use this to trigger updates for specific users.

Any notification service which uses Dart (e.g. FCM) will also trigger the launch
of the Flutter engine when the notification is delivered. When the Flutter
engine is launched, the default auto-update behavior will run. Thus, when a
notification is received, the app will update if it is not already running.

More reliable however is to use the
[`package:shorebird_code_push`](https://pub.dev/packages/shorebird_code_push)
to trigger the update from within a notification handler.

# Patches vs. Releases

Shorebird can only execute code (and thus run its patch logic) when the app is
running. This means that, when a user downloads and launches your app for the
first time, they will see the unpatched release version that was first published
in the store. If you've published a patch, they will not see any patches until
they have opened the app at least twice. The first launch can check for (and
apply) new patches, but a second launch is required to boot from the patched code.

As discussed above, if it is important to your business to gate usage of your
app on users having the latest code, it could be appropriate for you to
check for updates as part of a login screen, or other launch gate. We do not
yet offer an example of this, but
[intend to add one](https://github.com/shorebirdtech/shorebird/issues/950).
Checking for updates does require a network connection. It would also be
possible for you to only gate users if they've not received a "no new version"
message in within a certain amount of time.

We intend for Shorebird to eventually support releasing to the app stores on
your behalf. At present, `shorebird patch` does not publish your a new "release"
to the app store, so the patch will only be visible to users after they've
opened the app at least twice as discused above.

Shorebird also does not yet automatically support deploying a patch across
multiple versions of your app, although this is possible with some automation.
For example, one could write a shell script which took a given git commit,
checked out your various release branches, cherry-picked that commit onto those
branches, and ran `shorebird patch` for each of those branches. We would like
to [support something like this](https://github.com/shorebirdtech/shorebird/issues/860)
out of the box for you in the future, but do not yet.

# How should Shorebird interact with other update systems (e.g. `in_app_update`)?

For applications which are already enforcing users are always on the latest
version (e.g. with `in_app_update`, a system on Android whereby the Play Store
will automatically prompt users to update your app), you will likely want to
write some code to coordinate between Shorebird and your existing update system.

[`package:shorebird_code_push`](https://pub.dev/packages/shorebird_code_push)
can help you here. For example, with `in_app_update`, you could use
`package:shorebird_code_push` to check if the user has already applied the
necessary patch and _not_ then prompt them to update.

Shorebird patches are typically much smaller than full Play Store updates (e.g.
a few hundred bytes, or a few kilobytes), so it is likely better for your users
(saves them data) if you can use Shorebird to deliver patches instead of
`in_app_update`. However, there are changes which Shorebird cannot make, such as
changes to "native" code (Java, Kotlin, Swift, ObjC), asset files (fonts,
images, etc.) or changes to the Flutter engine itself, so `in_app_update` may
be the best solution in some cases. Again, you will want to write some code to
coordinate between Shorebird and your existing update system to make this
determination.

Shorebird "patches" also do not change the version number of your app, so
`in_app_update` will not see them as a new version. This is by design – patches
are applied to releases, rather than being new releases themselves. This
can complicate your analytics/reporting code as you will have the case where
e.g. `1.0.1+13, patch 1` has identical dart code to `1.0.1+13, no patches`.
You can get the current booted patch number via `package:shorebird_code_push`
https://pub.dev/documentation/shorebird_code_push/latest/shorebird_code_push_io/ShorebirdCodePush/currentPatchNumber.html

We would like to move to a world where Shorebird is push-to-deploy and you don't
have to think about the difference between a patch and a release, but we're
likely still several months away from such a world.

Shorebird also currently makes the guarantee that we do not see or store
your code. Implementing "push to deploy" may not be possible without source code
access, which is not a change we would make lightly.

# Do you need to to make a release to change your version of Flutter?

Yes. Shorebird is only capable of patching Dart code, not native code. So
new versions of the Flutter engine (which is written in C++) cannot be patched
via `shorebird patch`.
