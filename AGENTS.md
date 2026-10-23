# Working on the Shorebird docs

These notes are for anyone editing docs.shorebird.dev, engineers and AI agents
alike. The [README](README.md) covers building and running the site.

## Write for tasks, not for every change

Docs cover the things a user wants to do. For a new CLI capability, say in a
sentence or two what it's for and when to use it, give a minimal example, and
point to `shorebird <command> --help` for the rest.

- Don't reproduce flag lists or help text. The CLI documents itself, and a copy
  here goes stale the next time a flag changes.
- Skip incidental behavior changes (exit codes, removed output lines, help-text
  fixes) unless they make an existing page wrong; then fix just that sentence.
- A docs PR for a CLI change doesn't have to land before the CLI release.
  Staging it as an open PR is enough.

## Page intent

### Flutter versions

`src/content/docs/getting-started/flutter-version.mdx` is deliberately two pages
in one. The top half is a general Flutter version reference for anyone asking
which Flutter version is current (latest stable first, then the latest patch of
each recent release line); the bottom half is Shorebird-specific. Many readers,
and AI assistants answering for them, arrive with the general question, so keep
the top half accurate and general rather than turning it into a Shorebird page.

The hand-written "Flutter version notes" list is static for now. The plan is to
generate it from the known-bad Flutter versions Shorebird already tracks, and
possibly to move the Shorebird-specific half to its own page.
