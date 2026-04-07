"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { MediaItem, Project } from "@/lib/projects";

/* ═══════════════════════════════════════════════
   COLLAGE TEMPLATES — curated positions for each
   item in the collage. Each template defines a
   spatial composition like a gallery curator would.
   ═══════════════════════════════════════════════ */

interface CollageSlot {
  /** Tailwind grid col/row span and position */
  gridArea: string;
  /** Aspect ratio class */
  aspect: string;
  /** Horizontal offset for overlap effect */
  offsetX?: string;
  /** Vertical offset */
  offsetY?: string;
  /** Z-index layer */
  z: number;
  /** Slight rotation in degrees */
  rotate?: number;
  /** Parallax intensity (0 = none, 1 = full) */
  parallax: number;
  /** Reveal animation variant */
  reveal: "clipUp" | "clipLeft" | "clipDown" | "fadeScale" | "slideUp" | "slideLeft";
  /** Delay multiplier */
  delay: number;
}

/** Template for 6 items — the primary collage layout */
const collageTemplate6: CollageSlot[] = [
  // Large hero piece — top left, spans wide
  { gridArea: "col-span-8 row-span-2", aspect: "aspect-[16/10]", z: 2, parallax: 0.6, reveal: "clipUp", delay: 0, offsetY: "0" },
  // Tall portrait — overlaps the hero from the right
  { gridArea: "col-span-4 row-span-3", aspect: "aspect-[3/5]", offsetX: "-8%", z: 3, parallax: 0.3, reveal: "slideLeft", delay: 0.15 },
  // Wide video/image — below hero, slightly offset left
  { gridArea: "col-span-7 row-span-2", aspect: "aspect-[21/9]", offsetX: "5%", z: 1, parallax: 0.8, reveal: "clipLeft", delay: 0.1, rotate: -0.5 },
  // Square — overlapping from the right
  { gridArea: "col-span-5 row-span-2", aspect: "aspect-square", offsetX: "-5%", offsetY: "-12%", z: 4, parallax: 0.4, reveal: "fadeScale", delay: 0.2, rotate: 1 },
  // Landscape — wide bottom piece
  { gridArea: "col-span-6 row-span-2", aspect: "aspect-[4/3]", z: 2, parallax: 0.5, reveal: "clipDown", delay: 0.25 },
  // Small accent — floats on top
  { gridArea: "col-span-5 row-span-2", aspect: "aspect-[16/10]", offsetX: "8%", offsetY: "-8%", z: 5, parallax: 0.2, reveal: "slideUp", delay: 0.3, rotate: -1.5 },
];

/** Template for 4 items */
const collageTemplate4: CollageSlot[] = [
  { gridArea: "col-span-7 row-span-2", aspect: "aspect-[16/10]", z: 2, parallax: 0.6, reveal: "clipUp", delay: 0 },
  { gridArea: "col-span-5 row-span-3", aspect: "aspect-[3/4]", offsetX: "-6%", z: 3, parallax: 0.3, reveal: "slideLeft", delay: 0.15 },
  { gridArea: "col-span-6 row-span-2", aspect: "aspect-[21/9]", offsetX: "4%", z: 1, parallax: 0.7, reveal: "clipLeft", delay: 0.1 },
  { gridArea: "col-span-5 row-span-2", aspect: "aspect-square", offsetX: "-4%", offsetY: "-10%", z: 4, parallax: 0.4, reveal: "fadeScale", delay: 0.2, rotate: 0.8 },
];

/** Template for 1 item — full bleed single */
const collageTemplate1: CollageSlot[] = [
  { gridArea: "col-span-12 row-span-3", aspect: "aspect-[16/9]", z: 1, parallax: 0.5, reveal: "clipUp", delay: 0 },
];

function getTemplate(count: number): CollageSlot[] {
  if (count <= 1) return collageTemplate1;
  if (count <= 4) return collageTemplate4.slice(0, count);
  return collageTemplate6.slice(0, count);
}

/* ═══════════════════════════════════════════════
   VIDEO PLAYER — autoplay on scroll via
   IntersectionObserver, muted, looping
   ═══════════════════════════════════════════════ */

function ScrollVideo({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        aria-label={alt}
      />
      {/* Play indicator pulse */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-cinema-black/60 px-3 py-1.5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cinema-gold opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cinema-gold" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-cinema-warm/80">Video</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   COLLAGE ITEM — individual media piece with
   parallax, hover effects, scroll reveal
   ═══════════════════════════════════════════════ */

const revealAnimations = {
  clipUp: {
    hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    visible: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  },
  clipLeft: {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  },
  clipDown: {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  },
  fadeScale: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
};

function CollageItem({
  item,
  slot,
  project,
  index,
}: {
  item: MediaItem;
  slot: CollageSlot;
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [`${slot.parallax * 8}%`, `${-slot.parallax * 8}%`]);

  const animation = revealAnimations[slot.reveal];

  return (
    <motion.div
      ref={ref}
      className="group relative"
      style={{
        zIndex: slot.z,
        marginLeft: slot.offsetX,
        marginTop: slot.offsetY,
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animation}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: slot.delay,
      }}
    >
      <motion.div
        className={`relative ${slot.aspect} w-full overflow-hidden rounded-sm`}
        style={{
          y: parallaxY,
          rotate: slot.rotate ?? 0,
          background: `linear-gradient(${project.gradientAngle + index * 20}deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
        whileHover={{ scale: 1.03, rotate: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Media content */}
        {item.type === "video" ? (
          <ScrollVideo src={item.src} poster={item.poster} alt={item.alt} />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
          aria-hidden="true"
        />

        {/* Hover overlay with caption */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cinema-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cinema-warm/70 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
              {item.alt}
            </p>
          </div>
        </div>

        {/* Corner accent line — appears on hover */}
        <div className="pointer-events-none absolute top-0 left-0 h-8 w-px bg-cinema-gold scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 left-0 h-px w-8 bg-cinema-gold scale-x-0 origin-left transition-transform duration-500 delay-100 group-hover:scale-x-100" aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   CINEMATIC GALLERY — the main collage component
   ═══════════════════════════════════════════════ */

interface CinematicGalleryProps {
  project: Project;
}

export function CinematicGallery({ project }: CinematicGalleryProps) {
  const media = project.media;
  if (!media || media.length === 0) return null;

  const template = getTemplate(media.length);

  return (
    <div className="mt-16">
      <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
        Gallery
      </h3>

      {/* Desktop: asymmetric collage layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {media.map((item, i) => {
            const slot = template[i % template.length];
            return (
              <div key={i} className={slot.gridArea}>
                <CollageItem item={item} slot={slot} project={project} index={i} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: staggered scroll-reveal stack */}
      <div className="space-y-6 md:hidden">
        {media.map((item, i) => {
          const mobileSlot: CollageSlot = {
            gridArea: "",
            aspect: item.type === "video"
              ? "aspect-video"
              : item.aspect === "portrait"
                ? "aspect-[3/4]"
                : item.aspect === "square"
                  ? "aspect-square"
                  : "aspect-[4/3]",
            z: 1,
            parallax: 0.3,
            reveal: i % 3 === 0 ? "clipUp" : i % 3 === 1 ? "slideLeft" : "fadeScale",
            delay: i * 0.08,
            rotate: i % 2 === 0 ? -0.5 : 0.5,
            offsetX: i % 2 === 0 ? "-3%" : "3%",
          };
          return (
            <CollageItem key={i} item={item} slot={mobileSlot} project={project} index={i} />
          );
        })}
      </div>
    </div>
  );
}
