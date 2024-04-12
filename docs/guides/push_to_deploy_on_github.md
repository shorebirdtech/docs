---
sidebar_position: 8
title: 🫸 Push to Deploy on GitHub
description: Configure automated Shorebird deployments via GitHub.
---

# 🫸 Push to Deploy on GitHub

:::info
We recommend reading the [Github Integration](/ci/github) instructions before diving into this guide.
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

 - Any branches spinned off from `main` that starts with the prefix `release/` will trigger a
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

Next we need to initialize shorebird in it! If you have doubts on how to do so, check the
[Code Push Getting Started](/code-push/initialize) guide.

## 🛠️ Setting up GitHub Actions

We provide a collection of official Github Actions to help you with the integration. For this guide
we will be using `shorebird-setup`, `shorebird-release` and `shorebird-patch`, you can check more
details about them at our [Github Integration Documentation](ci/github).

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

The content of this file is pretty straightforward. It defines a workflow that will be triggered
whenever a push is made to a branch that starts with `releases/`.

It will then run the clone of the repository and setup the Shorebird CLI.

Next the workflow is divided into two conditional steps. If the push is the one that created the
branch, it will trigger a release. Otherwise it will trigger a patch.

Note that the `SHOREBIRD_TOKEN` is being used as an environment variable. This is a secret that
should be stored in your repository settings. You might have done that already if you checked the
[GitHub Integration Documentation](/ci/github) mentioned above, but if not be sure to check it
and configure the authentication in the action for your Shorebird account.

If all went right, you should be able to push the changes to your repository and see the workflow
running at the Actions tab of your repository.

Give it a try! Create a new branch called `releases/1.0.0` and push it to your repository. Then
once the workflow finishes, check the Shorebird dashboard and you should see a new release there.

Next you can try pushing a new commit to the same branch and see a patch being created 🎉.

## 🎬 End Notes

Like mentined in the beginning, what we presented here is just one way of setting up a Push to Deploy
ideally the reader should adapt it to their own needs and context.

And what was presented here could also be expanded in many ways. For example:

 - Instead of directly commiting to the branch after the release was made. Developers would land their
changes and fixes on their main branch, and then `cherry-pick` it to the release branch!
 - Both `shorebird-release` and `shorebird-patch` returns the version/patch-number created. The workflow
could be expanded in order for tags to be created in the repository, using the version number returned
allowing snapshots of the code to be easily identified.
 - etc.

What was explained here is implemented in our [Time Shift App](https://github.com/shorebirdtech/time_shift).
If you want see an actual implementation, feel free to check it out!

Thank you for reading this guide! If you have any questions or suggestions, feel free to reach out
to us at our [Discord](https://discord.gg/shorebird).
