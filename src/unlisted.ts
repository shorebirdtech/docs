// Pages that are reachable only by their direct URL. They are kept out of the
// sidebar and Pagefind (via their own frontmatter), and out of the sitemap, the
// `llms*.txt` bundles, and the agent-facing `.md` routes (via this list), so
// nothing advertises them.
//
// Values are content collection entry IDs, which are also the page's URL path:
// the file path under `src/content/docs/` without its extension, and without a
// trailing `/index` (`zap.mdx` -> `zap`, `foo/index.mdx` -> `foo`).
export const unlistedPages: readonly string[] = ['zap'];
