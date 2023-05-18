---
sidebar_position: 2
title: 🏃 Run
description: Learn how to run a Flutter app with code push integrated.
---

# Run a Shorebird App

Once you have [initialized Shorebird](/code_push/initialize), you can run your
app on an Android device or emulator using the `shorebird run` command at the
root of a Flutter project:

```sh
shorebird run
```

This is similar to `flutter run --release`, but uses with [Shorebird's fork of
the Flutter engine](/faq#how-does-shorebird-relate-to-flutter) that includes the
Shorebird updater.

:::info
`shorebird run` wraps `flutter run` and can take any argument `flutter run` can.
To pass arguments to the underlying `flutter run`, use a `--` separator. For
example, `shorebird run -- -d my_device` will run on a specific device.
:::
