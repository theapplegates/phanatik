---
name: phanatik-design
description: Phanatik's design system - typography, color, spacing, and component rules. Use whenever creating or modifying UI in this theme (new pages, sections, components) so the result matches Phanatik's newsroom visual language.
---

# Phanatik design system

Phanatik is a newsroom / magazine theme: dense editorial grids, serif display
type over a sans UI, hairline rules instead of boxes, and a single blue accent
on an otherwise monochrome page. New UI you build here should be
indistinguishable from the existing pages.

## Design personality

- Newspaper, not landing page: multi-column grids, sticky asides, uppercase
  section labels, and lots of small type doing real work.
- Hairlines over borders: sections are separated by a signature
  "tick + hairline" pseudo-element rule, not by cards, boxes, or shadows.
- Monochrome with one blue: nearly everything is the `base` gray scale; the
  indigo-blue `accent` scale appears only on links, focus rings, buttons, and
  one gradient hero card.

## Typography

Two fonts, both configured in `src/styles/global.css` under `@theme` and
loaded in `fundations/head/Fonts.astro`. Never introduce another font.

- **Inter / InterVariable** (`--font-sans`, the default; loaded from rsms.me
  with `font-feature-settings: "liga" 1, "calt" 1`) - all UI, body, labels.
- **STIX Two Text** (`--font-display`, a Google Fonts serif) - applied via
  the `font-display` class on article titles, page headings, and prose
  headings. This serif-on-sans contrast is the theme's typographic identity.

Always use the `Text` component (`@/components/fundations/elements/Text.astro`)
instead of raw tags with ad-hoc sizes. Variants: `display6XL`-`displayXS`
(responsive display scale) and `textXL`-`textXS`.

- Section kicker/label: `variant="textXS"` + `uppercase font-medium
  text-base-900`; when it links to an index, make it `tag="a"` with
  `flex gap-x-2 justify-between` and a trailing "More stories" span +
  `ChevronRight class="size-4"`.
- Article-page h1 (blog/podcast layouts): `tag="h1" variant="displaySM"` +
  `font-medium font-display text-balance`.
- Card title: `tag="h3" variant="textXL"` + `font-medium font-display
  text-base-900 group-hover:underline`.
- Card description: `variant="textBase"` + `tracking-tight text-base-600`,
  `mt-2` under the title.
- Meta lines (author, date · reading time): `variant="textSM"` /
  `variant="textXS"` + `font-medium text-base-600`.
- The huge variants (`displayXL`-`display6XL`) exist but real pages top out
  at `displayMD` (hero slider card); don't reach for giant type.

Heading weight is `font-medium` (or the serif's default `font-normal` in
prose - the prose Wrapper sets `prose-headings:font-display
prose-headings:font-normal`). `font-bold` appears only in pricing price
figures; never on headings or body.

## Color system

Exactly two custom oklch scales in `src/styles/global.css` under `@theme`:
`accent` (a saturated indigo-blue, 50-950) and `base` (a cool neutral gray,
50-950). Use only these - never default Tailwind palette names, never hex
values in markup.

- Page background is white. Text: `text-base-900` headings, `text-base-600`
  body/meta, `text-base-400`/`500` placeholders and faint labels.
- Hairline rules are `bg-base-950` (the solid 6px tick) and `bg-base-950/10`
  (the faint remainder) - see Layout below.
- `accent` is reserved for interaction: links (`text-accent-500`,
  `hover:text-accent-700`), focus rings (`focus:ring-accent-500`), form
  input text (`text-accent-700`), and Button variants. Don't paint whole
  sections in accent tints.
- The one sanctioned dark surface is the art-directed hero card
  (`BlogCard6.astro`): photo + `bg-linear-45 from-accent-950
  via-accent-900/80 to-transparent` overlay, white text, `text-base-300`
  description, and a **white** version of the hairline (`before:bg-white
  after:bg-white/10`).
- Subtle fills use `bg-base-50` (ticker bar) and `bg-base-100` (subscribe
  panel, muted buttons, inputs).
- There is **no dark mode** (a single stray `dark:` typo in
  `Navigation.astro` notwithstanding). Don't add `dark:` classes.

## Layout and spacing

- Every section is `<section>` wrapping a `Wrapper`
  (`@/components/fundations/containers/Wrapper.astro`): `variant="standard"`
  (`max-w-screen 2xl:max-w-[100rem] px-8`) for pages, `variant="prose"` for
  markdown bodies (usually constrained further with `max-w-xl mx-auto`),
  `variant="fullWidth"` rarely. Don't hand-roll `max-w-* mx-auto` wrappers.
- Page-level Wrapper padding is `py-12` (sub-blocks use `py-4`); the
  homepage is one big `py-12` Wrapper containing the whole grid.
- **The signature divider** under every section label is a pseudo-element
  hairline, not a `<hr>` or `border-t`:
  `relative before:absolute after:absolute before:bg-base-950 after:bg-base-950/10
  before:top-0 before:left-0 before:h-px before:w-6 after:top-0 after:right-0
  after:left-8 after:h-px pt-4 mt-2` - a short solid black tick plus a faint
  full-width line. A vertical variant (`before:h-6 before:w-px after:w-px`)
  separates grid columns on `lg:`. Reuse this string verbatim.
- Homepage anatomy: newspaper grid `grid grid-cols-1 lg:grid-cols-4` with
  `lg:col-span-3` main column and a sticky aside (`lg:sticky lg:top-10
  lg:z-20`); columns touch via `lg:pr-8` / `lg:pl-8` padding (with the
  vertical hairline on the seam), not `gap`.
- Rhythm: `mt-2` from kicker to hairline block, `mt-8` from tag list to card
  title and between stacked blocks, `mt-12` between major section groups,
  `gap-8` in card grids (`gap-x-8 gap-y-24` on the categories grid),
  `gap-4` for tight card stacks.
- Cards use the link-overlay pattern: `<article class="relative ... group">`
  with an absolutely-positioned `<a class="absolute inset-0 z-10">` covering
  the card and `group-hover:underline` on the title - no wrapping the whole
  card in an anchor.
- Images: `object-cover w-full` with an explicit aspect ratio
  (`aspect-16/11` cards, `aspect-4/2` wide), explicit `width`/`height`, and
  `rounded-xl`.

## Components

Reuse these before writing anything new:

- **Button** (`fundations/elements/Button.astro`): variants `default`
  (near-black `bg-accent-950`), `accent` (`bg-accent-600`), `muted`
  (`bg-base-100 text-base-900`), `none`; sizes `xxs`-`xl` with fixed heights
  (`h-7.5`-`h-13`) and **radius baked into the size** (`rounded-md` for
  xxs/xs, `rounded-lg` from sm up) - never add your own `rounded-*`.
  `isLink` + `href` renders an anchor; `iconOnly` + `onlyIconSize` for icon
  buttons; `gap` prop (`xs`-`lg`) for icon spacing.
  **Width is a per-use decision** - the component renders a block-level
  `flex` that stretches to its container: form submits and auth/social
  buttons get `w-full`; buttons inside a flex row (nav, forms with inline
  submit) get no width class. Real pages use the small end of the scale
  (`xs`, `sm`, `base`); `variant="accent"` for form submits,
  `variant="default"` for the primary nav CTA, `variant="muted"` for
  secondary actions.
- **Text**: the only sanctioned type scale (see Typography).
- **Wrapper**: the only page-width container.
- **ShareButtons** (`fundations/elements/ShareButtons.astro`): social
  sharing row on article pages.
- Icons live in `fundations/icons/` as individual Astro components
  (ChevronRight, Play, Pause, ...); add new ones there in the same style
  rather than importing icon packs.
- Blog/podcast cards are numbered variants (`BlogCard1`-`BlogCard7`,
  `PodcastCard1`-`PodcastCard4`) each with a fixed editorial role (featured,
  brief, top story, hero slide...) - pick the existing card that matches the
  slot before designing a new one.
- **NavTicker** + **BlogTicker**: the marquee headline bar
  (`animate-marquee` + `pause-on-hover` from `global.css`, `bg-base-50`,
  `scrollbar-hide`). The `@theme` block also defines `rightMarquee` and
  `slowMarquee` timings.
- Forms: inputs are `h-9`/`h-10 px-4 py-2 text-sm text-accent-700
  bg-base-100` (or `bg-white` on tinted panels) `border border-transparent
  rounded-lg` with `focus:ring-accent-500 focus:ring-offset-2 focus:ring-2`;
  labels are `text-xs text-base-600`.

## Corners, borders, shadows

- Radius policy (real counts): `rounded-lg` (48x - inputs, buttons, small
  media) and `rounded-xl` (30x - card images, panels) do almost all the
  work; `rounded-2xl` only on the hero slider card; `rounded-md` only on
  xxs/xs buttons. No sharp-cornered rectangles, but nothing rounder than
  `rounded-2xl` either (`rounded-full` is not used in markup).
- Separation comes from the hairline pseudo-element pattern and whitespace -
  **not** from borders. Visible borders are essentially only
  `border-transparent` on inputs.
- Shadows are near-absent: `shadow-xs` (16x) on small floating UI (share
  buttons, sticky player, search overlay), nothing larger. Never put a
  shadow on a card or section.

## Voice and copy

Body copy reads like earnest journalism: declarative, first-person-plural,
serious ("stories that matter", "transparency, accuracy, and impartiality").
Headlines are news-style statements, often with a colon ("Global Economic
Shifts: What to Expect in 2025"). Microcopy is allowed one wink ("We won't
spam you on weekdays, only on weekends."). Section labels are uppercase via
CSS (`uppercase` class, not typed caps); button labels are short Title Case
("Apply Now", "Send Reset Link"). No exclamation marks in headlines, no
emoji.

## Do / Don't

Do:

- Copy an existing section's structure (kicker → hairline → grid of cards)
  before inventing a new layout.
- Put `font-display` on every heading that represents editorial content, and
  `text-balance` on multi-line headings.
- Use the pseudo-element hairline string for any new section divider, and
  its white variant on dark overlays.
- Keep asides sticky (`lg:sticky lg:top-10`) in multi-column pages.

Don't:

- Don't use border/`<hr>` dividers, boxed cards, or shadows to separate
  content - hairlines and whitespace only.
- Don't introduce new fonts, colors outside the `accent`/`base` scales,
  or default Tailwind `gray`/`slate`/`zinc` classes.
- Don't add `rounded-*` to Buttons (the size provides it) or exceed
  `rounded-2xl` anywhere.
- Don't add `dark:` classes - the theme has no dark mode.
- Don't inline a heading with raw classes when `Text` has a variant for it,
  and don't exceed `font-medium` on headings.

## Quality check before finishing

1. Fonts, colors, and spacing all come from existing tokens and match a
   sibling section; headings use `Text` variants + `font-display`.
2. New section reads correctly at `sm`, `md`, and `lg` breakpoints,
   including the sticky-aside behavior.
3. Dividers use the tick + hairline pattern; no stray borders or shadows.
4. No new dependencies, no unused imports, minimal diff.
