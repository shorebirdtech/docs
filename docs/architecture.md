---
sidebar_position: 6
title: 🏛️ Architecture
description: How Shorebird works.
---

## Overview

Shorebird is a set of tools that allow you to build and deploy new versions of
your Flutter app directly to your users' devices.

Shorebird consists of 3 major parts:

- A command line tool that you use to build and deploy your app.
- A modified Flutter engine that you include in your app.
- Servers that host patches for your app.

## `shorebird` tool

The `shorebird` tool is documented extensively elsewhere. Most of the build
logic is just wrapping the `flutter` tool and it also adds a few commands to
interface with Shorebird's servers.

## A modified Flutter engine

Code push requires technical changes to the underlying Flutter engine. To make
those changes required forking Flutter.

We had to fork 3 Flutter repos to make Shorebird work:

### flutter/engine

The Flutter engine is the C++ code that runs on the device. It is responsible
for rendering the UI, handling input, and communicating with the host.

We forked this code to add the
[Shorebird updater](https://github.com/shorebirdtech/updater), which lets the
Flutter engine load new code from Shorebird's servers.

At time of writing, Shorebird's fork is based on Flutter 3.7.12. You can see
our engine changes here:
https://github.com/flutter/engine/compare/3.7.12...shorebirdtech:engine:stable_codepush

### flutter/flutter

The flutter/flutter repo contains the Dart code that runs on the device as well
as the `flutter` tool that is used to build and run Flutter apps.

We initially did not fork this code. And still don't really want to fork
this code, but in order to deliver a modified engine without affecting other
Flutter installations, we needed to be able to change the _version_ of the
engine that the `flutter` tool downloads.

Our one fork is to change bin/internal/engine.version to point to our
engine version. You can see our changes here:
https://github.com/flutter/flutter/compare/3.7.8...shorebirdtech:flutter:stable_codepush

### flutter/buildroot

The buildroot repo contains the build scripts that are used to build the
Flutter engine for various platforms. It's separate from flutter/engine in
order to share code and configuration with the Fuchsia build system.

We also didn't want to fork this code. However we need to for now in order
to integrate our updater code. Our updater code:
https://github.com/shorebirdtech/updater
is a Rust library which we link into the engine. The way we do that is via
a C-API on a static library (libupdater.a). The default flags for linking
for the Flutter engine hide all symbols from linked static libraries. We
need to be able to expose the shorebird\_\* symbols from libupdater.a up through
FFI to the Dart code. We did that my making one change to buildroot and then
a second change to the engine to place the symbols on the allow-list.

Our one change:
https://github.com/shorebirdtech/buildroot/commit/7383548fa2306b5d53979ac5e9d176b35258811b

## Vendoring our fork

When you install Shorebird, it installs Flutter and Dart from our fork. These
are currently not exposed on the user's path, rather just private copies
that Shorebird will use when building your app.

This was necessary to avoid conflicts with other Flutter installations on the
user's machine. Specifically, the way that Flutter downloads artifacts is
based on the version of the engine. If we were to use the same version of the
engine as the user's Flutter installation, then we would overwrite the user's
engine artifacts.

We deliver our artifacts to this fork of Flutter with two ways. First is we
change the version of the engine in the `flutter` tool. Second is we pass
FLUTTER_STORAGE_BASE_URL set to download.shorebird.dev (instead of
download.flutter.io) when calling our vended copy of the `flutter` tool.

Currently this means `shorebird` will not work in an environment where the
user needs to use FLUTTER_STORAGE_BASE_URL to download Flutter artifacts
from a private mirror (e.g. a corporate network or China).
https://github.com/shorebirdtech/shorebird/issues/237

## Serving our forked binaries

We also use a custom server to handle requests from `flutter` for our
(modified) engine. You can see that server here:
https://github.com/shorebirdtech/shorebird/tree/main/packages/artifact_proxy

Our "artifact_proxy" knows how to serve the modified binaries from our
Google Storage bucket, as well as how to serve unmodified binaries for all
parts of Flutter we didn't have to modify from
Google's Flutter Google storage bucket.
