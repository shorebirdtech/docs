---
sidebar_position: 2
title: 🏃 Run
description: Learn how to run a Flutter app with code push integrated.
---

# Run a Shorebird App

You can use Shorebird to build and run your app on a connected Android device. This is similar to `flutter run --release` just with Shorebird's fork of the Flutter engine that includes the Shorebird updater.

To run your Flutter app with Shorebird, use the `shorebird run` command at the root of a Flutter project:

```
shorebird run
```

:::info
`shorebird run` wraps `flutter run` and can take any argument `flutter run` can. To pass arguments to the underlying `flutter run` use a `--` separator. For example: `shorebird run -- -d my_device` will run on a specific device.
:::
