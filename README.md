# Portfolio — Arpan Gupta

A single-page portfolio and client pitch site.
Hand-written HTML, CSS and JavaScript — no framework, no build step, no runtime dependencies.

**Live:** https://arpan9058.github.io/portfolio/

## What is in it

| Section | Contents |
| --- | --- |
| Hero | Animated headline, typed role rotator, live stats |
| Featured build | ApexShield Roofing — the live demo site, linked and previewed |
| Selected work | Prepto (Node/AI interview platform) and EKOTE (Spring Boot inventory system) |
| Stack | Backend, frontend, data & AI, ship & run |
| Process | Scope → Build → Review → Ship |
| Contact | Email with click-to-copy, GitHub, and a form that composes a mail draft |

## Featured projects

- **ApexShield Roofing** — [live site](https://arpan9058.github.io/ApexShield/) · [source](https://github.com/Arpan9058/ApexShield)
- **Prepto** — [source](https://github.com/Arpan9058/Prepto)
- **EKOTE** — [source](https://github.com/Arpan9058/EKOTE-Spring)

## Layout

```
index.html              markup for the whole page
assets/styles.css       all styling, custom properties, responsive rules
assets/app.js           scroll reveals, counters, rotator, tilt, form handling
assets/apexshield-cover.jpg   demo preview image
.github/workflows/pages.yml   deploys to GitHub Pages on every push to main
```

## Running it locally

No tooling required — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deployment

Every push to `main` triggers the GitHub Actions workflow, which uploads the
repository root as a Pages artifact and deploys it. Nothing is built or bundled.

## Notes

- Fully responsive down to 320px.
- All motion is disabled under `prefers-reduced-motion: reduce`.
- The contact form composes a `mailto:` draft in the visitor's mail client;
  no data is sent anywhere or stored.
