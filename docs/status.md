---
sidebar_position: 8
title: 👷 Status
description: Status of the Shorebird project.
---

## Stable

Shorebird is available on Android and iOS, with 1000s of apps shipping with
Shorebird on the App Store and Play Store.

## Link Percentage (iOS)

As part of complying with the the App Store guidelines, Shorebird uses a
interpreter on iOS to run any changed Dart code in your patch. This interpreter
is about 100x slower than running on the CPU. To make patches run fast,
Shorebird has modified Dart to make it possible to _only_ run changed code on
the interpreter and run any unchanged code on the CPU.

Most of the time this works very well, and we're able to run 99% of code on the
CPU. However there are still a few types of changes which can confuse our
build system and cause more code to run on the interpreter than necessary.

The program that decides which code runs on the CPU vs the interpreter is called
the "linker" and we call this percentage the "link percentage".

Any percentage below 50% might cause your app to run slower than normal, which
is why you saw a warning and followed to this link.

Known linker issues include:
- [Adding or removing a class can affect link percentage](https://github.com/shorebirdtech/shorebird/issues/1825)

If your app has reported an unexpectedly low link percentage, please let us
know, we'd love to help. You can report an issue here:
https://github.com/shorebirdtech/shorebird/issues
Or reach us via Discord:
https://discord.gg/shorebird.
