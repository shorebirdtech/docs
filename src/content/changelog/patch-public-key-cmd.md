---
title: Signed patches honor --public-key-cmd
date: 2026-10-11
version: 1.6.128
area: CLI
type: Fixed
docLink:
  label: Create a signed patch
  href: /code-push/guides/patch-signing/#create-a-signed-patch
---

`shorebird patch` now embeds the public key from `--public-key-cmd` in the patch
build, as `shorebird release` already did.

- Previously only `--public-key-path` reached the patch build. Signing itself
  still worked.
- The `--public-key-cmd` command now runs once per `shorebird patch` or
  `shorebird release` run, instead of once per architecture or platform, so a
  command that prompts, such as for two-factor authentication, prompts once.
