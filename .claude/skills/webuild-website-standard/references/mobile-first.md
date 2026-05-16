# Mobile-First Reference

## Purpose

Mobile is the primary canvas. Most traffic — and almost all B2C and trades traffic — is mobile, one-handed, glanceable, and interrupted. Mobile-first is both a UX method and the discipline that earns good Core Web Vitals. Design and build for the smallest screen first; enhance upward.

## Method: Smallest-First

- Author base CSS for the smallest breakpoint (~360–390px). Use `min-width` media queries to **add** for larger screens. Never desktop-down (`max-width` overrides) — that ships desktop weight to phones and produces brittle hacks.
- Decide content priority on the phone canvas first: what is the one job of this screen, and the single primary action?
- Mobile-first naturally enforces a lean payload, which directly improves LCP, INP, and CLS.

## Thumb Zone and Reachability

- Place primary actions in the **bottom third** of the screen — the natural one-handed thumb arc. Top corners require an awkward stretch on large phones.
- Use a sticky bottom action bar for the key CTA on long pages (e.g. "Call now" / "Get a quote" for trades).
- Put destructive or rare actions deliberately outside the easy zone.

## Touch Targets

- **Minimum 24×24 CSS px** to meet WCAG 2.2 SC 2.5.8 (AA).
- **Recommended 44×44 CSS px** (Apple HIG) / 48×48 dp (Material). Use 44px as the working default.
- Keep the visible icon small (e.g. 24px) but expand the hit area to ≥44px with padding.
- Minimum ~8px spacing between adjacent targets.

## Fluid Typography on Mobile

- Use the `clamp()` modular scale from `brand-and-art-direction.md` — no separate mobile font sizes.
- Body text never below 16px on mobile (also prevents iOS Safari input-zoom).
- A tighter scale ratio at the small viewport so mobile headings do not blow out.

## Mobile Navigation

- Full-screen overlay menu, or a bottom sheet / bottom tab bar (best thumb reach).
- A hamburger is acceptable only with a clear label; keep a visible primary CTA outside the menu.
- Use disclosure (accordions) for sub-navigation rather than deep hover menus.
- Respect safe-area insets on notched and gesture-bar devices:

```css
.app-bar    { padding-top: max(1rem, env(safe-area-inset-top)); }
.bottom-nav { padding-bottom: max(0.75rem, env(safe-area-inset-bottom)); }
```

Add `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.

## Core Web Vitals — 2026 Gates (mobile, 75th percentile)

| Metric | "Good" | Notes |
|---|---|---|
| **LCP** — Largest Contentful Paint | < 2.5 s | Optimise the hero image/text; preload the LCP asset |
| **INP** — Interaction to Next Paint | < 200 ms | Minimise main-thread JS; break up long tasks |
| **CLS** — Cumulative Layout Shift | < 0.1 | Reserve space for images, embeds, fonts; never inject content above existing content |

Treat these as launch gates, not aspirations. Tactics:

- Ship minimal JavaScript — server components where the stack allows.
- Responsive images: `srcset`/`sizes`, AVIF/WebP, explicit `width`/`height`.
- Fonts: `next/font` self-hosting, `display: swap`, preload the display face.
- Lazy-load below-the-fold media.
- No layout-shifting animation; reserve space for anything async.

## Why Mobile-First Matters

- UX: thumb-driven, glanceable, interrupted usage demands clear priority and reach.
- Engineering: mobile-first forces a small payload and disciplined priority — exactly what LCP/INP/CLS reward.
- SEO: Google ranks on mobile Core Web Vitals field data. Desktop-down retrofits ship desktop weight to the weakest devices and networks.

## Webuild Rule

Every Webuild site is designed and reviewed on a phone canvas first. A build is not production-ready until touch targets, thumb-zone actions, safe-area handling, and the three Core Web Vitals gates are met on mobile.
