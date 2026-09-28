// Starlight follows every heading with `<a class="sl-anchor-link">`, which
// holds a link icon and screen-reader text ("Section titled …"). Converted to
// Markdown, that anchor becomes a stray link line under every heading, so the
// agent-facing outputs (the `.md` routes and `llms*.txt`) strip it.
export const HEADING_ANCHOR_LINK_SELECTOR = 'a.sl-anchor-link';
