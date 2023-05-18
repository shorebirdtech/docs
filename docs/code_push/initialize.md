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

1. Tells Shorebird to create a unique `app_id` for your app. This `app_id` is
   how Shorebird identifies your app and knows which updates to send to it. It
   does not need to be kept secret.
1. Creates a `shorebird.yaml` file in your project's root directory.
   `shorebird.yaml` contains the `app_id` mentioned above.
1. Adds the `shorebird.yaml` to the assets section of your `pubspec.yaml` file,
   ensuring `shorebird.yaml` is bundled with your app's assets and is available
   to the Shorebird updater at runtime.

You can safely commit these changes, they will have no affect on your app
when not using Shorebird.

Example output for an app named `shorebird_test`:

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

The generated `shorebird.yaml` should look similar to:

```yaml
# This file is used to configure the Shorebird updater used by your application.
# Learn more at https://shorebird.dev
# This file should be checked into version control.

# This is the unique identifier assigned to your app.
# It is used by your app to request the correct patches from Shorebird servers.
app_id: 8c846e87-1461-4b09-8708-170d78331aca
```

If your application contains flavors, `shorebird init` will create an app per flavor and `shorebird.yaml` will include all flavors and their corresponding `app_ids`:

```yaml
# This file is used to configure the Shorebird updater used by your application.
# Learn more at https://shorebird.dev
# This file should be checked into version control.

# This is the unique identifier assigned to your app.
# It is used by your app to request the correct patches from Shorebird servers.
app_id: 864ab1b0-ba78-4b15-990a-a63cec35a41b
flavors:
  development: 864ab1b0-ba78-4b15-990a-a63cec35a41b
  production: 6b6e6631-4fbe-4645-8d9d-d5247656d975
```

:::info
The `app_id` is a required field in every `shorebird.yaml`. In the case of flavors, `app_id` will default to the first flavor and will be overwritten at build time to the corresponding flavor's `app_id`.
:::

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
set up correctly, and `shorebird doctor --fix` will add this permission for you.
:::

:::tip
If you already have a `shorebird.yaml` and would like to re-initialize your project, use `shorebird init --force`. This will overwrite your existing `shorebird.yaml` and create a new app/app_id. Existing apps will not be affected by re-initializing shorebird.
:::
