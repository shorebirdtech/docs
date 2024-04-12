---
sidebar_position: 8
title: 🫸 Push to Deploy on GitHub
description: Configure automated Shorebird deployments via GitHub.
---

# 🫸 Push to Deploy on GitHub

:::info
We recommend reading the [GitHub Integration](/ci/github) instructions before diving into this guide.
:::

Push to Deploy is a very handy type of integration between your project repository and the CI
service that allows developers to automatically trigger deploys of your application just by
pushing to the project repository.

There are several ways of setting up a Push to Deploy workflow, and in many instances, how it is
set up will depending on how the git workflow of your project is structured, or which CI service
is used, among other factors.

This guide is a simple proposal for setting up a Push to Deploy workflow using GitHub Actions. It
is intentionally simple so that it can be easily adapted to different requirements and contexts.

## 🥅 Goal

We will be implementing an automation in a project that have the following goals:

- Any branches created off from `main` that starts with the prefix `release/` will trigger a
  release at Shorebird.
- Any additional commits on those branches will trigger patches.

## 📝 Prerequisites

Before anything, if you don't have a Shorebird account, be sure to create one at
[shorebird.dev](https://shorebird.dev) (Don't worry, it is free to start have a generous quota
that is way more than enough for this guide).

You will also need a GitHub account and a project repository created. If you don't have an account
yet, create one at [GitHub](https://github.com), and create a new repository, which for this guide
we will call `shorebird_push_to_deploy`.

## 🚀 Getting Started

First thing, lets create a new Flutter project simply by running:

```bash
flutter create shorebird_push_to_deploy
```

Be sure to initialize your project as a git repository:

```bash
cd shorebird_push_to_deploy
git init
git remote add origin <THE_URL_OF_YOUR_REPOSITORY>
```

Next we need to initialize shorebird in it! Check out the [Code Push Getting Started](/code_push/initialize) guide for more info.

## 🛠️ Setting up GitHub Actions

We provide a collection of official GitHub Actions to help you with the integration. For this guide
we will be using `shorebird-setup`, `shorebird-release` and `shorebird-patch`, you can learn more
about them at our [GitHub Integration Documentation](ci/github).

Create a new file at `.github/workflows/push_to_deploy_android.yml` with the following content:

```yaml
name: Shorebird Android

on:
  push:
    branches:
      - releases/*

env:
  SHOREBIRD_TOKEN: ${{ secrets.SHOREBIRD_TOKEN }}

jobs:
  push_to_deploy_android:
    defaults:
      run:
        shell: bash

    runs-on: ubuntu-latest

    steps:
      - name: 📚 Git Checkout
        uses: actions/checkout@v3

      - name: 🐦 Setup Shorebird
        uses: shorebirdtech/setup-shorebird@v1

      - name: 🚀 Shorebird Release
        if: ${{ github.event.created }}
        uses: shorebirdtech/shorebird-release@v0
        with:
          platform: android

      - name: 🚀 Shorebird Patch
        if: ${{ !github.event.created }}
        uses: shorebirdtech/shorebird-patch@v0
        with:
          platform: android
```

Let's take a closer look at the above workflow.
The workflow will be triggered whenever a push is made to a branch that starts with `releases/`.

It will then run the clone of the repository and setup the Shorebird CLI.

Next the workflow is divided into two conditional steps. If the push is the one that created the
branch, it will trigger a release. Otherwise it will trigger a patch.

:::note
The `SHOREBIRD_TOKEN` is used as an environment variable. This is a secret that
should be stored in your repository settings. If you have not already configured the secrets, check out the
[GitHub Integration Documentation](/ci/github) mentioned above.
:::

That's it! You should be able to push the changes to your repository and see the workflow
running in the actions tab of your repository.

Give it a try! Create a new branch called `releases/1.0.0` and push it to your repository:

```bash
$ git checkout -b releases/1.0.0
$ git push origin releases/1.0.0
```

That will trigger the action! Once the workflow finishes, check the [Shorebird console](https://console.shorebird.dev)
and you should see a new release for your app.

Next lets make the following change in our app:

```diff
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
-       primarySwatch: Colors.blue,
+       primarySwatch: Colors.green,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

And commit and push it!

```bash
$ git add .
$ git commit -m "Change primarySwatch to green"
$ git push origin releases/1.0.0
```

That will trigger the action again, but now a patch will be created 🎉.

## 🎬 Summary

As mentioned, the workflow presented here is just one way of setting up an automated push to deploy workflow.
Feel free to adapt it based on your teams needs and existing processes.

Some ways the workflow can be expanded are:

- Instead of directly committing to the branch after the release was made. Developers would land their
  changes and fixes on their main branch, and then `cherry-pick` it to the release branch!
- Both `shorebird-release` and `shorebird-patch` returns the version/patch-number created. The workflow
  could be expanded in order for tags to be created in the repository, using the version number returned
  allowing snapshots of the code to be easily identified.

See this workflow in action by checking out our [Time Shift App](https://github.com/shorebirdtech/time_shift).

Thank you for reading this guide! If you have any questions or suggestions, feel free to reach out
to us at our [Discord](https://discord.gg/shorebird).
