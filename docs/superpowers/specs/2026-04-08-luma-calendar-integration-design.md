# Luma Calendar Integration

**Date:** 2026-04-08
**Status:** Approved

## Overview

Integrate The Unconfined Cinema's Luma calendar into the website with a two-part approach: a cinematic teaser on the homepage that drives clicks, and a dedicated `/events` page with the full embedded calendar.

**Luma details:**
- Profile: https://luma.com/unconfinedcinema
- Embed URL: `https://luma.com/embed/calendar/cal-L9c7lszC1zUDGwG/events`

## Part 1 — Homepage Events Teaser

### What it does

Replaces the empty `UpcomingEvents` component (which returns `null` since all projects are `isUpcoming: false`) with a permanent `EventsTeaser` component.

### Design

- Positioned between Projects and Collaborators sections (same slot as old UpcomingEvents)
- Cinematic card with the site's dark aesthetic: gradient background, film grain overlay, gold accents
- Static content — not pulled from Luma (their embed API doesn't expose individual event data)
- Content:
  - Gold mono label: "Upcoming"
  - Heading: "Screenings & Events"
  - Short blurb about attending events
  - `MagneticButton` CTA: "View Events →" linking to `/events`
- `SectionReveal` animations consistent with homepage sections
- Always renders (permanent CTA, not conditional)

### File changes

- **New:** `src/components/home/EventsTeaser.tsx` — client component with `"use client"`
- **Edit:** `src/app/page.tsx` — replace `UpcomingEvents` import with `EventsTeaser`

## Part 2 — `/events` Page

### Design

- **Hero section:** Gradient background, "Events" title with `SectionReveal`, subtitle: "Screenings, installations, workshops, and conversations"
- **Luma embed section:**
  - Glass-morphism container (`max-w-4xl`, centered)
  - `border-cinema-gray-800` border, rounded corners
  - Responsive iframe: `width: 100%`, ~600px height on desktop, ~500px on mobile
  - `loading="lazy"` on the iframe
- **"View on Luma" escape hatch:**
  - `MagneticButton` below the embed
  - Links to `https://luma.com/unconfinedcinema` with `target="_blank"`
  - Text: "View on Luma →"
- **SEO:**
  - `metadata` export with title, description, canonical URL, openGraph
  - JSON-LD structured data (`EventSeries` type)
  - Added to `sitemap.ts`

### File changes

- **New:** `src/app/events/page.tsx` — server component (metadata) importing client content
- **New:** `src/app/events/EventsContent.tsx` — client component with the page UI
- **Edit:** `src/app/sitemap.ts` — add `/events` route

### Navigation

- Add "Events" link to the navbar between "Projects" and "About"
- Add "Events" link to the footer navigation

### File changes

- **Edit:** `src/components/layout/Navigation.tsx` — add Events to `navLinks`
- **Edit:** `src/components/layout/Footer.tsx` — add Events to footer nav

## Part 3 — Cleanup

Remove dead code related to the old upcoming events system:

- **Delete:** `src/components/home/UpcomingEvents.tsx`
- **Edit:** `src/lib/projects.ts` — remove `isUpcoming` field from all projects, remove `getUpcomingProjects()` helper
- **Edit:** `src/lib/projects.ts` — remove `isUpcoming` from `Project` interface
- **Edit:** `src/components/home/ProjectsShowcase.tsx` — update filter (currently `projects.filter((p) => !p.isUpcoming)`) to just use `projects` directly

## File summary

| Action | File |
|--------|------|
| New | `src/components/home/EventsTeaser.tsx` |
| New | `src/app/events/page.tsx` |
| New | `src/app/events/EventsContent.tsx` |
| Edit | `src/app/page.tsx` |
| Edit | `src/app/sitemap.ts` |
| Edit | `src/components/layout/Navigation.tsx` |
| Edit | `src/components/layout/Footer.tsx` |
| Edit | `src/lib/projects.ts` |
| Edit | `src/components/home/ProjectsShowcase.tsx` |
| Delete | `src/components/home/UpcomingEvents.tsx` |

## Out of scope

- Pulling individual event data from Luma (no stable API for this)
- Custom event cards rendered from Luma data
- RSVP functionality outside of the Luma embed
