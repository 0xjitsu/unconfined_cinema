<div align="center">

# The Unconfined Cinema

**Where Philippine Cinema Escapes the Screen**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-C8A97E?style=flat-square)](CONTRIBUTING.md)

[Quick Start](#quick-start) · [Features](#features) · [Deploy](#deploy)

</div>

---

## Why This Exists

The Unconfined Cinema is a Filipino art collective founded in 2020 by Erwin Romulo and Philbert Dy. They design immersive, unconventional spaces to experience film — blurring the boundaries between cinema, performance, and installation art.

This is their digital home: a cinematic landing page that feels like entering a dark gallery where a film is about to begin.

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
| Immersive Homepage | 7-section long-scroll with scroll-linked text reveals and marquee |
| Project Detail Pages | SSG pages with gradient heroes, gallery placeholders, prev/next navigation |
| Smooth Scroll | Lenis smooth scroll with reduced-motion fallback |
| Framer Motion | Purposeful animations — fade-ups, staggered reveals, magnetic buttons |
| SEO Infrastructure | Sitemap, robots.txt, JSON-LD, dynamic OG images, dynamic favicon |
| AI Agent Ready | `/llms.txt`, `/llms-full.txt`, `/.well-known/ai-plugin.json` |
| Accessibility | Skip nav, focus rings, WCAG AA contrast, 44px touch targets, reduced-motion |
| Responsive | Mobile-first, cinematic at every breakpoint |

## How It Works

```
Homepage (long scroll)
├── Hero — typographic title, animated gradient
├── Manifesto — scroll-linked word reveal
├── Projects Showcase — asymmetric gallery cards
├── Upcoming Events — featured event spotlight
├── Collaborators — dual-direction name marquee
└── Call to Action — commission / attend / join

/projects/[slug] — SSG detail pages (4 projects)
/about — collective info, founders, timeline
/contact — glass morphism form with ?type= pre-select
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, Lenis, nav, grain)
│   ├── page.tsx            # Homepage
│   ├── projects/[slug]/    # Project detail (SSG)
│   ├── about/              # About the collective
│   └── contact/            # Commission / collaborate form
├── components/
│   ├── layout/             # Navigation, Footer, GrainOverlay, SmoothScroll
│   ├── home/               # Hero, Manifesto, ProjectsShowcase, etc.
│   ├── projects/           # ProjectDetail
│   └── ui/                 # SectionReveal, TextReveal, MagneticButton
└── lib/
    ├── projects.ts         # All project data (content separated from UI)
    └── animations.ts       # Shared Framer Motion variants
```

<details>
<summary><strong>Developer Setup</strong></summary>

### Prerequisites

- Node.js 18+
- npm or bun

### Environment

```bash
cp .env.example .env.local
```

### Development

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

### Adding Images

Images are placeholder gradients. Drop real images into:
```
public/images/projects/[project-slug]/[descriptor].jpg
```

Then update `src/lib/projects.ts` with image paths.

</details>

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | ![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js) |
| Styling | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38bdf8?style=flat-square&logo=tailwindcss) |
| Animation | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer) |
| Scroll | Lenis |
| Hosting | ![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel) |
| Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |

## License

<div align="center">

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](LICENSE)

This project is licensed under the **GNU Affero General Public License v3.0**.

For commercial licensing inquiries, contact [hello@unconfinedcinema.com](mailto:hello@unconfinedcinema.com).

</div>

---

<div align="center">

**The Unconfined Cinema** — Where Philippine Cinema Escapes the Screen

[Get Started](https://github.com/0xjitsu/unconfined_cinema#quick-start) · [Report a Bug](https://github.com/0xjitsu/unconfined_cinema/issues) · [Request a Feature](https://github.com/0xjitsu/unconfined_cinema/issues)

</div>
