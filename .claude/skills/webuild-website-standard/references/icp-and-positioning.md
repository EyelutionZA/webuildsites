# ICP and Positioning Reference

## Purpose

Design decisions flow from the customer, not from framework defaults. Before any tokens are built, the project brief must record the Ideal Customer Profile (ICP) and the six creative axes derived from it.

## ICP First

Document, in `webuild.config.json` or the project brief:

- who the site is for (role, context, what they already believe)
- what industry conventions they expect to see
- what they need in order to act (trust, proof, speed, clarity)
- the primary device and context (most B2C and trades traffic is mobile, interrupted, one-handed)
- the one job of the site and the single primary conversion

A site that does not record its ICP cannot be creatively reviewed. Stop and gather this first.

## The Six Creative Axes

Set each axis explicitly. These drive every token and layout decision.

| Axis | Range |
|---|---|
| Information density | sparse ↔ dense |
| Motion intensity | still ↔ kinetic |
| Colour temperature & chroma | muted ↔ vivid |
| Type voice | classical ↔ experimental |
| Imagery | photographic ↔ illustrative ↔ abstract |
| Radius posture | sharp ↔ soft |

Record the chosen setting and a one-line reason for each. `brand-and-art-direction.md` and `motion-and-interaction.md` consume these settings.

## Industry Archetypes

Worked examples. Use the closest archetype as a starting point, then tune to the specific ICP — do not copy blindly.

### Law firm / professional services
ICP is cautious, risk-averse, values authority and longevity.
- Type: serif or transitional display for authority, clean grotesque body.
- Colour: restrained — deep navy/charcoal/burgundy/forest, warm off-white background, one understated accent; low chroma; 2–3 colours.
- Density: moderate and calm; generous whitespace signals discretion.
- Motion: minimal and slow — gentle fades only; no parallax, no magnetic buttons.
- Imagery: real, dignified photography; muted grade.
- Radius: sharp (0–4px).

### SaaS startup
ICP is product-savvy, time-poor, wants clarity and proof.
- Type: distinctive geometric/grotesque display, clean body.
- Colour: a chosen vivid brand hue (deliberately not default blue), temperatured neutrals, a true contrasting accent; designed dark mode.
- Density: medium-high — bento layouts, product UI front and centre; no 3-up clones.
- Motion: moderate and purposeful — scroll reveals, product micro-interactions, tasteful stagger; fast and snappy.
- Imagery: crisp product UI, abstract gradient/mesh accents, custom icon set.
- Radius: soft (8–16px).

### Creative studio / agency / portfolio
ICP is design-literate and judges the studio by the site itself.
- Type: expressive, experimental display — oversized, can be the hero; tight tracking; variable-font play.
- Colour: bold and opinionated — near-monochrome with one electric accent, or a rich unconventional pairing; P3 chroma welcome.
- Density: sparse, editorial; dramatic whitespace, asymmetry, broken/overlapping grids.
- Motion: high intensity — signature scroll effects, view transitions, cursor interaction, tasteful parallax. This is where a JS motion library is justified. Still honours reduced motion.
- Imagery: art-directed photography or bespoke illustration; the work is the imagery.
- Radius: often sharp (0px) or one deliberate statement radius.

### Trades / local business (plumber, electrician, builder)
ICP needs trust and fast contact, usually on mobile, often on the move.
- Type: sturdy, highly legible sans; large sizes; high contrast.
- Colour: strong, friendly, high-visibility — a confident primary plus a high-contrast CTA colour; warm neutrals.
- Density: low — one clear message and one action per screen.
- Motion: very light — subtle reveals only; nothing that delays content.
- Imagery: authentic photos of real work, team, and vehicles — never stock; trust badges, reviews, service-area map.
- Mobile-first is non-negotiable: sticky "Call now" / "Get a quote" in the thumb zone, 48px+ targets, fast LCP.
- Radius: soft and friendly (8–12px).

## Webuild Rule

The brief records the ICP and the six-axis settings before any tokens are built. Tokens, type scale, motion budget, and imagery direction derive from those settings — never from framework defaults, and never from a generic "modern website" assumption.
