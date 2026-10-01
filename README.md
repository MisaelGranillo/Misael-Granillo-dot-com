# misaelgranillo.com

Personal / consulting site for **Misael Granillo** — commercial executive and consultant, Riviera Maya luxury real estate.

Static site, no build step. Bilingual ES/EN (Spanish default, in-page toggle).

## Structure

```
index.html      All content, bilingual via data-es / data-en attributes
styles.css      Design system + layout (Fraunces / Geist, indigo #313E66 + brass)
main.js         Language toggle, mobile nav, scroll reveal (vanilla, ~3 KB)
assets/
  portrait.jpg  Optimized portrait (800×1100)
  favicon.svg   MG monogram
```

## Editing content

Every translatable element carries both languages:

```html
<h2 data-es="Texto en español" data-en="English text">Texto en español</h2>
```

- The visible text node is the **Spanish** default (shown with JS disabled → good for SEO).
- `data-en` holds the English version; the toggle swaps `textContent`.
- Keep translatable elements as **leaf nodes** (no child tags), since the toggle replaces text content.

## Local preview

```bash
cd misaelgranillo-site
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy (Cloudflare Pages)

Deployed to the existing `misaelgranillo` Pages project (domain: misaelgranillo.com).

```bash
npx wrangler pages deploy . --project-name misaelgranillo
```

## Notes / to confirm

- **LinkedIn URL** in the Contact section is `linkedin.com/in/misaelgranillo`.
- **Contact email** is `hola@misaelgranillo.com` (ensure this mailbox / routing exists).
- Project one-liners in the Track record section are concise positioning lines, not brochure copy.
