---
title: Sign in from GitHub Actions without a stored key
date: 2026-10-16
version: 1.6.129
area: CLI
type: New
docLink:
  label: Sign in with OIDC instead of a stored key
  href: /code-push/ci/github/#sign-in-with-oidc-instead-of-a-stored-key
---

On GitHub Actions, the CLI can now sign in as a service account with the OIDC
token GitHub issues to each job, so there's no `SHOREBIRD_TOKEN` secret to leak
or rotate.

- Add a trust rule to a service account naming the repository, the workflow
  file, and optionally a GitHub environment and a ref pattern. Only jobs that
  match sign in.
- In the workflow, grant the job `id-token: write` and set
  `SHOREBIRD_PROJECT_ID`.
- Adding a trust rule needs a Business or Enterprise plan. Existing rules keep
  working after a downgrade.
- When `SHOREBIRD_TOKEN` is set, the CLI uses it instead, so remove the secret
  once the workflow signs in with a trust rule.
- Each sign-in is recorded in the audit log as `service_account.sign_in`, with
  the run it came from.
