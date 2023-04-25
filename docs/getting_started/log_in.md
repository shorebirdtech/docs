---
sidebar_position: 3
title: 🔑 Log In
description: Learn how to login to an existing Shorebird account.
---

# Log In

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
