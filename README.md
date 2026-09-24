# Astra WebOS — Landing Page

**Simple. Fast. Yours.** — premium landing page for [Astra WebOS](https://analoggeek.github.io/astrawebos/), a complete offline-first web operating system that runs in a browser tab.

> **Live Preview** → https://analoggeek.github.io/astrawebos/  
> **Source (WebOS)** → https://github.com/Analoggeek/astrawebos  
> This landing page is a separate static site. Do **not** deploy it over the WebOS repository — keep the OS live at `/astrawebos/`.

---

## ✨ What’s inside

- **Futuristic, premium design** — dark midnight + violet/cyan gradients, glassmorphism, grid, ambient orbs, shadows & blur
- **Truthful content** — all copy, features and apps are derived from the live Astra WebOS (README + source). No invented stats, testimonials or placeholder data
- **Hero mockup** — device-framed Astra desktop (6 primary icons, File Explorer + Terminal windows, taskbar) with parallax
- **Sections**: Hero → Introduction → Bento Grid (10 cards) → Experience (6 interactive states) → Apps (16 native + 22 web apps) → Why Astra → Open Source → Shortcuts → Final CTA
- **Live Preview everywhere** — nav, hero (Launch Astra), features (Try Astra WebOS), mid-page and final (Launch Astra WebOS) — all open `https://analoggeek.github.io/astrawebos/` in a new tab (`target="_blank" rel="noopener"`)
- **Responsive** — verified at 360, 390, 430, 768, 1024, 1280, 1440, 1920. No horizontal scroll, no overflow
- **Performance & a11y** — system fonts (Inter + JetBrains Mono via Google Fonts), lazy reveal via IntersectionObserver, `prefers-reduced-motion`, semantic HTML, keyboard nav, focus states, proper contrast

---

## 📁 Project structure (GitHub Pages-ready)

```
/ (repo root)
├── index.html      # landing page (SEO: title, OG, Twitter, JSON-LD, theme-color, favicon)
├── style.css       # all styling — one file, no build
├── script.js       # nav, mobile menu, reveal, parallax, experience tabs, year
├── manifest.json   # PWA metadata (optional for landing)
├── robots.txt
└── README.md
```

Everything is static. No PHP, no Node, no database, no env secrets.

---

## 🚀 Local preview

```bash
# any static server — examples:
python3 -m http.server 8000
# → http://localhost:8000

# or
npx serve .
```

Just open `index.html` — it works on `file://` too (fonts need network).

---

## 🌐 GitHub Pages deployment

### Option A — separate repository (recommended)
This landing is **not** the WebOS. Deploy it separately so the OS stays live.

1. Create a **new** repo, e.g. `astra-landing` (or `<username>.github.io` for user site)
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "Astra WebOS landing"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. GitHub → **Settings → Pages** → Source: **Deploy from branch**, Branch: `main` / `root`
4. Your site appears at `https://<you>.github.io/<repo>/` (or `https://<you>.github.io/` for user site)

> Keep the real OS at `https://<you>.github.io/astrawebos/` — don’t push this landing there or the Live Preview will iframe itself.

### Option B — user site
Name the repo exactly `<username>.github.io` → site at `https://<username>.github.io/`. The OS can coexist at `/astrawebos/` as a separate repo.

Custom domain: **Settings → Pages → Custom domain**.

---

## ✏️ How to change content

- **Text & features**: edit `index.html` directly. All headings, cards and app names are plain HTML — search for `<!-- FEATURE BENTO -->`, `<!-- APPS -->`, etc.
- **Live Preview URL**: search `https://analoggeek.github.io/astrawebos/` — 6 occurrences (nav, hero, bento CTA, why, open-source, final). Keep `target="_blank" rel="noopener"`.
- **GitHub URL**: `https://github.com/Analoggeek/astrawebos` — nav + hero + footer + open-source section.
- **Screenshots**: replace the hero mock by editing `.mock` in `index.html` or swap in a real screenshot: add `assets/screenshot.png` and replace the `.mock__screen` block with `<img src="assets/screenshot.png" alt="Astra desktop showing File Explorer and Terminal">`.
- **Colors/accent**: edit `:root` in `style.css` — `--accent`, `--accent2`, `--accent3`, `--bg`, `--text`.
- **Typography**: change the Google Fonts import in `<head>` and `--font` variables.

---

## 🔍 Live Preview button

Required everywhere (verbatim):

```html
<a href="https://analoggeek.github.io/astrawebos/" target="_blank" rel="noopener">
  Live Preview →
</a>
```

Styled as `btn btn--primary` in this landing, but any styling is OK as long as it remains clearly visible.

---

## ✅ Checklist

- [x] Inspect live OS before designing (branding, 6 apps, features, themes, file system, browser, office, etc.)
- [x] No fake features — every card maps to a real capability from the README
- [x] Live Preview opens real OS in new tab
- [x] Mobile hamburger, sticky glass nav, smooth scroll, reveal & parallax respect `prefers-reduced-motion`
- [x] Lighthouse-friendly (no heavy deps, one CSS, one JS)
- [x] SEO + a11y (title, meta, OG, Twitter, JSON-LD, alt, keyboard)

---

## Credits

Astra WebOS is created by **Analoggeek** — live at https://analoggeek.github.io/astrawebos/ and source at https://github.com/Analoggeek/astrawebos. Landing content is derived from that project’s live site, README and source.

