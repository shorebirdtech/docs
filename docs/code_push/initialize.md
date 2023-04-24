---
sidebar_position: 1
title: ✨ Initialize
description: Learn how to add code push to an existing Flutter project.
---

# Initialize Shorebird

To add code push to an existing Flutter project, run the `shorebird init` command at the root of a Flutter project:

```
shorebird init
```

This will do several things:

1. Tells Shorebird that your app exists (e.g. so it can hold patches to it and vend them to devices when asked).
1. Creates a `shorebird.yaml` file to your project. `shorebird.yaml` contains the `app_id` for your app, which is the unique identifier the app will send to Shorebird servers to identify which application to pull updates for.
1. Adds the `shorebird.yaml` to the assets section of your `pubspec.yaml` file, ensuring `shorebird.yaml` is bundled into your app's assets.

You can go ahead and commit these changes, they will be innocuous even if you don't end up using Shorebird with this application.

```
$ shorebird init
? How should we refer to this app? (shorebird_test) shorebird_test
✓ Initialized Shorebird (38ms)

🐦 Shorebird initialized successfully!

✅ A shorebird app has been created.
✅ A "shorebird.yaml" has been created.
✅ The "pubspec.yaml" has been updated to include "shorebird.yaml" as an asset.

Reference the following commands to get started:

🚙 To run your project use: "shorebird run".
📦 To create a new release use: "shorebird release".
🚀 To push an update use: "shorebird patch".

For more information about Shorebird, visit https://shorebird.dev
```

:::info
Shorebird code push requires the internet permission to be added to your `AndroidManifest.xml` file. (located in `android/app/src/main/AndroidManifest.xml`.) This is required for the app to be able to communicate with the Shorebird servers to pull new patches.

```xml
<manifest ...>
<uses-permission android:name="android.permission.INTERNET" />
...
</manifest>
```

Running `shorebird doctor` will check that your `AndroidManifest.xml` file is set up correctly.
:::
