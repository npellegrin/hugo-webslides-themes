# hugo-webslides themes

Seven color/typography themes for [hugo-webslides](https://github.com/RCJacH/hugo-webslides),
with one demo deck that shows every component they style.

Themes: `navy`, `aurora`, `paper`, `terminal`, `riso`, `unicorn`, `infinite`.

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
```

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
