---
sidebar_position: 4
title: 👥 Teams
description: Working with a team of developers
---

# Teams

Shorebird Teams tier and higher allows adding an unlimited number of
collaborators to an app. Shorebire free "Hobby" users can upgrade
to the Teams tier to add collaborators via a link in the
[Shorebird console](https://console.shorebird.dev).

## Permissions

Each app has an owner, who is the person who created the app. The owner can
invite collaborators to the app, and can remove collaborators from the app.

Collaborators can publish patches. They cannot delete the app, or add or
remove collaborators.

## Adding a Collaborator

Currently collaborators must be added and removed using the Shorebird
command line tool. We intend to add support for adding and removing
collaborators via the Shorebird console in the future.
<https://github.com/shorebirdtech/shorebird/issues/1221>

To add a collaborator, run:

```bash
shorebird collaborators add --email <email>
```

`--app-id` is optional if you are in a directory with a Shorebird app it
will infer the app ID from `shorebird.yaml`. Otherwise you can specify
`--app-id <app-id>`.

Collaborators must already have created a Shorebird account with the email
address you are adding. They can do so by loading the Shorebird console
and clicking "Continue with Google".

We intend to add the ability to invite collaborators via email in the future.
<https://github.com/shorebirdtech/shorebird/issues/1221>

## Removing a Collaborator

To remove a collaborator, run:

```bash
shorebird collaborators remove --email <email>
```

## Sharing Multiple Apps

Each app maintains a separate list of collaborators. If you need to share
multiple apps with a team, you will need to add each app separately. If this
isn't working for you, please let us know and we're happy to look at adding
support for sharing groups of apps:
<https://github.com/shorebirdtech/shorebird/issues/739>

## Transferring Ownership

We do not currently have an automated way to transfer ownership of an app.
However you're welcome to [contact us](mailto:contact@shorebird.dev) and we
will be happy to help you transfer ownership of an app.

<https://github.com/shorebirdtech/shorebird/issues/1225>
