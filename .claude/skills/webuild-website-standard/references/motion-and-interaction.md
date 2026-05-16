# Motion and Interaction Reference

## Purpose

Motion is a craft requirement, not decoration and not a hazard. A Webuild site should move with intent — and it must stay within the performance budget and respect reduced-motion as a designed state.

## Default Stack: CSS-First

Use native CSS for motion. Reach for a JavaScript library only when CSS genuinely cannot express the interaction.

| Use **pure CSS** for | Use **Motion** (`motion.dev`) for |
|---|---|
| Hover / focus / press transitions | Orchestrated multi-step sequences |
| Scroll reveals (`animation-timeline: view()`) | Layout animations (FLIP / shared elements) |
| Scroll progress (`animation-timeline: scroll()`) | Enter/exit of conditionally rendered components (`AnimatePresence`) |
| Simple keyframe loops | Gesture / drag, spring-driven interaction |
| Route transitions (View Transitions API) | Complex stagger logic in SPAs |

Do not add a motion library to do what CSS does for free — that is bloat and it violates the Performance Rule. `static` projects should ship zero motion JS; CSS-first keeps them genuinely static.

## Scroll-Driven Animation

The 2026 baseline for scroll effects is CSS scroll-driven animation — off the main thread, no jank, no scroll listeners.

- `animation-timeline: scroll()` ties progress to a scroll container (e.g. a reading-progress bar).
- `animation-timeline: view()` ties progress to an element's visibility — entrance reveals, tasteful parallax. Pair with `animation-range`.

```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(2rem); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    animation: reveal linear both;
    animation-timeline: view();
    animation-range: entry 10% cover 35%;
  }
}
```

Browser support is Chromium and Firefox, not yet Safari — treat it as **progressive enhancement**. The finished (un-animated) state must be the visible default, so non-supporting browsers simply show completed content. Never leave content stuck at `opacity: 0`.

## View Transitions

- **Same-document** (`document.startViewTransition()`) — Baseline; use for SPA route changes, filtering, expand/collapse.
- **Cross-document (MPA)** — enable with `@view-transition { navigation: auto; }`; use for multi-page marketing sites so navigation feels app-smooth. Degrades to instant navigation where unsupported.
- Use `view-transition-name` to morph a specific element (a card into its detail hero).

## Entrance and Reveal

- **Stagger** children ~60–120ms apart so a list feels choreographed, not dumped.
- Reveal distance carries meaning: small (8–24px) translate + opacity for body content; larger moves only for hero focal elements.
- Clip/mask reveals (`clip-path`, `mask`) read more premium than plain fades for headlines and images.
- Never animate everything the same way — one global identical fade is itself a tell.

## Micro-interactions

- **Hover:** subtle scale (`1.02–1.04`), elevation, or colour/position shift — never `scale(1.2)`.
- **Press / active:** small `scale(0.97–0.98)` for tactile feedback. Most generic sites skip this.
- **Focus:** designed, branded, visible — see Easing and the Polish Bar in `creative-direction.md`.
- **Magnetic buttons / cursor effects:** tasteful, one or two per site, on hero CTAs only. Disable on touch and under reduced-motion.
- Animate **state** (loading → skeleton, optimistic UI, success), not just decoration.

## Easing — What Reads as Premium

`linear` and the default `ease` are the cheap tells. Define authored curves as tokens.

| Use | Curve |
|---|---|
| Entrances, reveals | `cubic-bezier(0.16, 1, 0.3, 1)` — ease-out expo |
| UI state, hovers | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Exits | `cubic-bezier(0.4, 0, 1, 1)` |
| Emphasis / playful | `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot |

Things that arrive use an **asymmetric ease-out** — a slow, soft landing. Durations: micro-interactions 120–200ms; entrances 400–700ms; large hero moments up to ~900ms. For input-driven interaction (drag, magnetic) use spring physics rather than time-based curves.

## Performance Budget

- Animate only `transform` and `opacity` (compositor-only). Avoid animating `width`, `height`, `top`, `margin`, `box-shadow`.
- Use `will-change` sparingly; remove it after the animation.
- Prefer CSS scroll-driven animation over JS scroll listeners.
- No animation may regress Core Web Vitals: none that causes layout shift (CLS), delays the LCP element, or adds main-thread work that hurts INP. See `mobile-first.md`.
- Motion is tree-shakeable — import only what is used.

## Reduced Motion as a Designed Fallback

`prefers-reduced-motion` is not an on/off switch. The reduced-motion experience is its own designed state.

- Author the **default** CSS as reduced-safe (calm fade/dissolve, instant colour change). Layer richer motion inside `@media (prefers-reduced-motion: no-preference)`.
- **Replace, do not just remove** — swap parallax/slide/scale for a calm equivalent; content still arrives gently.
- The end state must always be reachable.
- In Motion, read `useReducedMotion()` and branch to the calm variant.
- Anything that loops or runs longer than 5s needs a pause control regardless of preference.

## Webuild Rule

Every site has a motion budget set from the ICP motion-intensity axis. Motion is purposeful, CSS-first, easing-tokened, and reduced-motion-designed. A site with zero motion, or with one indiscriminate global fade, fails creative review.
