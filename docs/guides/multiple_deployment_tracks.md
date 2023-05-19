---
sidebar_position: 3
title: 🛤️ Multiple Deployment Tracks
description: Push patches to multiple deployment tracks
---

# Multiple Deployment Tracks

This guide will walk through how to setup an app in which there are 2 deployment tracks: `internal` and `stable`. It will cover how to validate a patch on the internal track and then promote the patch to the stable track.

## Prerequisites

This guide assumes the Shorebird CLI is installed on your machine and that you are logged into a paid account. Refer to the [getting started](/) instructions for more information.

## Create a Project

:::info
In this guide, we'll go through the process of creating a new project from scratch. To apply these changes to an existing project, skip this step and read ahead.
:::

Create a new project using `flutter create shorebird_example`.

## Configure Flavors

Next, edit the `android/app/build.gradle` to contain two productFlavors:

```diff
defaultConfig {
    ...
}

+    flavorDimensions "track"
+    productFlavors {
+        internal {
+            dimension "track"
+            applicationIdSuffix ".internal"
+            manifestPlaceholders = [applicationLabel: "[Internal] Shorebird Example"]
+        }
+        stable {
+            dimension "track"
+            manifestPlaceholders = [applicationLabel: "Shorebird Example"]
+        }
+    }

buildTypes {
  ...
}
```

Lastly, edit `android/app/src/main/AndroidManifest.xml` to use the `applicationLabel` so that we can differentiate the two apps easily:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
-  <application android:label="shorebird_example" android:name="${applicationName}" android:icon="@mipmap/ic_launcher">
+  <application android:label="${applicationLabel}" android:name="${applicationName}" android:icon="@mipmap/ic_launcher">
```

:::info
To learn more about configuring `productFlavors` refer to the [Android Developer documentation](https://developer.android.com/build/build-variants#product-flavors).
:::

## Initialize Shorebird

Next, initialize shorebird in the current project via `shorebird init`.

```
shorebird init
```

The generated `shorebird.yaml` should look something like:

```yaml
# This file is used to configure the Shorebird updater used by your application.
# Learn more at https://shorebird.dev
# This file should be checked into version control.

# This is the unique identifier assigned to your app.
# It is used by your app to request the correct patches from Shorebird servers.
app_id: ffbe990b-10fb-4044-a87f-8c3d10926cd6
flavors:
  internal: ffbe990b-10fb-4044-a87f-8c3d10926cd6
  stable: a61aafb2-7865-4e7b-b22d-d90aa0784793
```

Since the project contains flavors, `shorebird init` generates an app per flavor.

:::tip
You can list your shorebird apps via `shorebird apps list`. In this case, the output should look something like:

```
$ shorebird apps list
📱 Apps
┌──────────────────────────────┬──────────────────────────────────────┬─────────────┬───────┐
│ Name                         │ ID                                   │ Release     │ Patch │
├──────────────────────────────┼──────────────────────────────────────┼─────────────┼───────┤
│ shorebird_example (internal) │ ffbe990b-10fb-4044-a87f-8c3d10926cd6 │ --          │ --    │
├──────────────────────────────┼──────────────────────────────────────┼─────────────┼───────┤
│ shorebird_example (stable)   │ a61aafb2-7865-4e7b-b22d-d90aa0784793 │ --          │ --    │
└──────────────────────────────┴──────────────────────────────────────┴─────────────┴───────┘
```

:::

Before moving on, run `shorebird doctor` to ensure the project is configured correctly.

```sh
shorebird doctor
```

:::tip
Use `shorebird doctor --fix` to automatically fix validation issues detected. If you just created a new project, you'll need to do this in order to add the missing internet permission to the `AndroidManifest.xml`.
:::

## Create a release

Now that we've created our apps on shorebird, we need to create releases (one for each track). To create a release, we'll use the `shorebird release` command.

```sh
# Create a release for the internal track
shorebird release --flavor internal

# Create a release for the stable track
shorebird release --flavor stable
```

We can verify the releases were created successfully by re-running `shorebird apps list`.

```sh
$ shorebird apps list
📱 Apps
┌──────────────────────────────┬──────────────────────────────────────┬─────────────┬───────┐
│ Name                         │ ID                                   │ Release     │ Patch │
├──────────────────────────────┼──────────────────────────────────────┼─────────────┼───────┤
│ shorebird_example (internal) │ ffbe990b-10fb-4044-a87f-8c3d10926cd6 │ 1.0.0+1     │ --    │
├──────────────────────────────┼──────────────────────────────────────┼─────────────┼───────┤
│ shorebird_example (stable)   │ a61aafb2-7865-4e7b-b22d-d90aa0784793 │ 1.0.0+1     │ --    │
└──────────────────────────────┴──────────────────────────────────────┴─────────────┴───────┘
```

## Running the app

Next, run the app locally on a device or emulator, use `shorebird run`.

```sh
# Run the app for the internal track.
shorebird run --flavor internal

# Run the app for the stable track.
shorebird run --flavor stable
```

This will create a release build and run it on your device.

In addition to running the app locally, you should also [submit the generated app bundles to the Play Store](/guides/code_push_release#upload-to-the-play-store). In this case, both apps can be part of the internal test track and only the stable variant should be promoted to production.

:::info

- The `internal` variant should only be used for internal testing/validation.
- The `stable` variant should be shipped to end users in production.
  :::

## Creating a patch

Now that we have our internal and stable releases on the Play Store, we can create a patch using `shorebird patch`. For the sake of this example, let's adjust the app theme to use `deepOrange` as the seed color in `lib/main.dart`:

```diff
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a blue toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
-        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
+        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

:::info
Typically `shorebird patch` should be used to fix critical bugs.
:::

Now that we've applied the changes, let's patch the `internal` variant:

```sh
shorebird patch --flavor internal
```

:::tip
Run `shorebird apps list` to verify the patch was published:

```sh
 Apps
┌──────────────────────────────┬──────────────────────────────────────┬─────────────┬───────┐
│ Name                         │ ID                                   │ Release     │ Patch │
├──────────────────────────────┼──────────────────────────────────────┼─────────────┼───────┤
│ shorebird_example (internal) │ 661c2383-4fe9-43ca-8bb0-beb5959067d6 │ 1.0.0+1     │ 1     │
├──────────────────────────────┼──────────────────────────────────────┼─────────────┼───────┤
│ shorebird_example (stable)   │ 1db93edf-4a8a-493a-9450-bd62d06cefb1 │ 1.0.0+1     │ --    │
└──────────────────────────────┴──────────────────────────────────────┴─────────────┴───────┘
```

:::

We can validate the patch by re-launching the internal release.

:::warning
If you are testing locally, DO NOT re-run `shorebird run`, instead just re-launch the app from the device or emulator directly.
:::

The first time the app is re-launched, we should still see the purple theme and shorebird will detect and install the patch in the background. Kill and re-launch the app a second time to see the applied patch.

If all went well, you should see the patch was applied after re-launching the app a second time. All devices that have the internal variant of the app installed should also receive the patch 🎉

## Promote the patch

Once you have validated the patch internally, you can promote the patch to the stable variant via:

```sh
shorebird patch --flavor stable
```

At this point, you have a setup which allows you to push patches to internal testers before promoting them to production 🎉
