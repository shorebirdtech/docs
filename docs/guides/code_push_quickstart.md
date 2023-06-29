---
sidebar_position: 1
title: ☄️ Code Push Quickstart
description: Try code push for yourself
---

# Code Push Quickstart

This guide shows you the fastest way to install Shorebird and try code push.

This document is a (slightly) condensed version of our [code push](../code-push/) docs, all on one page.

## Sign up

Before you can create a Shorebird app, you will need to sign up for Shorebird.

### Create an account

To register as a Shorebird user, run:

```sh
shorebird account create
```

This will generate a Google sign in link. Follow the link and sign in with your
Google account.

## Create the app

Once you have registered and subscribed, you're ready to use Shorebird!

Start by creating a new Flutter app:

```sh
flutter create my_shorebird_app
```

As with any Flutter app, you can verify this created the standard Counter app by
following the instructions printed by `flutter create`:

```sh
cd my_shorebird_app
flutter run
```

### Initialize Shorebird

To make this a Shorebird app, run:

```sh
shorebird init
```

This will create a `shorebird.yaml` file in the root of your project. This file
contains your Shorebird `app_id`.

Run `shorebird doctor` to ensure everything is set up correctly:

```sh
shorebird doctor
```

You will notice that this prints an error:

```sh
[✗] android/app/src/main/AndroidManifest.xml is missing the INTERNET permission.
```

This is because Shorebird requires the internet permission to download patches.
You can fix this issue by running:

```sh
shorebird doctor --fix
```

### Run the app with Shorebird

To run the app with Shorebird (that is, with [Shorebird's fork of the Flutter
engine](/faq#how-does-shorebird-relate-to-flutter)), run:

```sh
shorebird run
```

Now kill the app on your device or emulator.

### Create a release

We will create a release using the unmodified Counter app. Run:

```sh
shorebird release
```

When prompted, use the suggested version number (`1.0.0+1`), and enter `y` when
asked if you would like to continue.

### Create a patch

We will now make a small change to the Counter app. In `lib/main.dart`, change
the app theme's `primarySwatch` from blue to green:

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
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
-       primarySwatch: Colors.blue,
+       primarySwatch: Colors.green,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

After making this change, save the file and run:

```sh
shorebird patch
```

When prompted, use the suggested release version (`1.0.0+1`), and enter `y` when
asked if you'd like to continue.

### See the patch in action

Launch the app from your device or emulator. The app will still have the
original blue theme, but it will be downloading the patch we just created in the
background. Kill and launch the app again, and the app will be green! 🎉
