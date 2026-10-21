---
title: SAML sign-in refuses SHA-1
date: 2026-10-14
area: Console
type: Changed
docLink:
  label: Troubleshooting
  href: /enterprise/saml/#troubleshooting
---

SAML responses signed or digested with SHA-1 are now refused.

- Sign-in fails with "SSO login failed". Configure your identity provider to
  sign with RSA-SHA256 and digest with SHA-256.
