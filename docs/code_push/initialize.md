---
sidebar_position: 1
title: ✨ Initialize
description: Learn how to add code push to an existing Flutter project.
---

# Initialize Shorebird

To configure an existing Flutter project to use Shorebird, use `shorebird init`
at the root of a Flutter project:

```sh
shorebird init
```

This does three things:

1. Tells Shorebird that your app exists (e.g. so it serve patches for your app
   to devices when requested).
1. Creates a `shorebird.yaml` file to your project. `shorebird.yaml` contains
   the `app_id` for your app, which is the unique identifier the app will send
   to Shorebird servers to identify which application to pull updates for.
   `app_id`s do not need to be kept secret.
1. Adds the `shorebird.yaml` to the assets section of your `pubspec.yaml` file,
   ensuring `shorebird.yaml` is bundled with your app's assets and is available
   to the Shorebird updater at runtime.

You can safely commit these changes, they will have no affect on your app
when not using Shorebird.

Example output for an existing app named `shorebird_test`:

```sh
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
Shorebird code push requires the internet permission to be added to your
`AndroidManifest.xml` file. (located in
`android/app/src/main/AndroidManifest.xml`.) This is required for the app to be
able to communicate with the Shorebird servers to pull new patches.

```xml
<manifest ...>
<uses-permission android:name="android.permission.INTERNET" />
...
</manifest>
```

Running `shorebird doctor` will check that your `AndroidManifest.xml` file is
set up correctly.
:::
