# HUBZZ UI KIT - DEPLOYMENT GUIDE

> Build and deploy the current Sass-based bundle

---

## 📋 Pre-Deployment Checklist

- [ ] Node.js v18+ installed
- [ ] npm or yarn installed
- [ ] GitHub account (for version control)
- [ ] Vercel account (for hosting)
- [ ] All source files copied from this package
- [ ] Directory structure created

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### **PHASE 1: Local Setup**

#### Step 1: Create Project Directory

```bash
# Create directory
mkdir hubzz-ui-kit
cd hubzz-ui-kit

# Initialize git (optional but recommended)
git init
```

#### Step 2: Create Directory Structure

```bash
# Create all required directories
mkdir -p public/{css,js,fonts}
mkdir -p src/{hubzz-web-styles,js/components}
mkdir -p docs/examples

# Verify structure
tree -L 3
```

#### Step 3: Initialize Node Project

```bash
# Create package.json
npm init -y

# Install build dependencies
npm install --save-dev esbuild sass
```

`package.json` scripts (included in this repo):
```json
{
  "scripts": {
    "build": "npm run build:css && npm run build:js && npm run build:docs",
    "build:css": "npx sass --no-source-map src/hubzz-web-styles/app.sass public/css/hubzz.css",
    "build:js": "cat src/js/core.js src/js/components/*.js src/js/index.js > public/js/hubzz.js",
    "build:docs": "mkdir -p public/docs && cp -R docs/* public/docs/",
    "minify:css": "npx esbuild public/css/hubzz.css --minify --outfile=public/css/hubzz.min.css",
    "minify:js": "npx esbuild public/js/hubzz.js --minify --outfile=public/js/hubzz.min.js",
    "deploy": "vercel"
  },
  "devDependencies": {
    "esbuild": "^0.19.0",
    "sass": "^1.62.0"
  }
}
```

#### Step 4: Copy Source Files

Copy the Sass source to `src/hubzz-web-styles/` (from this package).

Copy all JS files to `src/js/`:
- `core.js`
- `components/modal.js`
- `components/tabs.js`
- `components/dropdown.js`
- `components/theme.js`
- `components/slider.js`
- `components/forms.js`
- `index.js`

#### Step 5: Build the Project

```bash
# Build CSS and JS files
npm run build

# Expected output:
# public/css/hubzz.css
# public/js/hubzz.js

# Verify files were created
ls -lh public/css/
ls -lh public/js/
```

#### Step 6: Minify for Production

```bash
# Minify CSS
npm run minify:css

# Minify JavaScript
npm run minify:js

# Verify minified files
ls -lh public/css/hubzz.min.css
ls -lh public/js/hubzz.min.js
```

---

### **PHASE 2: Version Control (GitHub)**

#### Step 7: Create GitHub Repository

```bash
# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Hubzz UI Kit v1.0.0"

# Add remote (replace with your repo)
git remote add origin https://github.com/yourusername/hubzz-ui-kit.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 8: Create Version Tag

```bash
# Tag the release
git tag -a v1.0.0 -m "Release v1.0.0 - Initial production release"

# Push tags to GitHub
git push origin v1.0.0
```

---

### **PHASE 3: Deploy to Vercel**

#### Step 9: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 10: Create Vercel Project

```bash
# Login to Vercel
vercel login

# Deploy project
vercel

# Follow prompts:
# - Project name: hubzz-ui-kit
# - Framework: Other (static)
# - Root directory: ./
# - Build command: npm run build && npm run minify:css && npm run minify:js
# - Output directory: public
```

#### Step 11: Configure Vercel Settings

After deployment, configure on vercel.com:

1. Go to Project Settings
2. Set Environment Variables (if needed):
   ```
   NODE_ENV=production
   ```
3. Configure Custom Domain:
   - Domain: `ui-kit.hubzz.app` (or your choice)
   - Follow DNS configuration instructions
4. Enable Auto-Deployments:
   - Production Branch: `main`
   - Auto-redeploy on push: Enabled

#### Step 12: Verify Deployment

```bash
# Check deployment status
vercel status

# View deployment URL
# Should be: https://hubzz-ui-kit.vercel.app
# Or your custom domain
```

Open in browser and verify:
- CSS is loaded (check styles in DevTools)
- JS is loaded (check console)
- Components are styled correctly
- Dark mode toggle works

---

### **PHASE 4: CDN Configuration**

#### Step 13: Generate CDN Links

Once deployed to Vercel, you have three CDN options:

**Option A: Vercel CDN (Latest)**
```html
<link rel="stylesheet" href="https://hubzz-ui-kit.vercel.app/css/hubzz.min.css">
<script src="https://hubzz-ui-kit.vercel.app/js/hubzz.min.js"></script>
```

**Option B: jsDelivr CDN (Versioned)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yourusername/hubzz-ui-kit@v1.0.0/public/css/hubzz.min.css">
<script src="https://cdn.jsdelivr.net/gh/yourusername/hubzz-ui-kit@v1.0.0/public/js/hubzz.min.js"></script>
```

**Option C: NPM Package (Optional)**
```bash
npm install @hubzz/ui-kit
```

```javascript
import '@hubzz/ui-kit/public/css/hubzz.css';
import Hubzz from '@hubzz/ui-kit/public/js/hubzz.js';
```

---

### **PHASE 5: Documentation**

#### Step 14: Update Documentation

1. Create `docs/index.html` - Component showcase
2. Create `docs/getting-started.html` - Setup guide
3. Create `docs/examples/basic.html` - Example usage
4. Create `docs/examples/dashboard.html` - Dashboard demo
5. Create `docs/examples/web3-app.html` - Web3 demo

Host at:
- `https://hubzz-ui-kit.vercel.app/docs/`

---

### **PHASE 6: Maintenance & Updates**

#### Step 15: Update Process

When making updates:

```bash
# Make changes to src/ files
# Edit src/hubzz-web-styles/app.sass (for example)

# Rebuild
npm run build
npm run minify:css
npm run minify:js

# Commit changes
git add .
git commit -m "Update: improve button styles"

# Tag new version
git tag -a v1.0.1 -m "Release v1.0.1 - Bug fixes and improvements"

# Push to GitHub
git push origin main
git push origin v1.0.1

# Auto-deploy to Vercel (happens automatically)
```

#### Step 16: Monitor Performance

Use Vercel Analytics:
1. Go to vercel.com dashboard
2. Select your project
3. View Analytics tab
4. Monitor:
   - Load times
   - Bundle sizes
   - Deployment frequency
   - Error rates

---

## 📊 Deployment Checklist

### Before Going Live
- [ ] All source files copied
- [ ] Build succeeds (`npm run build`)
- [ ] Minification succeeds (`npm run minify:css && npm run minify:js`)
- [ ] No console errors
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Dark mode works
- [ ] All components render correctly
- [ ] Git repo created and pushed
- [ ] GitHub and Vercel accounts ready

### During Deployment
- [ ] Vercel CLI installed
- [ ] Logged into Vercel
- [ ] Project configured in Vercel
- [ ] Build command set: `npm run build && npm run minify:css && npm run minify:js`
- [ ] Output directory set: `public`
- [ ] Environment variables configured

### After Deployment
- [ ] Deployment URL accessible
- [ ] CSS loads from CDN
- [ ] JS loads from CDN
- [ ] Auto-deploy working
- [ ] Custom domain configured (optional)
- [ ] Documentation updated
- [ ] Team notified

---

## 🔧 Troubleshooting

### Build Fails

```bash
# Check Node version (should be v16+)
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Minification Issues

```bash
# If esbuild fails, reinstall
npm uninstall esbuild
npm install --save-dev esbuild@latest

# Try minifying again
npm run minify:js
```

### Vercel Deployment Fails

```bash
# Check Vercel logs
vercel logs

# Redeploy
vercel --prod

# Or manually deploy
vercel deploy --prod
```

### CSS/JS Not Loading

- Clear browser cache (Ctrl+Shift+Delete)
- Check DevTools Network tab
- Verify CDN URL is correct
- Check Vercel deployment status

---

## 📈 Post-Deployment

### 1. Share CDN Links

Send to your team:
```
CSS: https://hubzz-ui-kit.vercel.app/css/hubzz.min.css
JS: https://hubzz-ui-kit.vercel.app/js/hubzz.min.js
Docs: https://hubzz-ui-kit.vercel.app/docs/
```

### 2. Create Usage Guide

Document for your team:
- How to include in projects
- Basic component examples
- Theme customization
- Browser support

### 3. Set Up Monitoring

- Enable Vercel Analytics
- Monitor bundle sizes
- Track deployment frequency
- Set up alerts for errors

### 4. Plan Updates

- Schedule regular maintenance
- Add new components as needed
- Update documentation
- Maintain version tags

---

## 🎯 Deployment Success Indicators

✅ **You're Done When:**

1. Project deployed to Vercel
2. CDN links working globally
3. All components render correctly
4. Dark mode functions
5. Bundle size <20KB gzipped
6. Documentation accessible
7. Team can use via CDN
8. Auto-deployments working
9. Performance metrics tracked
10. Version control established

---

## 📞 Support

If you encounter issues:

1. Check `npm run build` output for errors
2. Review Vercel logs: `vercel logs`
3. Clear cache and rebuild
4. Check GitHub Actions for CI/CD issues
5. Verify all source files are copied correctly

---

**Congratulations! Your Hubzz UI Kit is now live and ready to use! 🚀**
