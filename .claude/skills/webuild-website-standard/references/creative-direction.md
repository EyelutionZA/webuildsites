# Creative Direction Reference

## Purpose

Make every Webuild site read as a bespoke, art-directed build. A visitor — or a designer — should not be able to tell the site was AI-assisted. The benchmark is a custom Webflow build, not a framework demo.

This is the hub reference. It pairs with:

- `references/icp-and-positioning.md` — who the site is for; sets the six creative axes
- `references/brand-and-art-direction.md` — colour, type, spacing, depth, grids
- `references/motion-and-interaction.md` — the motion system
- `references/mobile-first.md` — mobile-first method and Core Web Vitals gates
- `checklists/08-creative-review.md` — the anti-generic launch gate

## The Core Rule

Every visual default must be a deliberate, documented decision — never a framework default left untouched.

A site is "generic" when it ships unmodified framework defaults. The fix is never "do the opposite once". It is to make a recorded choice for colour, type, layout, depth, and motion, and to derive that choice from the ICP.

## Creative Sequence

Run this before and during any build, audit, or migration:

1. Define the ICP and set the six creative axes — `icp-and-positioning.md`.
2. Derive design tokens (colour, type scale, spacing, depth, radius) from those axes — `brand-and-art-direction.md`.
3. Build mobile-first; treat Core Web Vitals as gates — `mobile-first.md`.
4. Add a motion system within the performance budget — `motion-and-interaction.md`.
5. Pass `checklists/08-creative-review.md` before marking production-ready.

## The "AI / Template" Tells

A page fails creative review if it carries a cluster of these. Each one must instead be a recorded decision.

**Colour**
- Raw default Tailwind palette (`bg-white`, `text-gray-900/600`, `bg-blue-600` CTAs).
- "Default blue" accent (hue ≈ 250°) used because it is the fallback.
- Pure `#FFFFFF` background with near-black `#0A0A0A`/`#111827` text.
- Hue-neutral greys with no temperature.
- A single flat accent and no supporting or semantic colour system.

**Typography**
- System font stack, or Inter used unmodified for both headings and body.
- No display typeface — headings are just bigger, bolder body text.
- A flat type scale; headings only 2–3× body size.
- Default tracking/leading on large headings (should be negative tracking, tight leading).

**Layout**
- Everything centred — eyebrow, headline, subhead, button, every section.
- The repeated 3-up icon-card grid used as the only content pattern.
- Emoji icons, or default outline icons at uniform size/stroke with no custom set.
- Identical `py-20`-style padding and identical eyebrow/H2/paragraph/grid rhythm on every section.
- Generic hero: flat/gradient band, centred H1, one sentence, one solid + one outline button.

**Depth & surface**
- Flat fills only, or default `shadow-md`/`shadow-lg` grey blur on every card.
- No texture, grain, layering, or considered radius system.
- Hairline borders left as default light grey.

**Motion**
- Zero motion, or one global `fade-in-up` applied to everything identically.
- `transition: all 0.3s ease` everywhere.

**Content & finish**
- Stock "team at laptop" photography, or no imagery direction at all.
- No designed empty, loading, or error states.
- Vague copy ("Empower your workflow", "Seamlessly integrate").
- Default focus ring, or `outline: none` with no replacement.

## The Polish Bar

The details that separate a bespoke build from a template:

- **Designed empty/loading/error states.** Empty states get an illustration and a next action. Loading uses skeletons matching the final layout. Errors are specific and recoverable.
- **Accessible, on-brand focus.** `:focus-visible` with a branded ring meeting 3:1 contrast. Never `outline: none` with nothing in its place.
- **Asymmetry and intentional whitespace.** Whitespace is an active design element, not uniform padding.
- **Content-driven layout.** Compose around real copy and real assets; vary section structure on purpose.
- **Micro-detail consistency.** Hover and active states on everything interactive; one icon set; one shadow system; reused transition tokens.
- **Real, specific copy.** Concrete nouns and outcomes in the brand voice.

## One Signature Moment

Every site needs one memorable, custom moment a visitor remembers — a striking type composition, a custom interaction, an unexpected (tasteful) scroll effect. Templates have none. Plan exactly one per site; do not scatter many.

## Webuild Rule

A site is not production-ready if it reads as a generic AI/template build. Creative review (`checklists/08-creative-review.md`) is a launch gate with the same standing as SEO, accessibility, and security.
