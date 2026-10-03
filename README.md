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
│   ├── base.css          # element defaults (html, body, scrollbar)
│   ├── utilities.css     # small helper classes (.glass, .shadow, ...)
│   ├── components/       # reusable pieces (section title, fake browser window)
│   ├── sections/         # one file per page section
│   ├── vendor/           # Bulma 1.0 (compiled, default settings)
│   └── fontawesome/
├── js/
└── assets/
```

### Cascade layers

`main.css` declares `@layer vendor, base, utilities, components, sections;`.
Vendor CSS (Bulma, Font Awesome) sits in the lowest layer, so custom rules
always override it without `!important`. Put new rules in the layer that
matches their role.

### Browser support

The CSS uses native nesting and media query range syntax (`width < 1024px`),
both Baseline since 2023.
