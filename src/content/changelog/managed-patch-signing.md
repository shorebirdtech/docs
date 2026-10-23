---
title: New releases are signed by default
date: 2026-10-26
version: 1.6.132
area: Code Push
type: New
docLink:
  label: Managed signing
  href: /code-push/guides/patch-signing/#managed-signing
---

New releases are now signed by default with a key Shorebird manages for your
organization, so someone tampering with your users' network can't push code to
your app. Update the CLI and make a new release to turn it on.

- `shorebird release` builds your organization's public key into the release,
  and Shorebird signs every patch to it. Patching works as before, with no key
  flags.
- You don't need to change your Flutter version.
- The private key is kept in Google Cloud KMS and never leaves it. To keep
  Shorebird out of your trust base, sign with your own key instead, with
  `--public-key-path` or `--public-key-cmd`.
- `--no-patch-signing` releases without signing, which isn't recommended.
- Releases made before this without your own key stay unsigned, and patches to
  them keep installing.
- A CLI older than 1.6.132 can't patch a release signed this way; run
  `shorebird upgrade`.

```sh
shorebird upgrade
shorebird release android
```
