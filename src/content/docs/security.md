---
title: Security
description: Security
---

Shorebird takes security very seriously. We take several steps to make sure that
we protect the data you give us, that only you can publish changes to your app,
and that the patches your users get are the same ones you created.

## Release Artifact Privacy

Your release artifacts (created by `shorebird release`) are hosted privately on
GCP and are not publicly visible. When they need to be downloaded by you (to run
`shorebird preview`, for example), we generate a signed URL that requires your
auth credentials and expires after a short period of time.

## Patch Integrity

The most common security question we get is: How do you verify that the patches
our users are downloading are the ones that I created and that they haven't been
tampered with?

We ensure the integrity of patches in several ways.

Over the air:

1. Patches are not full artifacts; rather, they are binary diffs. To create a
   patch, you need access to the release artifact, which is private.
2. When a patch is "inflated" (i.e., the binary diff is applied to the base
   release), we verify that the md5 hash of the _inflated_ patch matches what is
   in the patch check response.

On device:

1. When the app boots, we ensure that the inflated patch is the same size as it
   was when it was first inflated. If the size has changed, we will not attempt
   to boot it.
2. (Optional) you can opt in to patch signing. This involves including a private
   key with your release and signing your patches when you create them. If a
   patch is signed, we verify its signature before attempting to boot from it.
   This is the highest level of security for patches. Read more about it
   [here](/guides/patch-signing).

## Data privacy

Shorebird is committed to privacy and provides a high standard of privacy
protection to all our customers and their customers. We never collect data from
your customers, and only collect the data necessary from you to provide services
to you. We take care to protect your data that you entrust with us.

Read our [privacy policy](/privacy).

## Shorebird on the public cloud

While we do not offer SOC2, ISO 27001 certifications, Shorebird exclusively
relies on vendors who do. Shorebird explicitly does _not_ build its own servers
or data storage, relying only on public cloud vendors with rigorous security
such as CloudFlare and Google Cloud.

## Learn more

Read our [public security policies](https://handbook.shorebird.dev/security).

## Other questions?

Feel free to contact us at contact@shorebird.dev or reach out to us on Discord.
