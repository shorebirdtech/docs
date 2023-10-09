---
sidebar_position: 4
title: 🐦 Flutter Version
description: How to manage your Shorebird Flutter version
---

# Flutter Version Management

When Shorebird CLI is installed, it pulls down the latest stable version of Shorebird's Flutter.
In this section, we'll take a look at how to list and change the Flutter version used by Shorebird CLI.

## Supported Flutter Versions

Shorebird currently focuses our efforts on support for the latest stable version
of Flutter. When we make changes to Shorebird we do not currently backport those
changes to previous release of Flutter.

While we support creating a release with older versions of Flutter (back to 3.10.0), a release created with one of these versions may not contain all of the most recent Shorebird features. Because of this, we recommend using the latest stable version of Flutter whenever possible.

## List Flutter Versions

To list all Flutter versions Shorebird has published, use the
`shorebird flutter versions list` command:

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

To switch to a different Flutter version, use the
`shorebird flutter versions use <version>` command:

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

This will install and cache the corresponding revision of Flutter on your
machine and switch to using that version as the default for all subsequent
`shorebird` commands.

## Supported Feature Matrix

At this time, not all functionality is supported for each Flutter version. Refer
to the following table for the status of each feature across Flutter versions:

| Version | Android | iOS | package:shorebird_code_push |
| ------- | :-----: | :-: | :-------------------------: |
| 3.13.6  |    ✓    |  ✓  |              ✓              |
| 3.13.5  |    ✓    |  ✓  |              ✓              |
| 3.13.4  |    ✓    |  ✓  |              ✓              |
| 3.13.3  |    ✓    |  ✓  |              ✓              |
| 3.13.2  |    ✓    |  ✓  |              ✓              |
| 3.13.1  |    ✓    |  ✓  |              ✓              |
| 3.13.0  |    ✓    |  ✓  |              ✓              |
| 3.10.7  |    ✓    |  ✓  |              ✓              |
| 3.10.6  |    ✓    |  ✓  |              ✓              |
| 3.10.5  |    ✓    |  ✗  |              ✗              |
| 3.10.4  |    ✓    |  ✗  |              ✗              |
| 3.10.3  |    ✓    |  ✗  |              ✗              |
| 3.10.2  |    ✓    |  ✗  |              ✗              |
| 3.10.1  |    ✓    |  ✗  |              ✗              |
| 3.10.0  |    ✓    |  ✗  |              ✗              |

:::info
We would like Shorebird to support to as many Flutter versions as possible. If
there are older versions of Flutter which you need Shorebird to support, please
[let us know](https://github.com/shorebirdtech/shorebird/issues/1100).
:::
