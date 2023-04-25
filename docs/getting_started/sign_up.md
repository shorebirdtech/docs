---
sidebar_position: 2
title: ✍️ Sign Up
description: Learn how to create a Shorebird account.
---

# Sign Up

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
⬆️ To upgrade your account, use: "shorebird account subscribe".

Enjoy! Please let us know via Discord if we can help.
```
