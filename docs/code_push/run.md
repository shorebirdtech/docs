---
sidebar_position: 2
title: 🏃 Run
description: Learn how to run a Flutter app with code push integrated.
---

# Run a Shorebird App

You can use Shorebird to build and run your app on a connected Android device.
This is similar to `flutter run --release` just with Shorebird's fork of the
Flutter engine that includes the Shorebird updater.

To run your Flutter app with Shorebird, use the `shorebird run` command at the
root of a Flutter project:

```
shorebird run
```

If your application supports flavors or multiple release targets, you can specify the flavor and target using the `--flavor` and `--target` options:

```
shorebird run --target ./lib/main_development.dart --flavor development
```

:::info
`shorebird run` wraps `flutter run` and can take any argument `flutter run` can.
To pass arguments to the underlying `flutter run` use a `--` separator. For
example: `shorebird run -- --no-pub` will not run `pub get`.
:::
