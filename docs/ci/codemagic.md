---
sidebar_position: 2
title: 🚀 Codemagic
description: Integrate Shorebird into your Codemagic workflow
---

# Codemagic Workflow Integration

This guide will help you integrate Shorebird into your Codemagic Workflow using the Codemagic Workflow Editor and YAML configuration.

## Prerequisites

✅ Shorebird CLI is installed on your machine

✅ You are logged into a paid account.

:::info
Refer to the [getting started](/) instructions for more information.
:::

## Quick Start

You can integrate Shorebird into your CI either using the Codemagic Workflow editor or using YAML.

## Authentication

Most Shorebird functionality, like creating releases and patches, requires being authenticated. In order to authenticate with Shorebird in CI, you will need to generate a CI token.

```sh
shorebird login:ci
```

You will be prompted to go through a similar OAuth Flow as when using `shorebird login`, however, `shorebird login:ci` will not store any credentials on your device. Instead, a Shorebird token will be generated for you to use in CI.

The output should look something like:

```sh
$ shorebird login:ci
The Shorebird CLI needs your authorization to manage apps, releases, and patches on your behalf.

In a browser, visit this URL to log in:

https://accounts.google.com/o/oauth2/v2/auth...

Waiting for your authorization...

🎉 Success! Use the following token to login on a CI server:

<SHOREBIRD_TOKEN>

Example:

export SHOREBIRD_TOKEN="$SHOREBIRD_TOKEN" && shorebird patch android
```

:::caution
The `SHOREBIRD_TOKEN` is a secret and should not be committed directly in your source code or shared publicly.
:::

Next, copy the generated `SHOREBIRD_TOKEN` and navigate to your Codemagic secrets via:

1. Go to "Environment Variables"
2. Enter as variable name `SHOREBIRD_TOKEN`
3. Paste the token into the variable value field
4. Select or create new group, like "shorebird"

### Codemagic Workflow Editor

1. Go to the "Environment variables" section of your application settings.

2. Add a new environment variable named `SHOREBIRD_TOKEN` and paste your token as the value.

3. Save the changes.

### Codemagic YAML

In the `codemagic.yaml` file, specify the `SHOREBIRD_TOKEN` under `environment`.

```yaml
workflows:
  shorebird-workflow:
    name: Shorebird Workflow
    environment:
      vars:
        SHOREBIRD_TOKEN: Encrypted($TOKEN)
    scripts:
      - name: Install Shorebird
        script: brew install shorebird
      - name: Use Shorebird
        script: shorebird patch android --force
```

:::caution
Use the Codemagic's encrypted variables feature for the `SHOREBIRD_TOKEN`. Never commit it in plain text.
:::

Replace `$TOKEN` with the encrypted value of your token. You can generate the encrypted value of your token using the Codemagic web app.

Now we can use the `SHOREBIRD_TOKEN` in our Codemagic workflow to perform authenticated functions such as creating patches 🎉
