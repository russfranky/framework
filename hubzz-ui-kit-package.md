# Hubzz UI Kit – Source Package

> Production-ready bundle compiled from the Sass entry in `src/hubzz-web-styles/`

---

## 📦 File Structure

```
hubzz-ui-kit/
├── public/
│   ├── css/
│   │   ├── hubzz.css          (generated)
│   │   └── hubzz.min.css      (generated, minified)
│   └── js/
│       ├── hubzz.js           (generated)
│       └── hubzz.min.js       (generated, minified)
├── src/
│   ├── hubzz-web-styles/      Sass entry + blocks
│   │   ├── app.sass
│   │   ├── reset.sass
│   │   ├── helpers.sass
│   │   ├── common.sass
│   │   ├── global.sass
│   │   └── blocks/            section, container, title, info, button, status, category, slick, stage, dateRangePicker
│   └── js/
│       ├── core.js
│       ├── components/
│       │   ├── dropdown.js
│       │   ├── forms.js
│       │   ├── modal.js
│       │   ├── slider.js
│       │   ├── tabs.js
│       │   └── theme.js
│       └── index.js
├── docs/                      HTML showcase and examples
├── vercel.json
├── package.json
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Quick Start

```bash
npm install
npm run build
npm run minify:css
npm run minify:js
vercel   # optional deploy
```

---

## ✅ CSS in the bundle
- Buttons: `button`, `button-stroke`, `button-black`, `button-white`, `button-small`, `button-circle-stroke`
- Badges: `status`, `status-black`, `status-gray`, categories `category`, `category-blue`
- Layout/typography: `container`, `section*`, `hero`, `h1`–`h4`, `info`, `stage`
- Slider skin: `.slick-*` classes (for use with Slick)
- Date range skin: `.DateRangePicker` / `.SingleDatePicker`

---

## 🛠️ Build Scripts

```json
{
  "scripts": {
    "build": "npm run build:css && npm run build:js && npm run build:docs",
    "build:css": "npx sass --no-source-map src/hubzz-web-styles/app.sass public/css/hubzz.css",
    "build:js": "cat src/js/core.js src/js/components/*.js src/js/index.js > public/js/hubzz.js",
    "build:docs": "mkdir -p public/docs && cp -R docs/* public/docs/",
    "minify:css": "npx esbuild public/css/hubzz.css --minify --outfile=public/css/hubzz.min.css",
    "minify:js": "npx esbuild public/js/hubzz.js --minify --outfile=public/js/hubzz.min.js",
    "clean": "rm -rf public/css/hubzz.css public/css/hubzz.min.css public/js/hubzz.js public/js/hubzz.min.js public/docs",
    "deploy": "vercel"
  }
}
```

---

## ✅ Quick Facts
- Zero runtime dependencies
- Responsive layout primitives
- Dark mode support (class-based)
- Minified CSS: ~27KB (before gzip)
- Minified JS: ~5KB (before gzip)

Deploy to Vercel with `vercel` after running the build scripts above.
