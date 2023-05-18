---
sidebar_position: 7
title: 🛑 Uninstall
description: How to disable Shorebird.
---

_First, do no harm_

Shorebird is designed to be a drop-in replacement for stock Flutter,
and can be disabled at any time with no effect on your users.

## Thank you

Thank you for trying Shorebird. If you'd like to continue using Shorebird
but have questions or concerns, please reach out to us on Discord or
via email at [contact@shorebird.dev](mailto:contact@shorebird.dev).

Otherwise, we hope you'll consider trying Shorebird again in the future.

## Canceling your subscription

To cancel your subscription:

`shorebird account cancel`

This will cancel your subscription. Your access (and updates for your users)
will continue until the end of the current billing period. After which
shorebird will not longer send updates to your apps, but your apps will
continue function otherwise normally.

## Uninstalling Shorebird

Building with `shorebird build` will include Shorebird code push in your app.
Building with `flutter build --release` will not include Shorebird in your app.
At any time you can simply drop back to `flutter build` and things will work
as they did before.

You can remove `shorebird` from your path by removing it from your `.bashrc` or
`.zshrc` and deleting the `.shorebird` directory located in `~/.shorebird`.
