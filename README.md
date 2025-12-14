# Hubzz UI Kit

Lightweight, dependency-free UI kit with tokens, components, and utilities. Ships as prebuilt CSS/JS bundles plus HTML docs/examples for quick validation.

## Requirements
- Node.js 18+
- npm

## Install & build
```bash
npm install
npm run build
npm run minify:css
npm run minify:js
```

Built assets land in `public/`:
- `public/css/hubzz.css` and `public/css/hubzz.min.css`
- `public/js/hubzz.js` and `public/js/hubzz.min.js`
- docs copied to `public/docs/`

## Usage
Reference the compiled bundle from your app or the included docs:
```html
<link rel="stylesheet" href="/css/hubzz.min.css" />
<script src="/js/hubzz.min.js"></script>
```

CDN-style include (after deploying the `public/` folder, e.g., to Vercel; project name/host can be anything):
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hubzz demo</title>
    <link rel="stylesheet" href="https://YOUR-HOST/css/hubzz.min.css">
  </head>
  <body>
    <h1 class="btn btn--primary">Hello, Hubzz!</h1>
    <script src="https://YOUR-HOST/js/hubzz.min.js"></script>
  </body>
</html>
```
Replace `YOUR-HOST` with your deployment URL (e.g., `https://hubzz-kit.vercel.app` or any other project name you choose). JS auto-initializes components on load; no extra setup required.

## Scripts
- `build` – concatenate CSS/JS and copy docs to `public/`
- `minify:css` – minify CSS bundle via esbuild
- `minify:js` – minify JS bundle via esbuild
- `deploy` – deploy with Vercel CLI (expects a configured account)
- `clean` – remove generated assets in `public/`

## Project layout
```
docs/            HTML showcase and examples
public/          Built assets (generated)
src/css/         Tokens, base styles, component CSS
src/js/          Core utilities and component JS
```

## Components included
Buttons, forms, cards, modals, navigation, tabs, sliders, dropdowns, date picker, checkout, status badges, gallery, rating, utilities, and theme toggles.

## Deployment
The repo is configured for static hosting via Vercel. Build, then run `vercel` to ship `public/`. Configure caching and headers in `vercel.json` as needed.

## Browser support
Latest Chrome, Firefox, Safari, Edge, and modern mobile browsers.
