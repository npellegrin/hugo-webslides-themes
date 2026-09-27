
<!-- : .wrap .aligncenter .size-80 bg=bg-primary -->

# hugo-webslides themes
{ .text-landing }

***
{ .text-symbols }

## One deck, seven skins

---

<!-- : .wrap .size-80 .frame bg=bg-primary -->

# Section title
{ .text-serif }

***
{ .text-symbols }

### {{< icon solid palette >}} Colors

Every color and font lives in one `theme-*.css` file.

### {{< icon solid ruler-combined >}} Layout

Spacing and structure live in `custom.css`, shared by all themes.

### {{< icon solid code >}} Code

Each theme ships with a matching syntax highlighting style.

{{< div >}}{{< /div >}}

---

<!-- : .wrap .size-80 .frame bg=bg-primary -->

## Chapter divider
{ .text-landing }

***
{ .text-symbols }

A short intro line under the chapter title.
{ .text-intro }

---

<!-- : .wrap .size-80 bg=bg-gradient-r -->

# Two columns

{{< div class="content-left" >}}

<!-- : .flexblock reasons -->

- **Left column:** a `.flexblock reasons` list with bold lead-ins.
- **Right column:** a code block, handy for ASCII diagrams.
- **Directive:** `bg=bg-gradient-r` on the first line of the slide.

{{< /div >}}

{{< div class="content-right" >}}

```bash
┌───────────────┐
│    Browser    │
└───────┬───────┘
        ▼
┌───────────────┐
│  Hugo output  │
│  • HTML       │
│  • theme CSS  │
└───────────────┘
```

{{< /div >}}

---

<!-- : .wrap .size-80 bg=bg-gradient-r -->

# Code highlighting

```python
def is_allowed(principal: dict, resource: dict) -> bool:
    """Owners and admins can read the document."""
    if "admin" in principal.get("roles", []):
        return True
    return resource["owner"] == principal["id"]
```

```javascript
permit(
  principal in Role::"admin",
  action == Action::"view",
  resource
);
```

---

<!-- : .wrap .size-80 bg=bg-gradient-r -->

# Subtitles and code

### A `.text-intro` subtitle
{ .text-intro }

```bash
hugo server --environment riso
```

### Another one, same slide
{ .text-intro }

```bash
hugo --environment terminal --minify
```

---

<!-- : .wrap .size-80 bg=bg-gradient-hi -->

# Timeline

<!-- : .flexblock steps -->

- {{< step "1. Write" >}} Markdown slides, split with `---`.{{< /step >}}
- {{< step "2. Pick a skin" >}} One Hugo environment per theme.{{< /step >}}
- {{< step "3. Present" >}} Static HTML, arrow keys to navigate.{{< /step >}}

---

<!-- : .wrap .size-80 bg=bg-gradient-v -->

# Numbered reasons

Intro text above the list.
{ .text-intro }

<!-- : .flexblock reasons -->

1. **First point** A numbered `.flexblock reasons` list.
2. **Second point** Lead-in in bold, explanation after.
3. **Third point** Works on `bg-gradient-v` too.

---

<!-- : .wrap .size-80 bg=bg-gradient-v -->

# Specs

<!-- : .flexblock specs -->

- ### Heading inside a spec

  Body text under the heading.

- ### Another spec

  Specs stack vertically with separators.

- ### A third one

  Last item has no separator.

---

<!-- : .wrap .size-80 bg=bg-gradient-vi -->

# Specs, bold variant

<!-- : .flexblock specs -->

- **Four themes** Navy, Aurora, Paper, Terminal
- **Three more** Riso, Unicorn, Infinite
- **Zero JavaScript** Pure CSS on top of WebSlides
- **One command** `hugo --environment <name>`

---

<!-- : .wrap .size-80 bg=bg-gradient-h -->

# Features

<!-- : .flexblock features -->

- **Horizontal gradient** Two feature cards on `bg-gradient-h`.
- **Short copy** Features read best with one or two lines each.

---

<!-- : .wrap .size-80 bg=bg-gradient-r -->

# Code with notes

```text
Theme       Highlight style
navy        monokai
terminal    native
riso        xcode
```

<!-- : .wrap -->

<!-- : .flexblock features -->

- A plain `text` code block works as a table.
- Feature cards below a code block, after a `.wrap` directive.

---

<!-- : .wrap .size-80 bg=bg-gradient-r -->

<blockquote>

**A quote block**

Themes restyle blockquotes too, including **bold passages** inside the quote.

<p><cite>https://webslides.tv</cite></p>
</blockquote>

---

<!-- : .wrap .aligncenter bg=bg-primary -->

## Centered statement

#### With a smaller line below.

---

<!-- : .wrap .aligncenter bg=bg-primary -->

# Thanks
{ .text-data }

### `.text-data` for the big word

---

<!-- : .wrap .size-80 .frame bg=bg-primary -->

## Source on GitHub
{ .text-landing }

***
{ .text-symbols }

[github.com/npellegrin/hugo-webslides-themes](https://github.com/npellegrin/hugo-webslides-themes)
{ .text-intro }
