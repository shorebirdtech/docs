---
sidebar_position: 1
title: 📦 Install
description: Learn how to install Shorebird CLI on your machine.
---

# Installing Shorebird

To install the Shorebird CLI use the following script:

```
curl --proto '=https' --tlsv1.2 https://raw.githubusercontent.com/shorebirdtech/install/main/install.sh -sSf | sh
```

:::info
Installing Shorebird CLI requires having `git` installed and currently only supports Mac and Linux hosts.
:::

This installs shorebird into `~/.shorebird/bin` and adds it to your `PATH`. It also installs a copy of Flutter and Dart inside `~/.shorebird/bin/cache/flutter`. These versions are not intended to be used for development (yet). You can continue to use the versions of Flutter and Dart you already have installed.

:::info
The total installation is about 300mb.
:::

Once the installation has completed, you should have the `shorebird` command available:

```
$ shorebird
The shorebird command-line tool

Usage: shorebird <command> [arguments]

Global options:
-h, --help            Print this usage information.
-v, --version         Print the current version.
    --[no-]verbose    Noisy logging, including all shell commands executed.

Available commands:
  account        Manage your Shorebird account.
  apps           Manage your Shorebird apps.
  build          Build a new release of your application.
  cache          Manage the Shorebird cache.
  channels       Manage the channels for your Shorebird app.
  doctor         Show information about the installed tooling.
  init           Initialize Shorebird.
  login          Login as a new Shorebird user.
  logout         Logout of the current Shorebird user
  patch          Publish new patches for a specific release to Shorebird.
  release        Builds and submits your app to Shorebird.
  run            Run the Flutter application.
  subscription   Manage your Shorebird subscription.
  upgrade        Upgrade your copy of Shorebird.

Run "shorebird help <command>" for more information about a command.
```

Use the `shorebird doctor` command to ensure your environment is setup correctly:

```
shorebird doctor
```

```
$ shorebird doctor

Shorebird v0.0.8
Shorebird Engine • revision d470ae25d21f583abe128f7b838476afd5e45bde

✓ Shorebird is up-to-date (0.7s)
✓ Flutter install is correct (0.1s)
✓ AndroidManifest.xml files contain INTERNET permission (26ms)

No issues detected!
```
