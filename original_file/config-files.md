# package.json

```json
{
  "name": "hubzz-ui-kit",
  "version": "1.0.0",
  "description": "Production-ready Web3 UI Framework for Hubzz",
  "main": "public/js/hubzz.js",
  "style": "public/css/hubzz.css",
  "keywords": [
    "ui-kit",
    "web3",
    "css",
    "components",
    "framework"
  ],
  "author": "Hubzz",
  "license": "MIT",
  "scripts": {
    "build": "npm run build:css && npm run build:js",
    "build:css": "cat src/css/variables.css src/css/base.css src/css/animations.css src/css/components/*.css > public/css/hubzz.css",
    "build:js": "cat src/js/core.js src/js/components/*.js src/js/index.js > public/js/hubzz.js",
    "minify:css": "npx cssnano public/css/hubzz.css -o public/css/hubzz.min.css",
    "minify:js": "npx esbuild public/js/hubzz.js --minify --outfile=public/js/hubzz.min.js",
    "start": "vercel dev",
    "deploy": "vercel",
    "clean": "rm -rf public/css/hubzz.css public/css/hubzz.min.css public/js/hubzz.js public/js/hubzz.min.js"
  },
  "devDependencies": {
    "cssnano": "^5.1.15",
    "esbuild": "^0.19.0"
  },
  "files": [
    "public/",
    "src/",
    "docs/",
    "README.md"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/hubzz-ui-kit"
  },
  "bugs": {
    "url": "https://github.com/yourusername/hubzz-ui-kit/issues"
  },
  "homepage": "https://hubzz-ui-kit.vercel.app"
}
```

# vercel.json

```json
{
  "buildCommand": "npm run build && npm run minify:css && npm run minify:js",
  "outputDirectory": "public",
  "framework": "static",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "$1"
    }
  ],
  "headers": [
    {
      "source": "/css/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/js/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/docs/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

# .gitignore

```
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build outputs
public/css/hubzz.css
public/css/hubzz.min.css
public/js/hubzz.js
public/js/hubzz.min.js
public/fonts/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Environment
.env
.env.local
.env.*.local

# Vercel
.vercel/
.vercelignore

# Logs
npm-debug.log
yarn-debug.log
yarn-error.log
lerna-debug.log

# OS
Thumbs.db
.DS_Store
```

# README.md

```markdown
# Hubzz UI Kit

> Production-ready Web3 UI Framework for Hubzz. Zero dependencies. ~18KB gzipped.

## Features

- ✅ **16 Production Components** - Buttons, forms, cards, modals, sliders, and more
- ✅ **Fully Responsive** - Mobile-first design from 320px to 1920px
- ✅ **Dark Mode** - Automatic OS detection + manual toggle
- ✅ **Web3 Ready** - Wallet, transaction, and blockchain-specific components
- ✅ **Zero Dependencies** - Pure CSS + Vanilla JS
- ✅ **Small Bundle** - ~18KB gzipped (CSS + JS)
- ✅ **Accessible** - WCAG compliant, keyboard navigation
- ✅ **CDN Ready** - Deploy to Vercel, jsDelivr, or any static host

## Quick Start

### CDN (Easiest)

```html
<link rel="stylesheet" href="https://hubzz-ui-kit.vercel.app/css/hubzz.min.css">
<script src="https://hubzz-ui-kit.vercel.app/js/hubzz.min.js"></script>
```

### Self-Hosted

```bash
# Clone or download this repo
git clone https://github.com/yourusername/hubzz-ui-kit.git
cd hubzz-ui-kit

# Install build tools
npm install --save-dev esbuild cssnano

# Build
npm run build
npm run minify:css
npm run minify:js

# Deploy
npm install -g vercel
vercel
```

## Components

### Basic
- Button (primary, secondary, outline, danger)
- Input (text, email, password, number)
- Textarea
- Select (custom dropdown)
- Checkbox
- Radio
- Label

### Layout
- Card (with header, body, footer)
- Grid (responsive 2-4 columns)
- Container
- Flex utilities
- Spacing utilities

### Interactive
- Modal (dialog boxes)
- Dropdown (menus)
- Tabs (tabbed content)
- Slider (carousels)
- Accordion (collapsible sections)

### Web3
- Wallet status card
- Transaction status
- Address display with copy
- Network badge
- Balance display

### Data Display
- Badge (status indicators)
- Status tag
- Table
- List
- Progress bar

### Advanced
- Date picker
- Time picker
- Checkout form (multi-step)
- Image gallery
- Star rating
- Alert
- Toast notification

## Documentation

- [Getting Started](./docs/getting-started.html)
- [Component Showcase](./docs/index.html)
- [Basic Example](./docs/examples/basic.html)
- [Dashboard Example](./docs/examples/dashboard.html)
- [Web3 Example](./docs/examples/web3-app.html)

## Usage Examples

### Basic Button

```html
<button class="btn btn--primary">Click Me</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--outline">Outline</button>
```

### Card with Content

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
  </div>
  <div class="card__body">
    <p>Your content here</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary btn--sm">Action</button>
  </div>
</div>
```

### Modal Dialog

```html
<button class="btn btn--primary" onclick="Hubzz.modal.open('#myModal')">
  Open Modal
</button>

<div class="modal" id="myModal">
  <div class="modal__content">
    <div class="modal__header">
      <h2>Modal Title</h2>
      <button class="modal__close" onclick="Hubzz.modal.close('#myModal')">×</button>
    </div>
    <div class="modal__body">
      <p>Modal content</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--primary" onclick="Hubzz.modal.close('#myModal')">Close</button>
    </div>
  </div>
</div>
```

### Theme Toggle

```html
<button class="theme-toggle" id="themeToggle">🌙</button>

<script>
  // Auto-detects OS preference
  Hubzz.theme.init();
  
  // Manual toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    Hubzz.theme.toggle();
  });
</script>
```

## API Reference

### Theme

```javascript
Hubzz.theme.init();                    // Auto-detect OS preference
Hubzz.theme.toggle();                  // Toggle between light/dark
Hubzz.theme.set('light');              // Set to light mode
Hubzz.theme.set('dark');               // Set to dark mode
const current = Hubzz.theme.current();  // Get current theme
```

### Modal

```javascript
Hubzz.modal.open('#id');               // Open modal
Hubzz.modal.close('#id');              // Close modal
Hubzz.modal.toggle('#id');             // Toggle modal
```

### Tabs

```javascript
Hubzz.tabs.init();                     // Initialize all tabs
Hubzz.tabs.activate('tab-id');         // Activate specific tab
const active = Hubzz.tabs.active();    // Get active tab
```

### Dropdown

```javascript
Hubzz.dropdown.init();                 // Initialize all dropdowns
Hubzz.dropdown.open('#id');            // Open dropdown
Hubzz.dropdown.close('#id');           // Close dropdown
```

### Slider

```javascript
Hubzz.slider.init('.slider-class', {
  autoplay: true,
  speed: 5000,
  transition: 300
});
```

## Customization

### Override Colors

```html
<style>
  :root {
    --color-primary: #YOUR_COLOR;
    --color-success: #YOUR_COLOR;
    --color-error: #YOUR_COLOR;
    /* ... more overrides */
  }
</style>
```

### Custom Theme

```html
<style>
  :root {
    /* Light mode (default) */
    --color-bg-primary: #FFFFFF;
    --color-text-primary: #111827;
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      /* Dark mode */
      --color-bg-primary: #1F2937;
      --color-text-primary: #F9FAFB;
    }
  }
</style>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Size

| File | Size |
|------|------|
| hubzz.css | ~45KB |
| hubzz.min.css | ~12KB (gzipped) |
| hubzz.js | ~25KB |
| hubzz.min.js | ~6KB (gzipped) |
| **Total** | **~18KB** |

## License

MIT - Feel free to use in personal and commercial projects

## Support

- 📧 Email: support@hubzz.app
- 🐛 Issues: GitHub Issues
- 📚 Docs: See `/docs` folder

## Contributing

Contributions welcome! Please submit PRs to improve the framework.

---

Built with ❤️ for Hubzz
```
