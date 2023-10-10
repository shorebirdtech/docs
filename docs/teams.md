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

Permissions are internally stored per-app. Not all permissions are publicly
editable at this time, we plan to expose more controls soon. If you would
like to make changes to your app in the meantime, please do not
hesitate to reach out to contact@shorebird.dev.

### Collaborator (aka "Developer")

The Collaborator role can:

- Read app information
- View collaborators
- Create releases and patches
- View insights

Collaborators can be added and removed by any Admin, see below.

### Admin (automatically assigned to the account which created the app)

The Admin role can:

- Everything a Developer can do
- Create and Delete Apps
- Add and Remove Collaborator for an App

Admin permissions cannot currently be modified directly. Please email us
if you need to add/remove Admins from an app.

### Billing account (aka App Owner)

- Billing is tied to Owner
- Owner can be either a Developer or Admin, by default is an Admin

Owner can be changed by contacting us.

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
