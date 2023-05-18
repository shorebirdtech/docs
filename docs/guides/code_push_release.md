---
sidebar_position: 2
title: 🚢 Release a Code Push app
description: Release a Code Push app
---

# Releasing an code push app

This guide walks you through releasing a code push app to the Play Store and applying a patch to that release.

## Prerequisites

This guide assumes that you have an existing Shorebird app. If you don't have one, you can create one by following the [code push quickstart](../code-push-quickstart/) guide.

The app we will be releasing in this guide is [`Time Shift`](https://play.google.com/store/apps/details?id=dev.shorebird.u_shorebird_clock), our demo code push app. ([source](https://github.com/shorebirdtech/time_shift/))

## Creating a release

### Determine next release version

We will start by running `shorebird releases list` to see the current set of releases:

```
bryanoltman@boltman ~/Shorebird/time_shift (main)
⑆ shorebird releases list
🚀 Releases (51751336-6a7c-4972-b4ec-8fc1591fb2b3)
┌─────────┬──────┐
│ Version │ Name │
├─────────┼──────┤
│ 1.0.1   │ --   │
├─────────┼──────┤
│ 1.0.2+1 │ --   │
├─────────┼──────┤
│ 1.0.2+5 │ --   │
└─────────┴──────┘
```

From this, we can see that the most recent release is `1.0.2+5`. This corresponds with what we see in the Play Store console:

![ReleaseVersion](https://github.com/shorebirdtech/docs/assets/581764/e6b6c276-49de-4142-8f32-dbf5e41379fa)

The release we are going to create is `1.0.3+6`.

### Make code changes

Version `1.0.3+6` of Time Shift will be a small patch that changes the default clock face from `particle` to `generative`.

To make this change, we will edit `lib/main.dart`:

```diff
   final clock = ClockFace.values.firstWhere(
     (clock) => clock.name == clockName,
-    orElse: () => ClockFace.particle,
+    orElse: () => ClockFace.generative,
   );
```

We run the app using `shorebird run` to make sure this change does what we expect.

After verifying, we will commit this change and push it to GitHub:

```sh
git add lib/main.dart
git commit -m "Change default clock face to generative"
git push
```

### Update app version

We will now update the app version in `pubspec.yaml`:

```diff
name: time_shift
description: Demo app showing Shorebird updates.
publish_to: "none"

-version: 1.0.2+5
+version: 1.0.3+6

environment:
  sdk: ">=2.19.4 <3.0.0"
```

We will commit this change, tag it, and push it.

```sh
git add pubspec.yaml
git commit -m "Update app version to 1.0.3+6"
git tag v1.0.3+6
git push # Push the commit
git push --tags  # Push the tag
```

### Create a Shorebird release

To create a Shorebird release, run `shorebird release`. You should see output similar to the following:

```
bryanoltman@boltman ~/Shorebird/time_shift (main)
⑆ shorebird release
✓ Building release (17.0s)
✓ Fetching apps (0.3s)
✓ Detecting release version (0.2s)

🚀 Ready to create a new release!

📱 App: time_shift (51751336-6a7c-4972-b4ec-8fc1591fb2b3)
📦 Release Version: 1.0.3+6
🕹️ Platform: android (arm64, arm32, x86_64)

Would you like to continue? (y/N) Yes
✓ Fetching releases (70ms)
✓ Fetching Flutter revision (22ms)
✓ Creating release (61ms)
✓ Creating artifacts (2.5s)

✅ Published Release!

Your next step is to upload the app bundle to the Play Store.
./build/app/outputs/bundle/release/app-release.aab

See the following link for more information:
https://support.google.com/googleplay/android-developer/answer/9859152?hl=en
```

### Upload to the Play Store

As per the instructions above, we need to upload the generated `.aab` to the Play Store.

1. Navigate to the [Play Console](https://play.google.com/console/developers).
1. Choose your developer account (for us, it's Shorebirdbird.dev).
1. Select the Time Shift app.
1. Select "Testing -> Open Testing" from the side bar.
1. Click the "Create new release" button.

![CreateNewRelease](https://github.com/shorebirdtech/docs/assets/581764/90c9c7ed-bc39-4731-bfec-524f89e2baf6)

You will now be prompted to upload the `.aab` file. You can find this file in `./build/app/outputs/bundle/release/app-release.aab`.

1. From `~/Shorebird/time_shift`, run `open ./build/app/outputs/bundle/release/` to open the folder containing the `.aab` in Finder.
1. Drag `app-release.aab` into the Play Console to upload.

Once the uplaod completes, the Play Store will correctly recognize the new version as `6 (1.0.3)`.

![UploadedBundle](https://github.com/shorebirdtech/docs/assets/581764/1994cb5a-4cd6-4f1b-a88c-f5aaa3d1433d)

Click "Next" and then "Save" (both in the bottom-right corner) to submit.

This will take you to the publishing overview page. Click "Submit for review" to submit the release for review.

We should now see a release in the Play Store console with an "In review" status:

![InReview](https://github.com/shorebirdtech/docs/assets/581764/4cfdc7fb-2049-4110-b1cd-da99c7a491f7)

We will now wait for the Play Store to approve this release.

### Create a GitHub Release

We also want to create a GitHub release. For us, that looks like:

1. Navigate to https://github.com/shorebirdtech/time_shift/releases.
1. Click "Draft a new release".
1. Choose the tag we created earlier (`v1.0.3+6`).
1. Title the release "v1.0.3+6".
1. Add a description of the release ("Changes the default clock face to 'generative'").
1. Publish the release.
