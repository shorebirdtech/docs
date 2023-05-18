---
sidebar_position: 2
title: 🚢 Release a Code Push App
description: Release a Code Push App
---

# Releasing an code push app

This guide walks you through releasing a code push app to the Play Store and applying a patch to that release.

## Prerequisites

This guide assumes that you have an existing Shorebird app. If you don't have one, you can create one by following the [code push quickstart](./code_push_quickstart/) guide.

The app we will be releasing in this guide is [`Time Shift`](https://play.google.com/store/apps/details?id=dev.shorebird.u_shorebird_clock), our demo code push app. ([source](https://github.com/shorebirdtech/time_shift/))

## Creating a Release

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

[On GitHub](https://github.com/shorebirdtech/time_shift/commit/d1fe9451aa18a775163bce95dd9dab551aaf6259)

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

[On GitHub](https://github.com/shorebirdtech/time_shift/commit/3b25df1888c170c2418162ba64a9a5e6363c09af)

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

## After the Release is Approved

Once the release has been approved, you will be able to download it from the Play Store.

## Creating a Patch

Let's say we want to create a patch for `1.0.3+6` that fixes a bug.

### Make the change

We start by checking out the `v1.0.3+6` release tag:

```sh
git checkout v1.0.3+6
```

We will branch from here, as this change will represent a divergence from the `main` branch:

```sh
git checkout -b v1.0.3+6-patch1
```

For the purposes of this guide, we will change the default clock face back to `particle` in `lib/main.dart`:

```diff
     (clock) => clock.name == clockName,
-    orElse: () => ClockFace.generative,
+    orElse: () => ClockFace.particle,
   );
```

Commit this change and push the branch:

```sh
git add lib/main.dart
git commit -m "Change default clock face to particle"
git push --set-upstream origin v1.0.3+6-patch1
```

We will also tag this commit as `v1.0.3+6-patch1`:

```sh
git tag v1.0.3+6-patch1
git push --tags
```

[On GitHub](https://github.com/shorebirdtech/time_shift/commit/cf4054bada74ff1c5ff84fb9aceb3f1e4442203f)

### Create a Shorebird Patch

We will now create a patch with `shorebird patch`. You should see output similar to the following:

```
bryanoltman@boltman ~/Shorebird/time_shift (main)
⑆ shorebird patch
✓ Building patch (17.2s)
✓ Fetching apps (0.7s)
✓ Detecting release version (0.2s)
✓ Fetching release (99ms)
✓ Fetching Flutter revision (13ms)
✓ Fetching release artifacts (0.2s)
✓ Downloading release artifacts (1.0s)
✓ Creating artifacts (1.0s)

🚀 Ready to publish a new patch!

📱 App: time_shift (51751336-6a7c-4972-b4ec-8fc1591fb2b3)
📦 Release Version: 1.0.3+6
📺 Channel: stable
🕹️  Platform: android [arm64 (135 B), arm32 (150 B), x86_64 (135 B)]

Would you like to continue? (y/N) Yes
✓ Creating patch (0.1s)
✓ Uploading artifacts (0.9s)
✓ Fetching channels (90ms)
✓ Promoting patch to stable (61ms)

✅ Published Patch!
```

This change will now be available to users with version `1.0.3+6` of the app.
