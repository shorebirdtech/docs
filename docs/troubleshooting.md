---
sidebar_position: 11
title: 🛠️ Troubleshooting
description: Fixes for common Shorebird issues
---

# 🛠️ Troubleshooting

Find help for issues with Shorebird.

## I created a patch, but it's not showing up in my app

There are several reasons this might be happening. Common causes are:

### The app you're running on your device/emulator was not built using one of the `shorebird release` commands.

#### How to tell if this is the problem

You can check this by checking your device logs for output from Shorebird. If
you don't see anything like `Starting Shorebird update` or `Sending patch check
request`, you are not running a Shorebird-built app.

To check your device logs, run `adb logcat` in your terminal. You can filter the
output to only show Flutter logs by running `adb logcat | grep flutter`.

#### How to fix it

Create a release using `shorebird release android --artifact=apk` commands and
install the apk produced by that command on your device/emulator. When running
this apk, you should see Shorebird logs in your device logs.

### The patch was created for a different release version than the one running on your device/emulator.

Patches are only compatible with the release version they were created for. If
you create a patch for version `1.0.0+1`, it will not work on version `1.0.0+2`.

#### How to tell if this is the problem

You will see `Shorebird updater: no active patch` in your device logs.

#### How to fix it

Ensure that the version of your app on your device/emulator matches the version
of the patch you created. You can see what release version your app is running
by looking in the device logs for:

```
Sending patch check request: PatchCheckRequest {
  app_id: "<your app id>",
  channel: "stable",
  release_version: "1.0.3+16", <-- this is the release version
  patch_number: <some patch number>,
  platform: "android",
  arch: "aarch64"
}
```

Only patches created for this release version will be compatible with your app.

## I installed Shorebird, and now I can't run my app in VS Code

If you see error output like the following when using the Run or Debug button in
VS Code:

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugAarMetadata'.
> Could not resolve all files for configuration ':app:debugRuntimeClasspath'.
   > Could not find io.flutter:arm64_v8a_debug:1.0.0-4a5e8142f3e7368a48e4f6151cb7b1a684d6dd83.
     Searched in the following locations:
```

It's possible that VS Code is incorrectly using Shorebird's version of Flutter
instead of the Flutter on your path (see
https://github.com/Dart-Code/Dart-Code/issues/4607). You can fix this by
explicitly providing VS Code with the path to your Flutter installation. In your
`settings.json` file, add the line:

```json
"dart.flutterSdkPath": "/path/to/flutter"
```

Where "/path/to/flutter" is the path to your Flutter installation. You can get
this by running `which flutter` in your terminal (or `where.exe flutter` on
Windows) and removing the `/bin/flutter` from the end of that path.

## Could not find an option named "dart define" when using the `--` separator

Powershell handles the `--` separator differently than other shells (see
[this StackOverflow answer](https://stackoverflow.com/a/15788023) for more
info). To work around this, you can quote the `--` separator. For example:

```sh
shorebird release android '--' --dart-define=foo=bar
```

## Shorebird fails to install

There are a number of reasons this might happen. Common causes are:

### I see a message saying that `git stat` failed because a file was too long

This can happen on Windows due to Windows' limit of 260 characters for a filename.

You can fix this by running:

```sh
git config --system core.longpaths true
```

You may need to run this as an administrator, and you will need to restart your
terminal after running this command.

## My iOS build number increments when I try to make a release or patch

This is likely because you are providing an export options .plist file that
sets `manageAppVersionAndBuildNumber` to true. This is incompatible with
Shorebird because Shorebird requires that you maintain control over your app's
version and build numbers in order to target patches at specific releases. You
can fix this problem by either setting `manageAppVersionAndBuildNumber` to false
or removing the value from your export options .plist file.

## Have a problem that's not addressed here?

We're happy to help on [Discord](https://discord.gg/shorebird)!
