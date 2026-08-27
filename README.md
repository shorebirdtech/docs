# Shorebird docs 🐦📚

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Home of the [docs.shorebird.dev](https://docs.shorebird.dev) site.

## 🗺️ Roadmap page

The `/roadmap` page fetches live data from Linear at build time. To see real
data locally, export your Linear API key before running the dev server:

```sh
export LINEAR_API_KEY=your_key_here
npm run dev
```

You can create a personal API key at **Linear → Settings → API → Personal API
Keys**. Without the key the page renders a fallback message instead of crashing.

In CI the key is read from the `LINEAR_API_KEY` repository secret.

## 🐦 Flutter release data

The table on
[Flutter Versions](https://docs.shorebird.dev/getting-started/flutter-version/)
is generated from Flutter's public release feeds into
`src/data/flutter-releases.json`. Regenerate it with:

```sh
npm run update-flutter-releases
```

The `flutter-releases` workflow runs the same script daily and fails when the
committed file has fallen behind Flutter's stable channel, so a new release
shows up as a red build rather than a stale page.

The "Highlights" column is hand-written in `src/data/release-highlights.ts`,
summarized from Flutter's release announcements. A new release line needs an
entry there; without one the table falls back to a plain release-notes link.

Both are separate from `src/consts.ts`, which tracks the Flutter version
_Shorebird_ ships and is still bumped manually.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                           | Action                                           |
| :-------------------------------- | :----------------------------------------------- |
| `npm install`                     | Installs dependencies                            |
| `npm run dev`                     | Starts local dev server at `localhost:4321`      |
| `npm run build`                   | Build your production site to `./dist/`          |
| `npm run preview`                 | Preview your build locally, before deploying     |
| `npm run update-flutter-releases` | Refresh `src/data/flutter-releases.json`         |
| `npm run astro ...`               | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help`         | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read
[the Astro documentation](https://docs.astro.build), or jump into the
[Astro Discord server](https://astro.build/chat).
