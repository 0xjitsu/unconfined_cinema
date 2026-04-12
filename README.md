<div align="center">

# The Unconfined Cinema

**Where Philippine Cinema Escapes the Screen**

An immersive cinematic landing page for a Filipino art collective exploring what cinema is — and what else it could be.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](LICENSE)
[![Deploy: Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://unconfinedcinema.art)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-C8A97E?style=flat-square)](CONTRIBUTING.md)

[Quick Start](#quick-start) · [Features](#features) · [Deploy](https://unconfinedcinema.art)

</div>

---

## Why This Exists

The Unconfined Cinema is a Filipino art collective founded in 2020 by **Erwin Romulo** and **Philbert Dy**. They design immersive, unconventional spaces to experience film — blurring the boundaries between cinema, performance, and installation art. Think TeamLab, but for Philippine cinema.

Since 2020, the collective has mounted four projects with collaborators including **Antoinette Jadaone**, **John Lloyd Cruz**, **Bea Alonzo**, **Martika Escobar**, **Nick DeOcampo**, **John Torres**, **Lav Diaz**, and **Silke Lapina**.

This is their digital home — a cinematic landing page that feels like entering a dark gallery where a film is about to begin.

## Quick Start

```bash
git clone https://github.com/0xjitsu/unconfined_cinema.git
cd unconfined_cinema
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

| Feature | Description |
|---------|-------------|
| Cinematic Design System | Dark palette, Cormorant Garamond serif, film grain overlay, glass morphism |
| Word-by-Word Text Reveal | Scroll-linked manifesto animation that unfolds as you scroll |
| Project Showcase | Asymmetric gallery cards with video autoplay on hover |
| Events Integration | Featured event spotlight powered by Luma calendar |
| Collaborator Marquee | Dual-direction name marquee featuring the collective's collaborators |
| Smooth Scroll | Lenis smooth scroll with `prefers-reduced-motion` fallback |
| Framer Motion | Purposeful animations — fade-ups, staggered reveals, magnetic buttons |
| SEO Infrastructure | Sitemap, robots.txt, JSON-LD, dynamic OG images, dynamic favicon |
| AI Agent Ready | `/llms.txt`, `/llms-full.txt`, `/.well-known/ai-plugin.json` |
| Accessibility | Skip nav, focus rings, WCAG AA contrast, 44px touch targets, reduced-motion |
| Contact Form | Supabase-powered API route for commission and collaboration inquiries |

## How It Works

```
Homepage (long scroll)
├── Hero           — typographic title, animated gradient, custom cursor
├── Manifesto      — scroll-linked word-by-word text reveal
├── Projects       — asymmetric gallery cards with video autoplay
├── Events         — featured upcoming event spotlight (Luma)
├── Collaborators  — dual-direction name marquee
└── Call to Action  — commission / attend / join

/projects/[slug]   — SSG detail pages for 4 projects:
                     UC#1 (2020), Love Team (2020),
                     Revolutions Refrains Songs (2022),
                     Dreams Introspection Moving (2026)

/about             — collective info, founders, timeline
/contact           — glass morphism form with ?type= pre-select
/events            — upcoming events page
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, Lenis, nav, grain overlay)
│   ├── page.tsx                # Homepage — 6-section long scroll
│   ├── globals.css             # Tailwind v4 theme + glass utilities
│   ├── icon.tsx                # Dynamic favicon
│   ├── opengraph-image.tsx     # Dynamic OG image (edge runtime)
│   ├── robots.ts               # Robots.txt generation
│   ├── sitemap.ts              # Sitemap generation
│   ├── error.tsx               # Error boundary
│   ├── not-found.tsx           # 404 page
│   ├── loading.tsx             # Global loading state
│   ├── about/                  # About the collective
│   ├── contact/                # Commission / collaborate form
│   ├── events/                 # Upcoming events
│   ├── projects/[slug]/        # Project detail pages (SSG)
│   ├── api/contact/            # Supabase contact form route handler
│   ├── llms.txt/               # AI agent summary (route handler)
│   └── llms-full.txt/          # AI agent full data (route handler)
├── components/
│   ├── home/                   # Hero, Manifesto, ProjectsShowcase,
│   │                           # EventsTeaser, Collaborators, CallToAction
│   ├── layout/                 # Navigation, Footer, GrainOverlay, SmoothScroll
│   ├── projects/               # ProjectDetail
│   └── ui/                     # SectionReveal, TextReveal, MagneticButton,
│                               # CinematicGallery, CustomCursor, FilmCanvas,
│                               # FilmHoverText, ScrollProgressBar, ThemeProvider
└── lib/
    ├── projects.ts             # All project data (content separated from UI)
    └── animations.ts           # Shared Framer Motion variants
```

<details>
<summary><strong>Developer Setup</strong></summary>

### Prerequisites

- Node.js 18+
- npm or bun

### Environment

```bash
cp .env.example .env.local
# Add your Supabase URL and anon key for the contact form
```

### Development

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

### Adding Images

Images currently use placeholder gradients. Drop real images into:

```
public/images/projects/[project-slug]/[descriptor].jpg
```

Then update `src/lib/projects.ts` with image paths.

### Deployment

The site auto-deploys to [unconfinedcinema.art](https://unconfinedcinema.art) via Vercel Git integration on push to `feat/landing-page`.

```bash
# Manual production deploy
npx vercel --prod
```

</details>

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | ![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js) |
| Styling | ![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-38bdf8?style=flat-square&logo=tailwindcss) |
| Animation | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer) |
| Scroll | Lenis smooth scroll |
| Runtime | ![React 19](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) |
| Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| Backend | ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white) |
| Hosting | ![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel) |

## License

<div align="center">

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](LICENSE)
[![Commercial License](https://img.shields.io/badge/Commercial-Available-C8A97E?style=flat-square)](mailto:hello@unconfinedcinema.art)

This project is dual-licensed:

**Open Source** — [GNU Affero General Public License v3.0](LICENSE) for community use.
Derivative works must also be open-sourced under AGPL v3.

**Commercial** — A proprietary license is available for organizations that need to use this code without the AGPL copyleft obligations. Contact [hello@unconfinedcinema.art](mailto:hello@unconfinedcinema.art) for commercial licensing.

</div>

---

<div align="center">

**The Unconfined Cinema** — Where Philippine Cinema Escapes the Screen

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/0xjitsu/unconfined_cinema)

[Get Started](#quick-start) · [Report a Bug](https://github.com/0xjitsu/unconfined_cinema/issues) · [Request a Feature](https://github.com/0xjitsu/unconfined_cinema/issues)

</div>
