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
command line tool. To add a collaborator, run:

```bash
shorebird collaborators add --email <email>
```

`--app-id` is optional if you are in a directory with a Shorebird app it
will infer the app ID from `shorebird.yaml`. Otherwise you can specify
`--app-id <app-id>`.

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
https://github.com/shorebirdtech/shorebird/issues/739
