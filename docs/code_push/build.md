---
sidebar_position: 5
title: 🔨 Build
description: Learn how to generate release builds of your Flutter app.
---

# Build your Shorebird App

:::info
It is most common to use `shorebird release` and `shorebird patch` to release
your app. `shorebird build` is a lower level command.
:::

You can use `shorebird build` to build a release version of your app including
code push:

```sh
# Build an AppBundle
shorebird build appbundle

# Build an APK
shorebird build apk
```

If your application supports flavors or multiple release targets, you can specify the flavor and target using the `--flavor` and `--target` options:

```
shorebird build appbundle --target ./lib/main_development.dart --flavor development
```

:::info
`shorebird build` wraps `flutter build` and can take any argument
`flutter build` can. To pass arguments to the underlying `flutter build` you
need to put `flutter build` arguments after a `--` separator. For example:
`shorebird build -- --dart-define="foo=bar"` will define the `"foo"` environment
variable inside Dart as you might have done with `flutter build` directly.
:::

:::info
While building with `shorebird build` will include Shorebird code push in your
app, building with `flutter build --release` will not include Shorebird in your
app. At any time you can simply drop back to `flutter build` and things will
work as they did before.
:::
