---
sidebar_position: 3
title: 🍎 Release a Code Push App (iOS)
description: Release a Code Push App (iOS)
---

# Releasing a code push app to the Apple App Store

This guide walks through releasing a code push app to the Apple App Store and applying a patch to that release.

The app we will be releasing in this guide is Shorebird Clock, our demo code push app. ([source](https://github.com/shorebirdtech/time_shift/))

## Prequisites

To follow along with this guide, you will need the following:

1. An existing Shorebird app. If you don't have one, you can create one by following the [code push quickstart](./code_push_quickstart/) guide.
1. Access to hardware running macOS. This is required to build iOS apps.
1. A valid Apple Developer account. This is required to release iOS apps.
1. An app in [App Store Connect](https://appstoreconnect.apple.com/). See the [official documentation](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app) for more information about how to create one.
1. An iOS Distribution certificate. You can create one at [https://developer.apple.com/account/resources/certificates/add](https://developer.apple.com/account/resources/certificates/add).
1. An iOS App Store provisioning profile. See the [official documentation](https://developer.apple.com/help/account/manage-provisioning-profiles/create-an-app-store-provisioning-profile) for instructions on how to create one.
1. The [Transporter app](https://apps.apple.com/us/app/transporter/id1450874784). We will be using this to upload our app to the App Store.

## Creating a release

### Determine the release version

Run `shorebird releases list` to see the current set of releases:

```
⑆ shorebird releases list
🚀 Releases (f2184ee6-9a85-498c-bfeb-114d638c462e)
┌─────────┬──────┐
│ Version │ Name │
├─────────┼──────┤
│ 1.0.3+1 │ --   │
└─────────┴──────┘
```

This shows that the most recent release is `1.0.3+1`. Our next version will be `1.0.4+1`.

### Create a release in App Store Connect

Because the App Store does not include the build number (the `+1` part of `1.0.4+1`) in app versions, this will show up in the App Store as `1.0.4`. Follow the instructions in the [official documentation](https://developer.apple.com/help/app-store-connect/update-your-app/create-a-new-version) to create a new version in App Store Connect.

![App Store Connect version](https://github.com/shorebirdtech/docs/assets/581764/549a42ac-0202-4c72-a9a9-d0196a0308b6)

### Specify a development team in Xcode

To create a release, we need to specify a development team in Xcode. Open `ios/Runner.xcworkspace` in Xcode and select the `Runner` target:

![Xcode development team](https://github.com/shorebirdtech/docs/assets/581764/786b1def-6198-4be0-90ac-d307e9b1a289)

### Update the version in `pubspec.yaml`

Update the version in `pubspec.yaml` to `1.0.4+1`:

```diff
 name: shorebird_clock
 description: A demo app for Shorebird
- version: 1.0.3+1
+ version: 1.0.4+1
```

### Create a Shorebird release

Create a Shorebird release by running the `shorebird release ios-alpha` command:

```
$ shorebird release ios-alpha
[WARN] iOS support is in an alpha state. See https://docs.shorebird.dev/faq#ios-alpha for more information.
✓ Fetching apps (0.1s)
✓ Building release (56.2s)
✓ Getting release version (37ms)
✓ Fetching releases (0.1s)
🚀 Ready to create a new release!
📱 App: time_shift (f2184ee6-9a85-498c-bfeb-114d638c462e)
📦 Release Version: 1.0.4+1
🕹️ Platform: ios

Would you like to continue? (y/N) Yes
✓ Fetching Flutter revision (36ms)
✓ Creating release (0.2s)
✓ Creating artifacts (8.0s)
✓ Updating release status (57ms)

✅ Published Release!

Your next step is to upload the ipa to App Store Connect.
build/ios/ipa/time_shift.ipa

To upload to the App Store either:
    1. Drag and drop the "build/ios/ipa/time_shift.ipa" bundle into the Apple Transporter macOS app (https://apps.apple.com/us/app/transporter/id1450874784)
    2. Run xcrun altool --upload-app --type ios -f build/ios/ipa/time_shift.ipa --apiKey your_api_key --apiIssuer your_issuer_id.
       See "man altool" for details about how to authenticate with the App Store Connect API key.
```

## Upload to the App Store

Open the Transporter app and drag the generated `ipa` file into the app. This will upload the app to the App Store.

Once the upload has completed, you will see the new build under the "Delivered" header:

![Transport upload](https://github.com/shorebirdtech/docs/assets/581764/f4740937-d38e-44a7-adde-c0debc254337)

After a short delay (usually a minute or two), you will see the build listed as "Processing" in App Store Connect:

![App Store Connect Processing](https://github.com/shorebirdtech/docs/assets/581764/a87cdb31-9f8d-4838-b21b-38a3dbf9dcd1)

Once the app has finished processing, we can add it to our release:

![App Store Connect add build](https://github.com/shorebirdtech/docs/assets/581764/da2f1253-610b-4ee5-abb4-7c088da1631c)

## Submit the app for review

When we attempt to submit the app for review, App Store Connect will list the issues we need to resolve before we can submit the app:

![App Store Connect review issues](https://github.com/shorebirdtech/docs/assets/581764/576459e0-3212-4ead-8388-eabb3b01c68a)

## After the release is approved

Once the release has been approved, you will be able to download it from the App Store.

## Creating a patch

Patches can be pushed to fix bugs in the `App Store` release without requiring a new submission to the App Store.

### Make code changes

For the purposes of this guide, we will change the default clock face to `generative` in `lib/main.dart`:

```diff
     (clock) => clock.name == clockName,
-    orElse: () => ClockFace.particle,
+    orElse: () => ClockFace.generative,
   );
```

### Create a Shorebird patch

To make this patch available to your users, run `shorebird patch ios-alpha`.

```
$ shorebird patch ios-alpha
[WARN] iOS support is in an alpha state. See https://docs.shorebird.dev/faq#ios-alpha for more information.
✓ Fetching apps (0.4s)
✓ Building release (61.5s)
✓ Detected release version 1.0.4+1 (44ms)
✓ Fetching releases (0.1s)
✓ Fetching Flutter revision (23ms)

🚀 Ready to publish a new patch!

📱 App: time_shift (f2184ee6-9a85-498c-bfeb-114d638c462e)
📦 Release Version: 1.0.4+1
📺 Channel: stable
🕹️ Platform: ios [aarch64 (4.17 MB)]

Would you like to continue? (y/N) Yes
✓ Creating patch (72ms)
✓ Uploading artifacts (0.5s)
✓ Fetching channels (58ms)
✓ Promoting patch to stable (61ms)

✅ Published Patch!
```
