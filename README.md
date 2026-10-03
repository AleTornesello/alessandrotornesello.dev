# alessandrotornesello.dev

Personal website. Plain HTML5, CSS and JavaScript plus [Bulma](https://bulma.io): no build step, no frameworks.

## Run locally

Serve the `public/` folder with any static file server, for example:

```sh
npx serve public
```

## Structure

```
public/
├── index.html
├── css/
│   ├── main.css          # entry point: declares cascade layers and imports everything
│   ├── tokens.css        # design tokens: light/dark surfaces, section accents
│   ├── base.css          # element defaults, font face, focus, reduced motion
│   ├── utilities.css     # small helper classes (.glass, .shadow, ...)
│   ├── components/       # reusable pieces (section title, timeline, tags, window)
│   ├── sections/         # one file per page section
│   ├── vendor/           # Bulma 1.0 (compiled, default settings)
│   └── fontawesome/
├── fonts/                # Bricolage Grotesque (headings), SIL OFL
├── js/
└── assets/
```

### Cascade layers

`main.css` declares `@layer vendor, base, utilities, components, sections;`.
Vendor CSS (Bulma, Font Awesome) sits in the lowest layer, so custom rules
always override it without `!important`. Put new rules in the layer that
matches their role.

### Theming

The site follows the OS light/dark preference. Colors live in `tokens.css`;
each section sets one `--accent` that its title underline, timeline and tags
share. Use `--accent-ink` when the accent is used as text: it is adjusted
per theme for contrast.

### Browser support

The CSS uses native nesting, media query range syntax (`width < 1024px`) and
`color-mix()`, all Baseline since 2023.
