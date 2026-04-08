# UC3 Trailer Video — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Unconfined Cinema #3 trailer as the project header video and include it in the project gallery.

**Architecture:** Copy the trailer file to the public assets directory, then update the project data in `projects.ts` to set `heroVideo` and add the trailer to both `videos` and `media` arrays.

**Tech Stack:** Static asset (MP4), project data (`src/lib/projects.ts`)

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Copy | `public/images/projects/revolutions-refrains-songs/trailer.mp4` | Trailer video asset |
| Edit | `src/lib/projects.ts` | Add `heroVideo`, add to `videos` and `media` arrays |

---

### Task 1: Copy trailer to public assets

**Files:**
- Copy: `/Users/bbmisa/Downloads/Unconfined Cinema 3- Trailer.mp4` → `public/images/projects/revolutions-refrains-songs/trailer.mp4`

- [ ] **Step 1: Copy the file**

```bash
cp "/Users/bbmisa/Downloads/Unconfined Cinema 3- Trailer.mp4" /Users/bbmisa/Projects/unconfined_cinema/public/images/projects/revolutions-refrains-songs/trailer.mp4
```

- [ ] **Step 2: Commit**

```bash
git add public/images/projects/revolutions-refrains-songs/trailer.mp4
git commit -m "asset: add Unconfined Cinema #3 trailer video"
```

---

### Task 2: Update project data with trailer

**Files:**
- Edit: `src/lib/projects.ts`

- [ ] **Step 1: Add heroVideo to the revolutions-refrains-songs project**

In `src/lib/projects.ts`, find the `heroImage` line for the revolutions-refrains-songs project (line 126):

```tsx
    heroImage: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg",
```

Add `heroVideo` immediately after:

```tsx
    heroImage: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg",
    heroVideo: "/images/projects/revolutions-refrains-songs/trailer.mp4",
```

- [ ] **Step 2: Add trailer to the videos array**

Find the `videos` array for this project (lines 133–136). Add the trailer as the first entry:

```tsx
    videos: [
      { src: "/images/projects/revolutions-refrains-songs/trailer.mp4", poster: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Revolutions, Refrains, Songs exhibition trailer", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/installation-video-1.mp4", poster: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Multi-screen film installation playing in gallery", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/installation-video-2.mp4", poster: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Film projection in dark gallery room", aspect: "wide" },
    ],
```

- [ ] **Step 3: Add trailer to the media array**

Find the `media` array (lines 137–144). Add the trailer as the first entry (before the title wall image), so it's the hero media item:

```tsx
    media: [
      { type: "video", src: "/images/projects/revolutions-refrains-songs/trailer.mp4", poster: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Revolutions, Refrains, Songs exhibition trailer", aspect: "landscape" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Orange wall with Revolutions, Refrains, Songs handwritten title", aspect: "landscape" },
      { type: "video", src: "/images/projects/revolutions-refrains-songs/installation-video-1.mp4", poster: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Multi-screen film installation playing in gallery", aspect: "landscape" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/installation-still-2.jpg", alt: "Pink gallery walls with poetry and text panels", aspect: "portrait" },
      { type: "video", src: "/images/projects/revolutions-refrains-songs/installation-video-2.mp4", poster: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Film projection in dark gallery room", aspect: "wide" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Gallery screening room with film projection", aspect: "square" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Dark room with single screen showing film", aspect: "landscape" },
    ],
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat: add trailer as header video and gallery item for UC #3

Sets heroVideo so the project card and detail page play the trailer.
Also adds it as first item in videos and media arrays for the gallery."
```

---

### Task 3: Verify in dev server

- [ ] **Step 1: Check homepage project card**

Navigate to homepage, scroll to UC #3 project card. It should now show the trailer auto-playing on scroll (same behavior as UC #1 which has a heroVideo) with the "▶ Watch Project" overlay and "FILM" badge.

- [ ] **Step 2: Check project detail page**

Navigate to `/projects/revolutions-refrains-songs`. The header should play the trailer video. The gallery should show the trailer as the first media item.

- [ ] **Step 3: Push**

```bash
git push origin feat/landing-page
```
