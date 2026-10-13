---
title: Approve each app that signs in as you
date: 2026-10-10
area: Console
type: Changed
---

Signing in from the CLI now stops at an approval page, as signing in from other
apps such as Claude Code already did. The redesigned page says which app is
asking, which account it signs in to, and what it gets. Choose Authorize to
continue or Cancel to refuse.

- Only the Console skips this page. Previously, signing in to the CLI through
  the browser didn't ask.
- CLIs older than 1.6.125 appear on the page as `An app on this computer`.
- The page shows where you'll be sent next and links to your Account page, where
  you can remove the app's access later.
- To approve a CLI sign-in with a code, type the code shown on your device. A
  link with the code already filled in isn't accepted.
- Use a different account from the same page if you're signed in to the wrong
  one.
