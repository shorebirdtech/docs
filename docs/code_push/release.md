---
sidebar_position: 3
title: 📦 Release
description: Learn how to publish a new app release to Shorebird.
---

# Releases

## Publish a Release

In order to start pushing updates, you will need to create a release using
`shorebird release`.

```
shorebird release
```

Creating a release builds and submits your app to Shorebird. Shorebird saves the
compiled Dart code from your application in order to make updates smaller in
size.

Example output:

```
$ shorebird release
✓ Building release (5.1s)
✓ Fetching apps (0.2s)

What is the version of this release? (1.0.0) 1.0.0

🚀 Ready to create a new release!

📱 App: My App (30370f27-dbf1-4673-8b20-fb096e38dffa)
📦 Release Version: 1.0.0
🕹️ Platform: android (arm64, arm32, x86)

Would you like to continue? (y/N) Yes
✓ Fetching releases (55ms)
✓ Creating release (45ms)
✓ Creating artifacts (4.6s)

✅ Published Release!

Your next step is to upload the app bundle to the Play Store.
./build/app/outputs/bundle/release/app-release.aab

See the following link for more information:
https://support.google.com/googleplay/android-developer/answer/9859152?hl=en
```

## Manage Releases

### List Releases

You can view all of your releases for your current app (as defined by
your shorebird.yaml) using `shorebird releases list`.

Example output:

```
$ shorebird releases list
🚀 Releases (675a3bf6-fdf9-4520-a5f5-f73493ef9034)
┌─────────┬──────┐
│ Version │ Name │
├─────────┼──────┤
│ 1.0.2   │ --   │
├─────────┼──────┤
│ 1.0.3   │ --   │
└─────────┴──────┘
```

### Delete Releases

:::warning
Deleting a release will remove all associated patches and artifacts
and is **not reversible**.
:::

You can delete a release for your current app (as defined by your
shorebird.yaml) using `shorebird releases delete`.

Example output:

```
$ shorebird releases delete --version 1.0.3
✓ Fetched releases. (54ms)
Are you sure you want to delete release 1.0.3? (y/N) Yes
✓ Deleted release 1.0.3. (0.3s)
```
