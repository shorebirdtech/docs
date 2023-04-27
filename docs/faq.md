---
sidebar_position: 4
title: ❓ FAQ
description: Frequently asked questions.
---

## How does Shorebird relate to Flutter?

Shorebird is a fork of Flutter that adds code push. Shorebird is not a
replacement for Flutter, but rather a replacement for the Flutter engine. You
can continue to use the Flutter tooling you already know and love.

`shorebird` uses a fork of Flutter that includes the Shorebird updater. We track
the latest stable release of Flutter and replace a few of the Flutter engine
files with our modified copies.

To implement our fork, we use `FLUTTER_STORAGE_BASE_URL` to point to
`https://download.shorebird.dev` instead of download.flutter.dev. We pass
through unmodified output from the `flutter` tool so you will see a warning from
Flutter:

```
Flutter assets will be downloaded from http://download.shorebird.dev. Make sure you trust this source!
```

For more information about why we had to fork Flutter see
[architecture.md](architecture.md).

## When do updates happen?

Shorebird udpater is currently hard-coded to run on app startup. It runs on
a background thread and does not block the UI thread. Any updates will be
installed while the user is using the app and will be applied the next time the
app is restarted.

The Shorebird updater is designed such that when the network is not available,
or the server is down or otherwise unreachable, the app will continue to run
as normal. Should you ever choose to delete an update from our servers, all your
clients will continue to run as normal.

We have not yet added the ability to rollback patches. For now, the simplest
thing is to simply push a new patch that reverts the changes you want to undo.

We expect to add more control over update behavior in the future. Please let us
know if you have needs here, and we're happy to prioritize them.

## What information is sent to Shorebird servers?

Although Shorebird connects to the network, it does not send any personally
identifiable information. Including Shorebird should not affect your
declarations for the Play Store.

Requests sent from the app to Shorebird servers include:

- app_id (specified `shorebird.yaml`)
- channel (optional in `shorebird.yaml`)
- release_version (versionName from AndroidManifest.xml)
- patch_number (generated as part of `shorebird patch`)
- arch (e.g. 'aarch64', needed to send down the right patch)
- platform (e.g. 'android', needed to send down the right patch)
  That's it. The code for this is in `updater/library/src/network.rs`

## Does Shorebird comply with Play Store guidelines?

Shorebird is designed to be compatible with the Play Store guidelines. However
Shorebird is a tool, and as with any tool, can be abused. Deliberately abusing
Shorebird to violate Play Store guidelines is in violation of the Shorebird
[Terms of Service](https://shorebird.dev/terms) and can result in termination of
your account.

Examples of guidelines you should be aware of, include "Deceptive Behavior" and
"Unwanted Software". Please be clear with your users about what you are
providing with your application and do not violate their expectations with
significant behavioral changes through the use of Shorebird.

Code push services are widely used in the industry (all of the large apps
I'm aware of use them) and there are multiple other code push services
publicly available (e.g. expo.dev & appcenter.ms). This is a well trodden path.

## What platforms does Shorebird support? Does it support iOS?

Current Shorebird is Android-only. We have
[plans to add iOS](https://github.com/shorebirdtech/shorebird/issues/381),
but not yet implemented. Using Shorebird for your Android builds does not affect
your iOS builds. You can successfully ship an appbundle build with `shorebird`
to Google Play and an ipa built with `flutter` to the App Store.
The difference will be that you will be able to update your Android users
sooner than you will your iOS users for now.

We've focused on Android so far on the assumption that most Flutter developers
are targeting Android first. Shorebird can (relatively easily) be made to
support Desktop or embedded targets. If those are important to you, please let
us know.
