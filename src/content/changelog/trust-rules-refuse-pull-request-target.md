---
title: Trust rules refuse pull_request_target runs
date: 2026-10-23
area: API
type: Changed
docLink:
  label: What a rule matches
  href: /account/trust-rules/#what-a-rule-matches
---

GitHub Actions jobs started by `pull_request_target` can no longer sign in with
a trust rule, because anyone who opens a pull request can start one, and it runs
with your default branch's ref.

- The sign-in is refused before any rule is checked, with the message
  `pull_request_target runs cannot exchange tokens`.
- Run Shorebird from a workflow started by `push`, `release`, or
  `workflow_dispatch` instead.
