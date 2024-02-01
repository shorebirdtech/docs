---
sidebar_position: 7
title: 🎓 Concepts
description: Concepts used in Shorebird's code push product
---

# Code Push Concepts

An explanation of the concepts used in Shorebird's code push product.

## Glossary

### Application

An application is what is created by running `flutter create [app_name]` and corresponds to a listing in the App Store or Play Store.

Each application has a unique `app_id` that is assigned when you run `shorebird init`. You can find your application's id in the `shorebird.yaml` file at the root of your project.

An application can have zero or more [releases](#release).

:::note
Applications that use build flavors will have a unique `app_id` for each flavor.
:::

### Release

A release is a specific version of an [application](#application), identified by a version and build number (e.g. `1.0.0+1`). Although code push works for apps distributed outside of the App Store and Play Store, a release most often corresponds with a specific version of your app that is published to the App Store or Play Store.

A release can have zero or more [patches](#patch) applied to it.

Releases are created by running `shorebird release [platform]`, where `platform` is `android`, `aar`, or `ios`.

### Patch

A patch is a change to a specific [release](#release), applied as an over-the-air update. For example, a patch could be a bug fix or a new feature. Multiple patches can be published for a given release, although only one patch can be active at a time. Patches are identified by their associated release version and a patch number, which is an auto-incrementing integer.

When your application starts, it checks for available patches and applies the latest one. This patch will be visible the next time your application launches.

Patches are created by running `shorebird patch [platform]`, where `platform` is `android`, `aar`, or `ios`.

### Artifact

An artifact is the output of a build or patch operation. For example:

- `shorebird release android` generates and uploads several architecture-specific `libapp.so` files and an Android archive (.aab) file. These are **release artifacts**.
- `shorebird patch android` generates and uploads diff files that capture differences between your Dart code at patch time and the code in the associated release. These are **patch artifacts**.
