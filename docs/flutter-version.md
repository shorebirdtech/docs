---
sidebar_position: 4
title: 🐦 Flutter Version
description: How to manage your Shorebird Flutter version
---

# Flutter Version Management

When Shorebird CLI is installed, it pulls down the latest stable version of Shorebird's Flutter.
In this section, we'll take a look at how to list and change the Flutter version used by Shorebird CLI.

## List Flutter Versions

To list all supported Flutter versions, use the `shorebird flutter versions list` command:

```
$ shorebird flutter versions list
📦 Flutter Versions
  3.13.6
  3.13.5
  3.13.4
  3.13.3
  3.13.2
  3.13.1
  3.13.0
  3.10.7
✓ 3.10.6
  3.10.5
  3.10.4
  3.10.3
  3.10.2
  3.10.1
  3.10.0
```

:::note
The current Flutter version used by your Shorebird CLI installation will be marked with a `✓`.
:::

:::tip
Another way to see the current Flutter version is by running `shorebird --version`.
:::

## Switch Flutter Versions

To switch to a different Flutter version, use the `shorebird flutter versions use <version>` command:

```
$ shorebird flutter versions use 3.10.3
✓ Fetching Flutter versions (21ms)
✓ Installing Flutter 3.10.3 (11ms)
```

```
$ shorebird flutter versions list
📦 Flutter Versions
  3.13.6
  3.13.5
  3.13.4
  3.13.3
  3.13.2
  3.13.1
  3.13.0
  3.10.7
  3.10.6
  3.10.5
  3.10.4
✓ 3.10.3
  3.10.2
  3.10.1
  3.10.0
```

This will install and cache the corresponding revision of Flutter on your machine and switch to using that version as the default for all subsequent `shorebird` commands.

## Support Matrix

At this time, not all functionality is supported for each Flutter version. Refer to the following table for the status of each feature across Flutter versions:

|                             | 3.10.0 | 3.10.1 | 3.10.2 | 3.10.3 | 3.10.4 | 3.10.5 | 3.10.6 | 3.10.7 | 3.13.0 | 3.13.1 | 3.13.2 | 3.13.3 | 3.13.4 | 3.13.5 | 3.13.6 |
| --------------------------- | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: | :----: |
| Android                     |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |
| iOS                         |   ✗    |   ✗    |   ✗    |   ✗    |   ✗    |   ✗    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |
| package:shorebird_code_push |   ✗    |   ✗    |   ✗    |   ✗    |   ✗    |   ✗    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |
| Flavors                     |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |
| Add to App                  |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |   ✓    |

:::info
We are working bringing all functionality to all currently supported Flutter versions. If there are older versions of Flutter which you need Shorebird to support, please [let us know](https://github.com/shorebirdtech/shorebird/issues/new/choose).
:::
