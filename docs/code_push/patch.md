---
sidebar_position: 4
title: ☁️ Patch
description: Learn how to push updates to an app with Shorebird.
---

# Push Updates

Once you have published a release of your app, you can push updates using the `shorebird patch` command:

```
shorebird patch
```

This will do several things:

1. Builds the artifacts for the update.
1. Downloads the corresponding release artifacts.
1. Generates a patch using the diff between the release and the current changes.
1. Uploads the patch artifacts to the Shorebird backend
1. Promotes the patch to the stable channel.

```
$ shorebird patch
✓ Building patch (16.2s)
✓ Fetching apps (0.1s)

Which release is this patch for? (0.1.0) 0.1.0

🚀 Ready to publish a new patch!

📱 App: My App (61fc9c16)
📦 Release Version: 0.1.0
📺 Channel: stable
🕹️ Platform: android (arm64, arm32, x86)

Would you like to continue? (y/N) Yes
✓ Fetching release (41ms)
✓ Fetching release artifacts (43ms)
✓ Downloading release artifacts (0.2s)
✓ Creating artifacts (0.3s)
✓ Uploading artifacts (43ms)
✓ Fetching channels (40ms)
✓ Promoting patch to stable (43ms)

✅ Published Patch!
```
