---
name: phanatik-design
description: Phanatik's design system: typography, color, spacing, and component rules. Use whenever creating or modifying UI in this theme (new pages, sections, components) so the result matches Phanatik's visual language.
---

# Phanatik design system

Phanatik is a world sports news theme with newspaper structure and none
of the newspaper looks: a white ground, one sans family, dense grids of
story cards, sidebars with scores and most read, and photographs that
carry all the colour. New UI here should be indistinguishable from the
existing pages.

## Design personality

- A newsroom, not a magazine: many stories per screen, clear hierarchy
  by card size, a main column with a sidebar.
- One voice: Switzer throughout, semibold headlines, regular and medium
  text.
- Photographs are the colour. Chrome stays white, near-black and grey.
- Dark grounds for weight: the footer, the auth form halves and the ads
  use `bg-foreground text-background`.
- Quiet interaction: hovers go to `text-muted-foreground`, images scale
  slightly inside their frame.

## Typography

One token in `src/styles/fonts.css`, loaded in `fundations/head/Fonts.astro`:

- `--font-sans`: **Switzer** (Fontshare, 400 to 700, regular and italic).

Never introduce another font. No uppercase anywhere, and no kickers or
labels above headings.

The recurring styles:

- **Page heading**: `global/PageHeader` (`displayXL`, semibold, tight
  tracking, the intro stacked under it in `textLG text-muted-foreground`,
  an optional `action` slot on the right, a `border-b border-muted` rule).
  Use it on every page that is not the front page or a story.
- **Story headlines**: set by `stories/StoryCard` per size; never restyle
  a headline outside the card.
- **Section header**: `landing/SectionHeader` (title, optional link on the
  right, a `border-t border-muted` rule above). Inside sidebars pass
  `divider={false}`.
- **Meta**: under the headline in `text-xs text-muted-foreground`: live
  mark, writer in `font-medium text-foreground`, sport, date. Plain text,
  no brackets.
- **Numbers**: scores, prices and stats use `tabular-nums`.

`Text` (`fundations/elements/Text.astro`) only takes the tags in its
`Props` and has no class merging: never pass a size class alongside a
`variant`. When a responsive size has no variant, use the plain tag with
classes. `tracking-tight` is for headings and large text only, never on
base size or smaller.

## Color system

Four tokens in `src/styles/colors.css`, nothing else:

- `background`: pure white page ground, and the text on dark grounds.
- `foreground`: near-black navy for headlines, body, the primary button
  and the dark grounds.
- `muted`: hairlines (`divide-muted`, `border-muted`), inputs, the muted
  button.
- `muted-foreground`: meta, secondary text, hovers on ink text.

No accent and no tinted panels. On dark grounds secondary text is
`text-background/60` or `/70`, lines `border-background/15`, and the
button is the `muted` variant.

## Layout and spacing

- Every section is a `<section>` (ground classes only) wrapping a `Wrapper`:
  `variant="standard"` is `max-w-7xl mx-auto px-4 lg:px-8 w-full`.
- Sections use `py-12`; the page header `pt-12`. One value per property,
  never `mb-*`.
- The 12 column grid drives splits: main 8 and sidebar 4 on story and
  sport pages (the sidebar with `lg:pl-8 lg:border-l lg:border-muted`),
  4 and 8 on writer and legal pages. Blocks side by side fill the grid.
- Lists of stories sit in `ul.divide-y.divide-muted` with `py-4` to
  `py-6` rows, or in grids of `standard` cards.
- No boxes around sections, no shadows on cards, no gradients.

## Images

- Rounded, by size: `rounded-xl` on lead images, `rounded-lg` on standard
  cards, `rounded-md` on compact cards and avatars. Nested radii are
  concentric (`rounded-2xl` with `p-2` holds `rounded-lg`).
- Photos are 3:2 (`aspect-3/2 object-cover`), portraits 4:5.
- Hover: an `overflow-hidden` wrapper, the image with `duration-500
  ease-out group-hover:scale-102`.
- Request the source size from Astro `<Image>` and crop with CSS.

## Components

Reuse before writing anything new:

- **StoryCard** (`stories/StoryCard.astro`): sizes `large` (front page
  and sport leads), `standard` (grids), `compact` (lists with a small
  image), `row` (sidebars, text only). Use it for every story.
- **MostRead**, **ScoresList** (`stories/`): sidebar blocks.
- **AdBanner**, **AdSidebar** (`ads/`): the dark ad strip and sidebar card.
- **Button** (`fundations/elements/Button.astro`): variants `default`,
  `muted`, `none`; sizes `xxs` to `xl` with baked-in radius. Its base is
  `flex`, so a standalone button sits in a `<div class="flex">`. One
  default button per view; secondary actions use `muted`.
- **Wrapper**: the only page-width container.
- Icons live in `fundations/icons/` as Astro components; add new ones in
  the same style, never text glyphs or icon packs.

## Voice and copy

Direct and specific, like a sports desk: who, what, where, the score.
Sentence case, no exclamation marks, no emoji. People get Spanish, Nordic
or Italian names. No em dashes or middle dots.

## Do / Don't

Do:

- Build pages from `PageHeader`, `SectionHeader` and `StoryCard`.
- Put the meta under the headline.
- Keep sidebars to text rows, numbers and the ad card.

Don't:

- Don't use uppercase, kickers or bracketed meta.
- Don't add an accent colour, tinted panels, shadows or gradients on cards.
- Don't put a border above sidebar blocks or under headers that already
  have a rule.
- Don't add progress bars, meters or coloured bars.

## Quality check before finishing

1. Fonts, colours and spacing come from existing tokens and match a
   sibling section.
2. The section reads at `sm`, `md` and `lg`; grids stack on mobile.
3. Headlines are semibold, nothing is uppercase, meta sits under the text.
4. No new dependencies, no unused imports, minimal diff.
