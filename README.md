# QAVILO — Digital Menu Studio

A multi-page, responsive digital studio website built with React and Vite. The visual direction is Modern Heritage Luxury: chocolate brown, warm champagne and copper, editorial serif typography, and hospitality-led imagery.

## Pages
- Home
- Services
- Menu Library (75+ sample items, category filters and product detail sheets)
- Our Process
- The Studio
- Contact

Navigation uses hash routes (`#/services`, `#/work`, etc.) so the site works on static hosting such as GitHub Pages without server-side route configuration.

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
```
Vite writes the production site to `dist/`.

## Notes
- WhatsApp consultation links are configured for the two supplied contact numbers.
- Product sample cards show descriptions and ingredient details only; no prices or gram quantities are displayed.
- Dark mode is included.
- Color changes are immediate; there are no color-transition animations.
