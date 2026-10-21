---
title: release and patch no longer take --confirm
date: 2026-10-17
version: 1.6.130
area: CLI
type: Changed
docLink:
  label: Non-interactive mode
  href: /code-push/ci/scripting/#non-interactive-mode
---

The hidden `--confirm` flag is gone from `shorebird release` and
`shorebird patch`. Neither command asks for confirmation before publishing.

- Passing `--confirm` is a usage error, with exit status 64.
- `--no-confirm` is still accepted and does nothing, so existing scripts keep
  working.
