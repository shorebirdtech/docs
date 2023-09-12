---
sidebar_position: 2
title: iOS | Flavors
sidebar_label: 🍎 iOS
description: Push patches to multiple flavors on iOS
---

# Flavors

This guide will walk through how to setup an app in which there are 2 flavors: `internal` and `stable`. It will cover how to validate a patch on the internal flavor and then promote the patch to the stable flavor on iOS.

## Prerequisites

This guide assumes the Shorebird command-line is installed on your machine and that you are logged into an account. Refer to the [getting started](/) instructions for more information.

## Create a Project

:::info
In this guide, we'll go through the process of creating a new project from scratch. To apply these changes to an existing project, skip this step and read ahead.
:::

Create a new project using `flutter create flavors`.

## Configure Flavors

Next, edit the iOS project to support two flavors: `internal` and `stable` by following the instructions in the [Flutter documentation](https://docs.flutter.dev/deployment/flavors#creating-flavors-in-ios).

## Initialize Shorebird

Next, initialize Shorebird in the current project via `shorebird init`.

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
app_id: ee322dc4-3dc2-4324-90a9-04c40a62ae76
flavors:
  internal: ee322dc4-3dc2-4324-90a9-04c40a62ae76
  stable: 904bd3d5-3526-4c1c-a832-7ac23c95302d
```

Since the project contains flavors, `shorebird init` generates an app per flavor.

:::tip
You can view your apps at [console.shorebird.dev](https://console.shorebird.dev).
:::

## Create a release

Now that we've created our apps on shorebird, we need to create releases (one for each flavor). To create a release, we'll use the `shorebird release ios-alpha` command.

```sh
# Create a release for the internal flavor
shorebird release ios-alpha --flavor internal

# Create a release for the stable flavor
shorebird release ios-alpha --flavor stable
```

We can verify the releases were created successfully by re-running `shorebird apps list`.

```sh
$ shorebird apps list
📱 Apps
┌──────────────────────┬──────────────────────────────────────┬─────────┬───────┐
│ Name                 │ ID                                   │ Release │ Patch │
├──────────────────────┼──────────────────────────────────────┼─────────┼───────┤
│ flavors (internal)   │ ee322dc4-3dc2-4324-90a9-04c40a62ae76 │ 1.0.0+1 │ --    │
├──────────────────────┼──────────────────────────────────────┼─────────┼───────┤
│ flavors (stable)     │ 904bd3d5-3526-4c1c-a832-7ac23c95302d │ 1.0.0+1 │ --    │
└──────────────────────┴──────────────────────────────────────┴─────────┴───────┘
```

## Preview the release

Next, preview the app release locally on a device or emulator, use `shorebird preview`.

```sh
# Preview the release for the internal flavor.
shorebird preview --app-id ee322dc4-3dc2-4324-90a9-04c40a62ae76 --release-version 1.0.0+1

# Preview the release for the stable flavor.
shorebird preview --app-id 904bd3d5-3526-4c1c-a832-7ac23c95302d --release-version 1.0.0+1
```

This will download the releases and run them on your device.

In addition to previewing the releases locally, you should also [submit the generated app bundles to the App Store](/guides/release/ios#upload-to-the-app-store). In this case, both apps can be part of the internal test flavor and only the stable variant should be promoted to production.

:::info

- The `internal` variant should only be used for internal testing/validation.
- The `stable` variant should be shipped to end users in production.
  :::

## Creating a patch

Now that we have our internal and stable releases on the Play Store, we can create a patch using `shorebird patch ios-alpha`. For the sake of this example, let's adjust the app theme to use `deepOrange` as the seed color in `lib/main.dart`:

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
shorebird patch ios-alpha --flavor internal
```

:::tip
Run `shorebird apps list` to verify the patch was published:

```sh
 📱 Apps
┌──────────────────────┬──────────────────────────────────────┬─────────┬───────┐
│ Name                 │ ID                                   │ Release │ Patch │
├──────────────────────┼──────────────────────────────────────┼─────────┼───────┤
│ flavors (internal)   │ ee322dc4-3dc2-4324-90a9-04c40a62ae76 │ 1.0.0+1 │ 1     │
├──────────────────────┼──────────────────────────────────────┼─────────┼───────┤
│ flavors (stable)     │ 904bd3d5-3526-4c1c-a832-7ac23c95302d │ 1.0.0+1 │ --    │
└──────────────────────┴──────────────────────────────────────┴─────────┴───────┘
```

:::

We can validate the patch by re-launching the internal release.

:::note
If you are testing locally, you don't need to re-run `shorebird preview` -- just re-launch the app from the device or emulator directly.
:::

The first time the app is re-launched, we should still see the purple theme and Shorebird will detect and install the patch in the background. Kill and re-launch the app a second time to see the applied patch.

If all went well, you should see the patch was applied after re-launching the app a second time. All devices that have the internal variant of the app installed should also receive the patch 🎉

## Promote the patch

Once you have validated the patch internally, you can promote the patch to the stable variant via:

```sh
shorebird patch ios-alpha --flavor stable
```

At this point, you have a setup which allows you to push patches to internal testers before promoting them to production 🎉

The full source code for this example can be found [here](https://github.com/shorebirdtech/samples/tree/main/flavors).

## Adding new flavors

If you want to add a new flavor to your project after initializing Shorebird, you can do so by following the same steps as before.

Edit the iOS project to add a third flavor, `beta`, by following the instructions in the [Flutter documentation](https://docs.flutter.dev/deployment/flavors#creating-flavors-in-ios).

Add this to your `shorebird.yaml` by running `shorebird init`:

```
$ shorebird init
✓ Detecting product flavors (0.6s)
New flavors detected: beta
✓ Fetching apps (0.1s)
✓ Flavors added to shorebird.yaml (0.2s)
```

The resulting shorebird yaml:

```diff
app_id: ee322dc4-3dc2-4324-90a9-04c40a62ae76
flavors:
  internal: ee322dc4-3dc2-4324-90a9-04c40a62ae76
  stable: 904bd3d5-3526-4c1c-a832-7ac23c95302d
+ beta: a41f8226-4b46-45d6-9e19-b14d0cf17bdc
```
