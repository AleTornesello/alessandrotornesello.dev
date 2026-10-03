# alessandrotornesello.dev

Personal website. Plain HTML5, CSS and JavaScript plus [Bulma](https://bulma.io): no build step, no frameworks.

## Run locally

Serve the `public/` folder with any static file server (opening `index.html`
straight from disk won't run the JavaScript, because browsers block ES
modules on `file://`), for example:

```sh
npx serve public
```

## Structure

```
public/                   # deploy this folder as the site root
├── index.html
├── 404.html              # served by the host for missing URLs (root-relative paths)
├── robots.txt
├── sitemap.xml           # update <lastmod> when the content changes
├── manifest.webmanifest
├── css/
│   ├── main.css          # entry point: declares cascade layers and imports everything
│   ├── tokens.css        # design tokens: light/dark surfaces, section accents
│   ├── base.css          # element defaults, font face, focus, reduced motion
│   ├── utilities.css     # small helper classes (.glass, .shadow, ...)
│   ├── components/       # reusable pieces (section title, timeline, tags, window)
│   ├── sections/         # one file per page section
│   └── vendor/           # Bulma 1.0 (compiled, default settings)
├── fonts/                # Bricolage Grotesque (headings), SIL OFL
├── js/
│   ├── main.js           # entry module: wires up the modules below
│   └── modules/          # typewriter, scrollspy, theme toggle
└── assets/
    ├── icons.svg         # SVG icon sprite (Font Awesome Free, CC BY 4.0)
    ├── og-image.jpg      # link preview image, 1200x630
    ├── favicon/
    └── images/
tools/
└── og-image.html         # template for og-image.jpg (not deployed)
```

The canonical URL, link-preview tags, JSON-LD and sitemap all use
`https://alessandrotornesello.dev/`, and `404.html` uses root-relative
paths, so the site expects to be served from the root of that domain.

### Cascade layers

`main.css` declares `@layer vendor, base, utilities, components, sections;`.
Vendor CSS (Bulma) sits in the lowest layer, so custom rules always override
it without `!important`. Put new rules in the layer that matches their role.

### Theming

The site follows the OS light/dark preference until the visitor picks a theme
with the toggle in the navigation bar; the choice is saved in `localStorage`.
Colors live in `tokens.css`; each section sets one `--accent` that its title
underline, timeline and tags share. Use `--accent-ink` when the accent is used
as text: it is adjusted per theme for contrast.

### Icons and images

Icons are symbols in `assets/icons.svg`, used like this:

```html
<svg class="svg-icon" aria-hidden="true"><use href="assets/icons.svg#github"></use></svg>
```

To add one, copy its `<path>` from the Font Awesome Free SVGs into a new
`<symbol>`.

Raster images are sized at about 2x their displayed size. The photo ships as
AVIF/WebP with a JPEG fallback in a `<picture>`. Give every `<img>` its
`width`/`height`, plus `loading="lazy"` when it is below the hero.

### Browser support

The CSS uses native nesting, media query range syntax (`width < 1024px`) and
`color-mix()`, all Baseline since 2023.
