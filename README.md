# Shorebird Docs 🐦📚

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
Keys**. Without the key the page renders a fallback message instead of
crashing.

In CI the key is read from the `LINEAR_API_KEY` repository secret.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read
[the Astro documentation](https://docs.astro.build), or jump into the
[Astro Discord server](https://astro.build/chat).
