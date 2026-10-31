# RIHAN FRAGUMES website

React + Vite + GSAP (ScrollTrigger) + lucide-react. Plain CSS (no Tailwind) to keep dependencies minimal.

## Run locally
Requires Node 18+.
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview
```

## Edit content
All products, prices and contact details live in `src/data.js`.
- VELOUR quantity is unconfirmed: set `quantity: '50 ML'` (or the real value) on VELOUR; the cards, details and WhatsApp message update automatically.
- WhatsApp number: `BRAND.whatsapp` (country code, no +).

## Deploy to Vercel
Import the folder/Git repo in Vercel (Vite is auto-detected; `vercel.json` included). No URLs are hardcoded, so a custom domain can be added later in Vercel > Settings > Domains with no rebuild of the code. After choosing a domain, optionally change the `og:image` in `index.html` to an absolute URL for best social previews.

## Notes
Fonts (Cormorant Garamond, Jost) load from Google Fonts. Product photos and logo are the supplied originals, unaltered apart from tight cropping of the logo and JPEG recompression.
