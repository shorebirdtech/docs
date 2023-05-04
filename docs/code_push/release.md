---
sidebar_position: 3
title: 📦 Release
description: Learn how to publish a new app release to Shorebird.
---

# Publish a Release

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

:::info
`shorebird release` wraps `flutter build` and can take any argument
`flutter build` can. To pass arguments to the underlying `flutter build` you
need to put `flutter build` arguments after a `--` separator. For example:
`shorebird release -- --dart-define="foo=bar"` will define the `"foo"` environment
variable inside Dart as you might have done with `flutter build` directly.
:::
