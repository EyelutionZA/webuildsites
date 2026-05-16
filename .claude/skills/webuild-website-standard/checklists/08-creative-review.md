# 08 — Creative Review Checklist

Use this before launch, alongside `06-production-readiness.md`. A site that builds, deploys, and ranks but reads as a generic AI/template build is not production-ready.

References: `references/creative-direction.md`, `icp-and-positioning.md`, `brand-and-art-direction.md`, `motion-and-interaction.md`, `mobile-first.md`.

## ICP and Positioning

- [ ] ICP recorded: audience, industry, what they need to act, primary device
- [ ] Six creative axes set with a reason each: density, motion, colour, type, imagery, radius
- [ ] One primary conversion is clear on every key page
- [ ] Copy is specific to the brand and ICP — no "Empower your workflow" filler

## Anti-Generic Gate

Every item below must be a deliberate, documented decision — not a framework default.

- [ ] No raw default Tailwind palette (`bg-white` / `text-gray-*` / `bg-blue-600`)
- [ ] Accent is a chosen hue, not default ≈250° blue
- [ ] Background and text are tinted, not pure `#FFFFFF` / near-black
- [ ] Neutrals have a consistent temperature (warm or cool)
- [ ] A real display typeface is used; headings are not just bigger body text
- [ ] Type scale is a fluid `clamp()` modular scale with dramatic display contrast
- [ ] Large headings use negative tracking and tight leading
- [ ] Layout is not all-centred; asymmetry and intentional whitespace are used
- [ ] Content patterns vary — not a repeated 3-up icon-card grid
- [ ] Custom or consistent icon set — no emoji icons
- [ ] Section padding and rhythm vary intentionally
- [ ] Depth uses layered, tinted shadows — not default grey blur
- [ ] One consistent radius posture applied system-wide
- [ ] One signature moment is present and intentional

## Motion

- [ ] Motion budget matches the ICP motion-intensity axis
- [ ] Motion is CSS-first; a JS motion library is used only where justified
- [ ] `static` projects ship no motion JavaScript
- [ ] Authored easing curves are used — not `linear` or default `ease`
- [ ] Only `transform`/`opacity` are animated
- [ ] `prefers-reduced-motion` has a designed calm fallback; end states are always reachable
- [ ] No animation regresses LCP, INP, or CLS

## Mobile-First

- [ ] Designed and reviewed on a ~390px canvas first
- [ ] Touch targets ≥ 44×44 px (24px absolute floor), ~8px apart
- [ ] Primary actions reachable in the thumb zone
- [ ] Safe-area insets handled; viewport meta uses `viewport-fit=cover`
- [ ] Body text ≥ 16px on mobile
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile

## Polish Bar

- [ ] Empty, loading, and error states are designed
- [ ] `:focus-visible` styles are branded, visible, and meet 3:1 contrast
- [ ] Hover and active states on every interactive element
- [ ] Imagery has a defined art direction — no unmanaged stock photography
- [ ] Layout is composed around real content, not poured into a fixed template

## Output Required

1. Creative review: pass / fail / conditional
2. ICP and six-axis settings summary
3. Anti-generic findings and what was changed
4. Motion budget and approach
5. Mobile-first and Core Web Vitals status
6. The site's one signature moment
7. Remaining creative risks before launch
