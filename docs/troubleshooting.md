---
sidebar_position: 9
title: 🛠️ Troubleshooting
description: Fixes for common Shorebird issues
---

# 🛠️ Troubleshooting

Find help for issues with Shorebird.

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

## Have a problem that's not addressed here?

We're happy to help on [Discord](https://discord.gg/9hKJcWGcaB)!
