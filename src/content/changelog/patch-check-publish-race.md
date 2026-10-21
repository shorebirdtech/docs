---
title: Patch checks keep up with new patches and app transfers
date: 2026-10-20
area: Code Push
type: Fixed
docLink:
  label: Transfer an app
  href: /account/orgs/#transfer-an-app
---

A patch check that ran while a patch was being published could keep answering
"no patch" until the next change. It now sees the new patch.

- An app transferred to another organization follows the new organization's
  patch limit right away, instead of the old one's for up to an hour.
