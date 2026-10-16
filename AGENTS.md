# AGENTS.md: Phanatik (Lexington Themes)

**Design rules:** [.cursor/skills/phanatik-design/SKILL.md](./.cursor/skills/phanatik-design/SKILL.md). Read it before creating or changing any UI.

**Phanatik** is an Astro template for a world sports news site: a sticky navigation with a live scores ticker, a dense front page of story cards in four sizes, sport fronts with scores and most read, story pages with a sidebar, and writer profiles. Plus Membership (monthly and yearly), Newsletters, Advertise, About, Contact, Sign in, Sign up, Legal, a 404 and a system styleguide. The demo brand is The Absurdist, a world sports site covering football, basketball, tennis, cycling, Formula 1 and athletics.

## Tech stack

| Area | Details |
|------|---------|
| **Framework** | [Astro](https://astro.build/) 7 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) 4 via `@tailwindcss/vite` |
| **Content** | Markdown content collections in `src/content.config.ts` |
| **Integrations** | `@astrojs/sitemap`, `@astrojs/rss` |
| **Tailwind plugins** | `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide` (the navigation rows) |
| **Scripts** | `lenis` (smooth scroll, in `BaseLayout`) |
| **SEO** | `@lexingtonthemes/seo` (`AstroSeo` in `src/components/fundations/head/Seo.astro`) |
| **Aliases** | `@/*` maps to `src/*` (`tsconfig.json`) |

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | Routes. Every page is composed of section components |
| `src/layouts/` | `BaseLayout`, `StoryLayout`, `WriterLayout`, `LegalLayout` |
| `src/components/` | `fundations/` (design system), `global/` (navigation, footer, page header, 404), `landing/`, `stories/`, `sports/`, `writers/`, `membership/`, `newsletters/`, `advertise/`, `ads/`, `about/`, `contact/`, `auth/`, `legal/`, `system/`, `assets/` |
| `src/content/` | Markdown sources for the `writers`, `stories` and `legal` collections |
| `src/lib/` | `sports.ts` (the sport list, slugs and intros), `scores.ts` (ticker and scores data), `stories.ts`, `writers.ts` (sorted lists and URLs), `format.ts` (dates) |
| `src/styles/` | `global.css` (Tailwind, plugins, button shadows, the `current:` variant), `colors.css` (colour tokens), `fonts.css` (font tokens) |
| `src/images/` | Story photos, writer portraits and the ad image |

## Colour tokens (`src/styles/colors.css`)

`background` (white), `foreground` (near-black navy, also the dark footer and auth panels), `muted` (hairlines, inputs, the muted button) and `muted-foreground` (secondary text). There is no accent: the photographs carry the colour. Use opacity modifiers (`text-background/60`) instead of new tokens, and keep `/system/colors` in sync.

## Fonts (`src/styles/fonts.css`)

`--font-sans` is Switzer (Fontshare), the only font: semibold for headlines, regular and medium for body and interface. It loads in `fundations/head/Fonts.astro`.

## Content collections (`src/content.config.ts`)

IDs are the filename without `.md`.

- **`writers`**: `name`, `role`, `bio`, `image { url, alt }`. Template: `src/content/writers/chiara-benassi.md`.
- **`stories`**: `title`, `pubDate`, `description`, `sport`, `writer` (reference to `writers`), `image { url, alt }`, `placement` (`lead`, `featured` or `standard`), `live`, `members`. The `lead` story opens the front page, `featured` stories sit next to it. Template: `src/content/stories/matteo-valsecchi-wins-il-lombardia-alone-in-the-rain.md`.
- **`legal`**: `page`, `pubDate`. Template: `src/content/legal/terms.md`.

`sport` is one of the values in `src/lib/sports.ts`. Do not widen a schema without updating every page, layout and card that reads `entry.data`.

## Routing

| URL | Source |
|-----|--------|
| `/` | `src/pages/index.astro`: lead, featured stories, sport spotlight, ad, sports grid, opinion, members only |
| `/sports/[sport]` | Sport front: lead, story list, scores, the desk, most read |
| `/stories/[id]` | Story page (`StoryLayout`) |
| `/writers/`, `/writers/[id]` | Writers and writer profile (`WriterLayout`) |
| `/legal/[...slug]` | Privacy, terms and cookies (`LegalLayout`) |
| `/rss.xml` | Built from the `stories` collection |
| `/system/*` | Styleguide: `overview`, `colors`, `typography`, `buttons`, `link` |
| Other | `about`, `membership`, `newsletters`, `advertise`, `contact`, `signin` and `signup` (no nav or footer), `404` |

## Customization

- **Site URL:** `site` in `astro.config.mjs`, plus the placeholders in `Seo.astro`.
- **Colours and type:** `src/styles/colors.css` and `src/styles/fonts.css`, fonts loaded in `Fonts.astro`.
- **Sports and scores:** `src/lib/sports.ts` and `src/lib/scores.ts`.
- **Navigation and footer:** `src/components/global/Navigation.astro` (ticker, logo, sport links) and `src/components/global/Footer.astro`.
- **Ads:** `src/components/ads/AdBanner.astro` and `AdSidebar.astro`.
- **Shell:** `src/layouts/BaseLayout.astro` (nav and footer toggles, Lenis) and `src/components/fundations/head/BaseHead.astro`.

## Commands

- `npm install`: dependencies
- `npm run dev`: dev server
- `npm run build`: build to `./dist/`
- `npm run preview`: preview the build

## Guardrails

- Keep the folder name **`fundations`** as spelled.
- Pages only compose section components; new sections go in `src/components/<area>/`.
- Colours only through the tokens above. No arbitrary Tailwind values, no `@apply`, no `mb-*`, one spacing value per property (no `mt-12 lg:mt-16`).
- External links in demo content use `href="#_"`.

## Lexington links

- Theme: https://lexingtonthemes.com/templates/phanatik
- Documentation: https://lexingtonthemes.com/documentation
- Changelog: https://lexingtonthemes.com/changelog/phanatik
- Support: https://lexingtonthemes.com/legal/support/
