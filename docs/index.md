---
sidebar_position: 1
title: 🚀 Getting Started
description: The official documentation site for Shorebird.
---

# Getting Started

This guide will walk you through [installing Shorebird](#install-📦), [creating an account](#sign-up-✍️), and logging in.

:::info
Currently all interactions with Shorebird are done via the `shorebird` command
line tool. Shorebird does not yet have a web interface.
:::

## Install 📦

To install the Shorebird command line interface (CLI):

## Mac/Linux

```bash
curl --proto '=https' --tlsv1.2 https://raw.githubusercontent.com/shorebirdtech/install/main/install.sh -sSf | bash
```

## Windows

```powershell
powershell -exec bypass -c "(New-Object Net.WebClient).Proxy.Credentials=[Net.CredentialCache]::DefaultNetworkCredentials;iwr -UseBasicParsing 'https://raw.githubusercontent.com/shorebirdtech/install/main/install.ps1'|iex"
```

:::info
Installing Shorebird CLI requires `git`.
:::

This installs `shorebird` into `~/.shorebird/bin` and adds it to your `PATH`. It
also installs a copy of Flutter and Dart inside
`~/.shorebird/bin/cache/flutter`. The copy of Flutter is slightly modified to
add Shorebird code push and is not intended to be added to your `PATH`. You can
continue to use the versions of Flutter and Dart you already have installed.

:::info
The total installation is about 300mb.
:::

Once the installation has completed, `shorebird` should be available in your
terminal:

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

You can use the `shorebird doctor` to ensure things are set-up correctly:

```
shorebird doctor
```

Example output:

```
$ shorebird doctor

Shorebird v0.0.8
Shorebird Engine • revision d470ae25d21f583abe128f7b838476afd5e45bde

✓ Shorebird is up-to-date (0.7s)
✓ Flutter install is correct (0.1s)
✓ AndroidManifest.xml files contain INTERNET permission (26ms)

No issues detected!
```

## Sign Up ✍️

Once you have Shorebird installed, you need to create a Shorebird account. To
create a Shorebird account, use the `shorebird account create` command:

```
shorebird account create
```

:::info
Currently Shorebird uses Google OAuth2 to authenticate users. If you need other
auth methods, please [let us
know](https://github.com/shorebirdtech/shorebird/issues/335).
:::

Example output:

```
$ shorebird account create
Shorebird currently requires a Google account for authentication. If you'd like to use a different kind of auth, please let us know: https://github.com/shorebirdtech/shorebird/issues/335.

Follow the link below to authenticate:

https://accounts.google.com/o/oauth2/v2/auth...

Waiting for your authorization...
Tell us your name to finish creating your account: Jane Doe

🎉 Welcome to Shorebird, Jane Doe!
🔑 Credentials are stored in ./path/to/credentials.json.
🚪 To logout, use: "shorebird logout".
⬆️ To upgrade your account, use: "shorebird account upgrade".

Enjoy! Please let us know via Discord if we can help.
```

## Log In 🔑

If you just created a Shorebird account, you can skip this section, as you
are already logged in from `shorebird account create`.

If you have an existing Shorebird account, you can login using the
`shorebird login` command:

```
shorebird login
```

Example output:

```
$ shorebird login
The Shorebird CLI needs your authorization to manage apps, releases, and patches
on your behalf.

In a browser, visit this URL to log in:

https://accounts.google.com/o/oauth2/v2/auth...

Waiting for your authorization...

🎉 Welcome to Shorebird! You are now logged in as <email>.

🔑 Credentials are stored in ./path/to/credentials.json.
🚪 To logout use: "shorebird logout".
```

## Connect on Discord 🤝

Shorebird has an active Discord where we're happy to help you:
https://discord.gg/shorebird

We also offer a private support channel for paying customers. We don't yet have
an automated way to add you to the channel, so please message a member of our
team on Discord and we'll happily add you to the customer support channel.
https://github.com/shorebirdtech/shorebird/issues/308
