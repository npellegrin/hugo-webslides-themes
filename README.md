# hugo-webslides themes

Seven color/typography themes for [hugo-webslides](https://github.com/RCJacH/hugo-webslides),
with one demo deck that shows every component they style.

## Live demos

All themes are deployed to GitHub Pages, one subfolder each
(index: <https://npellegrin.github.io/hugo-webslides-themes/>):

- [navy](https://npellegrin.github.io/hugo-webslides-themes/navy/)
- [aurora](https://npellegrin.github.io/hugo-webslides-themes/aurora/)
- [paper](https://npellegrin.github.io/hugo-webslides-themes/paper/)
- [terminal](https://npellegrin.github.io/hugo-webslides-themes/terminal/)
- [riso](https://npellegrin.github.io/hugo-webslides-themes/riso/)
- [unicorn](https://npellegrin.github.io/hugo-webslides-themes/unicorn/)
- [infinite](https://npellegrin.github.io/hugo-webslides-themes/infinite/)

## Layout

```
content/_index.md          demo deck
static/css/custom.css      layout, shared by all themes
static/css/theme-*.css     one file per theme: colors, typography
config/_default/hugo.toml  base config, default theme (navy)
config/<theme>/hugo.toml   one Hugo environment per theme
themes/hugo-webslides      vendored theme
```

Each `config/<theme>/hugo.toml` sets both `customcss` and
`markup.highlight.style`, so the stylesheet and the code colors stay in sync.

## Usage

```bash
hugo server --environment riso     # live preview of one theme
scripts/build.sh                   # every theme into public/<theme>/ + index
scripts/build.sh riso terminal     # only some themes
BASE_URL=https://example.org/sub/ scripts/build.sh   # other site root
```

## Deployment

`.github/workflows/pages.yml` runs `scripts/build.sh` on every push to `main`
and publishes `public/` to GitHub Pages. Enable it once in the repository
settings: Pages, Source: "GitHub Actions".

## Use a theme in your own deck

1. Copy `static/css/custom.css` and the `theme-<name>.css` you want.
2. Add them to your config:

   ```toml
   [params]
   customcss = ["css/theme-<name>.css"]

   [markup.highlight]
   style = "<matching style>"   # see config/<name>/hugo.toml
   ```

3. Keep `markup.goldmark.parser.attribute.block = true` and
   `markup.goldmark.renderer.unsafe = true`: the slides rely on
   `{ .class }` attributes and inline HTML.

## New theme

Copy a `theme-*.css`, then add `config/<name>/hugo.toml`.
