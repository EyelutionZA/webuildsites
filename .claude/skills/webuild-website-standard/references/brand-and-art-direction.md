# Brand and Art Direction Reference

## Purpose

Turn the ICP and the six creative axes (`icp-and-positioning.md`) into concrete design tokens: colour, typography, spacing, depth, and radius. Tokens are defined once as CSS custom properties and consumed everywhere — never hardcoded per component.

## Colour

Work in **OKLCH** (`oklch(L C H)` — Lightness 0–1, Chroma 0–~0.37, Hue 0–360°). It is perceptually uniform, supported in all current browsers, and reaches the P3 gamut. Do not ship raw hex ramps copied from a framework.

Palette construction:

1. **Pick a brand hue with intent.** Choose a hue that fits the ICP — not the default ≈250° blue. If blue is genuinely right, shift it off-default (teal ≈195°, indigo ≈270°) and own a specific value. Record why.
2. **Build the brand ramp by fixing H, varying L, curving C.** Generate ~11 steps (50→950): hue constant, chroma peaking in the mid-tones (≈500–600) and falling off at the light and dark ends.
3. **Give neutrals a temperature.** Never hue-neutral grey. Warm neutrals (hue ≈60–90°) or cool neutrals (hue ≈250–260°), chroma ≈0.004–0.02, used consistently. This is the fastest move off the "AI grey" look.
4. **Accent at ~10%, in a different hue family.** Apply the 60/30/10 rule: ~60% neutral surface, ~30% brand tint, ~10% high-chroma accent reserved for the single most important action per view. The accent should be complementary or split-complementary to the brand hue.
5. **Add a semantic layer** — success / warning / danger / info — tuned to matched OKLCH lightness so they feel like one family.
6. **Dark mode is a designed palette, not an inversion.** Lift surfaces off pure black, reduce accent chroma (bright colours vibrate on dark), keep text near `oklch(0.95 …)` rather than pure white.

```css
:root {
  /* warm neutral ramp — consistent hue ≈80 */
  --bg:         oklch(0.985 0.005 85);
  --surface:    oklch(0.965 0.007 85);
  --border:     oklch(0.900 0.008 85);
  --ink:        oklch(0.220 0.015 75);
  --ink-muted:  oklch(0.520 0.012 75);
  /* brand: a chosen hue, NOT default blue */
  --brand:      oklch(0.42 0.07 165);
  /* accent: different hue family, high chroma, ~10% usage */
  --accent:     oklch(0.70 0.17 55);
}
```

## Typography

Pair a **display/heading face** with a distinct **body face**. The rule is not "never use Inter" — it is "never ship only Inter at defaults". If body is a neutral sans, the display face must carry personality (an expressive serif, a distinctive grotesque, a variable font with optical sizing).

**Fluid modular scale with `clamp()`** — hierarchy scales without media queries. Use two ratios: a tighter ratio at the small viewport (≈1.2 minor third) and a wider one at large (≈1.333–1.5) so the scale opens up on big screens and mobile headings do not blow out.

```css
:root {
  --step--1: clamp(0.83rem, 0.80rem + 0.17vw, 0.94rem);
  --step-0:  clamp(1.00rem, 0.95rem + 0.24vw, 1.13rem);  /* body */
  --step-1:  clamp(1.20rem, 1.12rem + 0.40vw, 1.51rem);
  --step-2:  clamp(1.44rem, 1.31rem + 0.65vw, 2.01rem);
  --step-3:  clamp(1.73rem, 1.53rem + 1.00vw, 2.68rem);
  --step-4:  clamp(2.07rem, 1.78rem + 1.48vw, 3.58rem);
  --step-5:  clamp(2.49rem, 2.06rem + 2.14vw, 4.77rem);  /* display */
}
```

Details that separate bespoke from generic:

- Negative tracking on large type: `letter-spacing: -0.02em` (large) to `-0.04em` (display).
- Tight leading on headings (`line-height: 0.95–1.1`); body stays `1.5–1.65`.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body.
- `font-optical-sizing: auto` on variable fonts.
- Body measure 60–75ch (`max-width: 65ch`).
- Load fonts with `next/font` (self-hosted, no layout shift, `display: swap`).

## Spacing and Rhythm

- One geometric spacing scale, base 4px or 8px: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192. Every margin, padding, and gap snaps to it.
- Fluid section spacing: `clamp(4rem, 10vw, 10rem)` so rhythm scales.
- Vary section padding intentionally — dense sections get less, hero/feature moments get more. Identical `py-20` on every section is a tell.

## Depth, Layering, Texture

- **Layered, tinted shadows — not grey blur.** Stack 2–3 shadows, tint them with the surface hue, low opacity; combine a tight contact shadow with a soft ambient one.

```css
:root {
  --shadow-md:
    0 1px 2px -1px oklch(0.22 0.04 165 / 0.08),
    0 4px 12px -2px oklch(0.22 0.04 165 / 0.10),
    0 12px 32px -8px oklch(0.22 0.04 165 / 0.08);
}
```

- **Grain / noise** at 2–5% opacity over flat colour planes kills the flat-AI-gradient look.
- **Subtle gradient mesh / radial tints** instead of flat fills on hero and section backgrounds.
- **One radius posture, applied system-wide** — sharp (0–4px), soft (12–16px), or pill-heavy. Pick from the ICP axis. Nest radii correctly (inner = outer − padding).

## Grids Beyond the Centred Column

- Asymmetric layouts — content weighted left or right with generous opposing whitespace.
- Editorial / broken grids — overlapping elements, images bleeding off-canvas, captions in the margin.
- CSS Grid with named areas or `subgrid`; mixed column spans (a 7/5 split, not 6/6).
- Bento grids — varied tile sizes — as the intentional replacement for the 3-up card row.
- Full-bleed sections alternating with contained ones for rhythm.
- Let exactly one element break the grid per page — a deliberate rule violation that reads as art direction.

## Webuild Rule

Tokens are defined once, in OKLCH, derived from the ICP, and consumed everywhere. A component that hardcodes a colour, a font size outside the scale, or a one-off radius fails review.
