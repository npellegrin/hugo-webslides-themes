#!/usr/bin/env node
// Captures a few slides of every theme into docs/screenshots/<theme>-<slide>.jpg,
// then rewrites the README gallery between the gallery markers.
// Usage: npm run screenshots [-- theme...]
// Env: SLIDES="1,4,5,11" (slide numbers), SKIP_BUILD=1 (reuse public/).

import { execFileSync } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const PUBLIC = join(ROOT, "public");
const OUT = join(ROOT, "docs/screenshots");
const SLIDES = (process.env.SLIDES ?? "1,4,5,11").split(",").map(Number);
const VIEWPORT = { width: 1280, height: 720 };
const DEMO_URL = "https://npellegrin.github.io/hugo-webslides-themes/";

const allThemes = readdirSync(join(ROOT, "config"), { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "_default")
  .map((d) => d.name)
  .sort();
const themes = process.argv.length > 2 ? process.argv.slice(2) : allThemes;

if (!process.env.SKIP_BUILD) {
  execFileSync(join(ROOT, "scripts/build.sh"), themes, { cwd: ROOT, stdio: "inherit" });
}

const TYPES = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
};

// Minimal static server for public/, so absolute URLs ("/<theme>/css/...") resolve.
const server = createServer((req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  let file = join(PUBLIC, path);
  if (!file.startsWith(PUBLIC)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${server.address().port}`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: VIEWPORT });
  for (const theme of themes) {
    for (const slide of SLIDES) {
      // Fresh load per slide: WebSlides reads the #slide=N hash on startup.
      await page.goto(`${base}/${theme}/#slide=${slide}`, { waitUntil: "networkidle" });
      await page.addStyleTag({
        content: "*,*::before,*::after{animation:none!important;transition:none!important}",
      });
      await page.evaluate(() => document.fonts.ready);
      const file = join(OUT, `${theme}-${slide}.jpg`);
      await page.screenshot({ path: file, type: "jpeg", quality: 85 });
      console.log(file.slice(ROOT.length + 1));
    }
  }
} finally {
  await browser.close();
  server.close();
}

// The gallery always lists every theme, so a partial run keeps the others.
const gallery = allThemes.map((theme) => [
  `### [${theme}](${DEMO_URL}${theme}/)`,
  "",
  "<p>",
  ...SLIDES.map((slide) =>
    `  <a href="${DEMO_URL}${theme}/#slide=${slide}">` +
    `<img src="docs/screenshots/${theme}-${slide}.jpg" alt="${theme}, slide ${slide}" width="49%"></a>`),
  "</p>",
].join("\n")).join("\n\n");

const README = join(ROOT, "README.md");
const readme = readFileSync(README, "utf8");
const START = "<!-- gallery:start -->";
const END = "<!-- gallery:end -->";
const from = readme.indexOf(START);
const to = readme.indexOf(END);
if (from === -1 || to < from) {
  console.error(`README.md: missing ${START} / ${END} markers, gallery not updated`);
  process.exitCode = 1;
} else {
  writeFileSync(README, `${readme.slice(0, from + START.length)}\n\n${gallery}\n\n${readme.slice(to)}`);
  console.log("README.md gallery updated");
}
