---
# Copy this file to a new name in this folder. The file name becomes the
# entry's permalink (/changelog/#<name>), so make it short, lowercase, and
# descriptive, like `patches-rollback-command.md`. Files starting with `_` are
# not published.
#
# Every field below is checked when the site builds, and a mistake fails the
# build with a message naming this file and the field.

# A short headline, in sentence case.
title: Roll patches back from the CLI
# The day the release shipped, as YYYY-MM-DD with no quotes.
date: 2026-08-28
# The Shorebird CLI release that shipped the change, without a "v". Required
# for CLI and Flutter changes. Delete this line for a change that didn't ship in
# the CLI, like a Console, API, or server-side Code Push change.
version: 1.6.120
# One of: Code Push, CLI, Console, API, Flutter
area: CLI
# One of: New, Fixed, Changed, Deprecated
type: New
# Optional: the docs page to read next. `href` must be a docs page on this
# site, and a #fragment must match a heading on it. Delete both lines if
# there's no page for it.
docLink:
  label: Roll back a patch
  href: /code-push/rollback/
---

The first paragraph is the summary, which is always shown. Keep it to one or two
sentences. Wrap commands and flags in backticks, like
`shorebird patches rollback`.

- Then a bulleted list with the details, shown when the entry is expanded.
- Each bullet can wrap onto more lines, as long as they are indented.

```sh
shorebird patches rollback --release-version 1.0.0+1 --patch-number 1
```

<!--
The code block is optional: one command per line, with no leading `$`. Nothing
else is allowed in the body besides the summary, the bullets, the code block,
and comments like this one.
-->
