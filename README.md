# Portfolio — Arpan Gupta

A single-page site introducing my website work to small-business owners.
Custom-built in HTML, CSS and JavaScript — no framework, no build step, no runtime dependencies.

**Live:** https://arpan9058.github.io/Portfolio/

## What is in it

| Section | Contents |
| --- | --- |
| Hero | The offer, a typed device rotator and what is included at a glance |
| Example site | ApexShield Roofing — a concept build for a fictional roofing business, linked and previewed |
| Projects | Prepto and EKOTE — personal projects, with screenshots and plain-language descriptions |
| What you get | Mobile-first build, a page per service, enquiry routing, full handover |
| Process | Scope → Build → Review → Ship |
| Contact | Email with click-to-copy, GitHub, and an enquiry form |

## Featured projects

- **ApexShield Roofing** — [live site](https://arpan9058.github.io/ApexShield/) · [source](https://github.com/Arpan9058/ApexShield)
- **Prepto** — [source](https://github.com/Arpan9058/Prepto)
- **EKOTE** — [source](https://github.com/Arpan9058/EKOTE-Spring)

## Layout

```
index.html              markup for the whole page
assets/styles.css       all styling, custom properties, responsive rules
assets/app.js           scroll reveals, rotator, tilt, form delivery
assets/*.jpg            example site and project home-page screenshots
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
- The contact form posts enquiries to Web3Forms, which delivers them by
  email. The access key lives in `WEB3FORMS_KEY` in `assets/app.js`; it is
  a public delivery identifier, not a credential. If the request fails the
  form falls back to composing a `mailto:` draft, so it is never a dead end.
- ApexShield is labelled on both sites as a concept build for a fictional
  business; its sample photos and reviews are marked as illustrative.
