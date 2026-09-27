#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Builds every theme into public/<theme>/ plus a public/index.html gallery.
# Usage: scripts/build.sh [theme...]   (default: all themes under config/)

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if [[ ${#} -gt 0 ]]; then
  THEMES=("$@")
else
  mapfile -t THEMES < <(find config -mindepth 1 -maxdepth 1 -type d ! -name _default -printf '%f\n' | sort)
fi

rm -rf public
for theme in "${THEMES[@]}"; do
  echo ">>> $theme"
  hugo --environment "$theme" --baseURL "/$theme/" --destination "public/$theme" --minify
done

{
  cat <<'EOF'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>hugo-webslides themes</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 3rem auto; padding: 0 1rem; }
  li { margin: .5rem 0; font-size: 1.25rem; }
</style>
</head>
<body>
<h1>hugo-webslides themes</h1>
<ul>
EOF
  for theme in "${THEMES[@]}"; do
    echo "  <li><a href=\"$theme/\">$theme</a></li>"
  done
  cat <<'EOF'
</ul>
</body>
</html>
EOF
} > public/index.html

echo "Done: public/index.html"
