# Hubzz UI Kit

Lightweight, dependency-free UI kit compiled from a single Sass entry. The current bundle includes layout primitives, typography, buttons, badges, categories, and slider/date-range skinning.

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

Replace the path with your deployment URL (e.g., Vercel). JS auto-initializes the small helper scripts; no extra setup required.

## Scripts
- `build` – compile Sass, bundle JS, copy docs to `public/`
- `minify:css` – minify CSS bundle via esbuild
- `minify:js` – minify JS bundle via esbuild
- `deploy` – deploy with Vercel CLI
- `clean` – remove generated assets in `public/`

## Project layout
```
docs/                 HTML showcase and examples
public/               Built assets (generated)
src/hubzz-web-styles/ Sass entry + blocks (source of CSS)
src/js/               Core utilities and component JS
```

## Components included (CSS)
- Buttons: `button`, `button-stroke`, `button-black`, `button-white`, `button-small`, `button-circle-stroke`
- Badges: `status`, `status-black`, `status-gray`, categories `category`, `category-blue`
- Layout/typography: `container`, `section*`, `hero`, `h1`–`h4`, `info`, `stage`
- Slider skin: `.slick-*` classes (for use with Slick)
- Date range skin: `.DateRangePicker` / `.SingleDatePicker` classes

## Deployment
The repo is configured for static hosting via Vercel. Build, then run `vercel` to ship `public/`. Configure caching and headers in `vercel.json` as needed.

## Browser support
Latest Chrome, Firefox, Safari, Edge, and modern mobile browsers.
