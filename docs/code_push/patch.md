---
sidebar_position: 4
title: ☁️ Patch
description: Learn how to push updates to an app with Shorebird.
---

# Push Updates

Once you have published a release of your app, you can push updates using the
`shorebird patch android` command:

```
shorebird patch android
```

This will do several things:

1. Builds the artifacts for the update.
1. Downloads the corresponding release artifacts.
1. Generates a patch using the diff between the release and the current changes.
1. Uploads the patch artifacts to the Shorebird backend
1. Promotes the patch to the stable channel.

Example output:

```
$ shorebird patch
✓ Building patch (3.0s)
✓ Fetching apps (0.2s)
✓ Detecting release version (0.3s)
✓ Fetching release (77ms)
✓ Fetching Flutter revision (15ms)
✓ Fetching release artifacts (0.3s)
✓ Downloading release artifacts (1.9s)
✓ Creating artifacts (4.1s)

🚀 Ready to publish a new patch!

📱 App: My App (61fc9c16)
📦 Release Version: 0.1.0+1
📺 Channel: stable
🕹️  Platform: android [arm64 (166.20 KB), arm32 (161.78 KB), x86_64 (161.51 KB)]

Would you like to continue? (y/N) Yes
✓ Creating patch (93ms)
✓ Uploading artifacts (1.5s)
✓ Fetching channels (86ms)
✓ Promoting patch to stable (78ms)

✅ Published Patch!
```

If your application supports flavors or multiple release targets, you can specify the flavor and target using the `--flavor` and `--target` options:

```
shorebird patch --target ./lib/main_development.dart --flavor development
```
