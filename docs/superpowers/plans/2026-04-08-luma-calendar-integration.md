# Luma Calendar Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Luma calendar into the website with a homepage teaser CTA and a dedicated `/events` page with the full embedded calendar.

**Architecture:** Three-part approach — (1) new `EventsTeaser` client component replaces the empty `UpcomingEvents` on the homepage, (2) new `/events` route with server metadata + client content containing the Luma iframe embed, (3) cleanup of the dead `isUpcoming` system. Navigation and sitemap updated to include the new route.

**Tech Stack:** Next.js App Router, Framer Motion (SectionReveal), Tailwind CSS (glass-morphism, cinema tokens), Luma iframe embed

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/components/home/EventsTeaser.tsx` | Homepage CTA card linking to `/events` |
| Create | `src/app/events/page.tsx` | Server component: metadata + JSON-LD |
| Create | `src/app/events/EventsContent.tsx` | Client component: hero + Luma iframe + CTA |
| Edit | `src/app/page.tsx` | Swap `UpcomingEvents` import → `EventsTeaser` |
| Edit | `src/components/layout/Navigation.tsx` | Add "Events" to `navLinks` between Projects and About |
| Edit | `src/components/layout/Footer.tsx` | Add "Events" to footer nav links |
| Edit | `src/app/sitemap.ts` | Add `/events` route |
| Edit | `src/lib/projects.ts` | Remove `isUpcoming` field, `getUpcomingProjects()`, `getPastProjects()` |
| Edit | `src/components/home/ProjectsShowcase.tsx` | Remove `!p.isUpcoming` filter, use `projects` directly |
| Delete | `src/components/home/UpcomingEvents.tsx` | Dead code — replaced by EventsTeaser |

---

### Task 1: Create EventsTeaser component

**Files:**
- Create: `src/components/home/EventsTeaser.tsx`

- [ ] **Step 1: Create the EventsTeaser component**

This replaces the `UpcomingEvents` component that currently returns `null` (no projects have `isUpcoming: true`). It's a permanent CTA — static content, not data-driven.

```tsx
"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { noiseOverlay } from "@/lib/animations";

export function EventsTeaser() {
  return (
    <section className="relative overflow-hidden bg-cinema-dark py-32 md:py-48">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #C8A97E 0%, transparent 60%), linear-gradient(135deg, #1a1a2e, #0a0a0a)",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: noiseOverlay, backgroundSize: "256px 256px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionReveal variant="clipLeft">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="h-px w-12 bg-cinema-gold/30" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                Upcoming
              </span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} variant="clipLeft">
            <h2 className="font-display text-5xl font-light leading-[0.9] tracking-tight text-cinema-warm md:text-7xl">
              Screenings &amp; Events
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2} variant="clipLeft">
            <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-cinema-muted">
              Immersive screenings, workshops, and conversations — cinema
              experienced beyond the traditional theater. See what&apos;s coming
              up next.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3} variant="clipLeft">
            <div className="mt-10">
              <MagneticButton href="/events" variant="outline">
                View Events →
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/EventsTeaser.tsx
git commit -m "feat: add EventsTeaser homepage component

Static CTA card linking to /events page. Uses cinema design tokens,
SectionReveal animations, and MagneticButton."
```

---

### Task 2: Replace UpcomingEvents with EventsTeaser on homepage

**Files:**
- Edit: `src/app/page.tsx`

- [ ] **Step 1: Update imports and usage in page.tsx**

In `src/app/page.tsx`, replace the dynamic `UpcomingEvents` import with a dynamic `EventsTeaser` import. The EventsTeaser should always render (it's a permanent CTA), so we add a loading skeleton since it's below the fold.

Find this line (line 10):
```tsx
const UpcomingEvents = dynamic(() => import("@/components/home/UpcomingEvents").then((m) => m.UpcomingEvents));
```

Replace with:
```tsx
const EventsTeaser = dynamic(() => import("@/components/home/EventsTeaser").then((m) => m.EventsTeaser), {
  loading: () => <div className="min-h-[40vh] bg-cinema-dark animate-pulse" />,
});
```

Then find the JSX usage (line 73–75):
```tsx
      <div className="contain-section">
        <UpcomingEvents />
      </div>
```

Replace with:
```tsx
      <div className="contain-section">
        <EventsTeaser />
      </div>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: replace UpcomingEvents with EventsTeaser on homepage

EventsTeaser is a permanent CTA linking to /events. UpcomingEvents
returned null since no projects have isUpcoming: true."
```

---

### Task 3: Create /events page (server + client components)

**Files:**
- Create: `src/app/events/page.tsx`
- Create: `src/app/events/EventsContent.tsx`

- [ ] **Step 1: Create the server component with metadata**

`src/app/events/page.tsx` — server component that exports metadata and imports the client content. The JSON-LD uses `EventSeries` type. The `JSON.stringify` call serializes a static object literal authored in this file — no user input involved, safe to inline.

```tsx
import type { Metadata } from "next";
import { EventsContent } from "./EventsContent";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Screenings, installations, workshops, and conversations by The Unconfined Cinema. See upcoming events and RSVP.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events — The Unconfined Cinema",
    description:
      "Screenings, installations, workshops, and conversations. Cinema experienced beyond the traditional theater.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "The Unconfined Cinema Events",
  description:
    "Screenings, installations, workshops, and conversations by The Unconfined Cinema.",
  url: "https://unconfinedcinema.art/events",
  organizer: {
    "@type": "Organization",
    name: "The Unconfined Cinema",
    url: "https://unconfinedcinema.art",
  },
  location: {
    "@type": "Place",
    name: "Manila, Philippines",
  },
};

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled content — safe to inline
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventsContent />
    </>
  );
}
```

- [ ] **Step 2: Create the client content component**

`src/app/events/EventsContent.tsx` — client component with the hero, Luma iframe embed in a glass container, and "View on Luma" escape hatch.

```tsx
"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { noiseOverlay } from "@/lib/animations";

export function EventsContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cinema-dark pt-32 pb-20 md:pt-48 md:pb-28">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, #C8A97E 0%, transparent 60%), linear-gradient(180deg, #0a0a0a, #1a1a2e)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: noiseOverlay, backgroundSize: "256px 256px" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionReveal>
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
              Calendar
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="font-display text-5xl font-light tracking-tight text-cinema-warm md:text-7xl lg:text-8xl">
              Events
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-cinema-muted">
              Screenings, installations, workshops, and conversations
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Luma Embed */}
      <section className="relative bg-cinema-black py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionReveal delay={0.1}>
            <div className="overflow-hidden rounded-lg border border-cinema-gray-800 bg-white/[0.02] backdrop-blur-sm">
              <iframe
                src="https://luma.com/embed/calendar/cal-L9c7lszC1zUDGwG/events"
                width="100%"
                height="600"
                className="block h-[500px] w-full md:h-[600px]"
                style={{ border: "none" }}
                loading="lazy"
                title="The Unconfined Cinema events calendar"
                allowFullScreen
              />
            </div>
          </SectionReveal>

          {/* View on Luma escape hatch */}
          <SectionReveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <MagneticButton
                href="https://luma.com/unconfinedcinema"
                variant="outline"
              >
                View on Luma →
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
```

Note: The `MagneticButton` component uses `next/link` for all `href` values. For the external Luma link, `next/link` handles external URLs by rendering a standard `<a>` tag. If the build shows an issue with this, add `target="_blank"` handling to `MagneticButton` — but the current implementation should work since Next.js `Link` passes through external URLs.

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Clean build. The `/events` route should appear in the build output.

- [ ] **Step 4: Commit**

```bash
git add src/app/events/page.tsx src/app/events/EventsContent.tsx
git commit -m "feat: add /events page with Luma calendar embed

Server component exports metadata and EventSeries JSON-LD.
Client component renders hero section, Luma iframe in glass
container, and View on Luma escape hatch."
```

---

### Task 4: Add Events to navigation and footer

**Files:**
- Edit: `src/components/layout/Navigation.tsx`
- Edit: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add Events to navbar**

In `src/components/layout/Navigation.tsx`, find the `navLinks` array (line 8–12):

```tsx
const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

Replace with:

```tsx
const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

- [ ] **Step 2: Add Events to footer**

In `src/components/layout/Footer.tsx`, find the footer nav array (lines 27–31):

```tsx
              {[
                { href: "/#projects", label: "Projects" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
```

Replace with:

```tsx
              {[
                { href: "/#projects", label: "Projects" },
                { href: "/events", label: "Events" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/Footer.tsx
git commit -m "feat: add Events link to navbar and footer navigation

Placed between Projects and About in both locations."
```

---

### Task 5: Add /events to sitemap

**Files:**
- Edit: `src/app/sitemap.ts`

- [ ] **Step 1: Add events route to sitemap**

In `src/app/sitemap.ts`, add the `/events` entry after the homepage entry (after line 18). Find:

```tsx
    {
      url: "https://unconfinedcinema.art/about",
```

Add before it:

```tsx
    {
      url: "https://unconfinedcinema.art/events",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
```

Using `changeFrequency: "weekly"` and `priority: 0.8` because the events calendar updates frequently.

- [ ] **Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add /events to sitemap

Weekly change frequency, 0.8 priority — calendar updates frequently."
```

---

### Task 6: Clean up isUpcoming system

**Files:**
- Edit: `src/lib/projects.ts`
- Edit: `src/components/home/ProjectsShowcase.tsx`
- Delete: `src/components/home/UpcomingEvents.tsx`

- [ ] **Step 1: Remove isUpcoming from Project interface and all project data**

In `src/lib/projects.ts`:

1. Remove `isUpcoming: boolean;` from the `Project` interface (line 29).

2. Remove `isUpcoming: false,` from every project object:
   - Line 57 (the-unconfined-cinema-1)
   - Line 98 (love-team)
   - Line 128 (revolutions-refrains-songs)
   - Line 162 (dreams-introspection-moving)

3. Remove the `getUpcomingProjects()` function (lines 180–182):
```tsx
export function getUpcomingProjects(): Project[] {
  return projects.filter((p) => p.isUpcoming);
}
```

4. Remove the `getPastProjects()` function (lines 184–186):
```tsx
export function getPastProjects(): Project[] {
  return projects.filter((p) => !p.isUpcoming);
}
```

- [ ] **Step 2: Update ProjectsShowcase filter**

In `src/components/home/ProjectsShowcase.tsx`, find line 212:

```tsx
  const featured = projects.filter((p) => !p.isUpcoming);
```

Replace with:

```tsx
  const featured = projects;
```

- [ ] **Step 3: Delete UpcomingEvents.tsx**

Delete the file `src/components/home/UpcomingEvents.tsx`. It's no longer imported anywhere (page.tsx now imports EventsTeaser).

Run: `rm src/components/home/UpcomingEvents.tsx`

- [ ] **Step 4: Verify no remaining references**

Run: `grep -r "isUpcoming\|UpcomingEvents\|getUpcomingProjects\|getPastProjects" src/`
Expected: No results.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/projects.ts src/components/home/ProjectsShowcase.tsx
git rm src/components/home/UpcomingEvents.tsx
git commit -m "cleanup: remove isUpcoming system

All events now go through the Luma calendar on /events.
Removes isUpcoming field, getUpcomingProjects(), getPastProjects(),
and the UpcomingEvents component. ProjectsShowcase now shows all
projects without filtering."
```

---

### Task 7: Final verification

- [ ] **Step 1: Full build check**

Run: `npm run build`
Expected: Clean build, all routes compile.

- [ ] **Step 2: Dev server smoke test**

Run: `npm run dev`

Verify:
1. Homepage — EventsTeaser renders between Projects and Collaborators sections
2. Click "View Events →" — navigates to `/events`
3. `/events` page — hero renders, Luma iframe loads, "View on Luma →" button visible
4. Navbar — "Events" link appears between "Projects" and "About"
5. Footer — "Events" link appears between "Projects" and "About"
6. Mobile menu — "Events" appears in the mobile nav overlay

- [ ] **Step 3: Commit any fixes if needed, then push**

```bash
git push origin feat/landing-page
```
