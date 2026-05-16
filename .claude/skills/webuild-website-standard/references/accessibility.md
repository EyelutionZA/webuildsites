# Accessibility Reference

## Purpose

Accessibility is a production requirement, not a nice-to-have.

Use this reference when building, auditing, migrating, or launching websites under the Webuild standard.

## Baseline Standard

Aim for practical WCAG 2.2 AA-aligned implementation where reasonable.

Every production website should support:

- keyboard navigation
- visible focus states
- readable colour contrast
- semantic HTML
- proper labels for forms
- meaningful link text
- useful alt text for meaningful images
- decorative images marked appropriately
- logical heading hierarchy
- no keyboard traps
- responsive zoom-friendly layouts
- reduced motion consideration for heavy animation

## Navigation

Check:

- users can tab through nav links in a logical order
- mobile menu can be opened and closed with keyboard
- active/focus state is visible
- skip link exists on larger/complex sites
- nav labels are understandable without visual context

## Forms

Every form should have:

- programmatic labels
- clear required fields
- accessible error messages
- success state announced or clearly visible
- validation that does not rely only on colour
- submit button text that describes the action

Avoid placeholder-only labels.

## Colour and Visual Design

Check:

- body text contrast is readable
- buttons and links are visually distinct
- focus rings are not removed
- important text is not embedded only in images
- line-height and spacing support readability

## Motion and Interaction

Animations should not block usability.

Check:

- no essential content depends on animation
- hover-only interactions also work with keyboard/touch
- reduced-motion users are respected where animation is heavy
- modals/drawers manage focus correctly if used

## Media

Check:

- meaningful images have useful alt text
- decorative images use empty alt text
- videos have captions where practical
- autoplay media is avoided unless muted and non-essential

## Production Readiness Red Flags

- button/div elements used as links without keyboard handling
- clickable elements with no accessible name
- inputs without labels
- focus outline removed globally
- modal opens but focus stays behind it
- mobile menu unusable by keyboard
- low-contrast grey text everywhere
- headings chosen for style instead of structure

## Webuild Rule

A site should not be marked production-ready if users cannot navigate, understand, and submit the main conversion path without a mouse.
