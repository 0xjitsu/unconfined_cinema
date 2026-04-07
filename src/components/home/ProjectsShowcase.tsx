"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { RevealVariant } from "@/lib/animations";

const noiseOverlay =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const layouts = [
  { aspect: "aspect-[4/5] md:aspect-[16/10]", offset: "md:ml-0 md:mr-[15%]", align: "items-start" },
  { aspect: "aspect-[3/2] md:aspect-[21/9]", offset: "md:ml-[20%] md:mr-0", align: "items-end md:text-right" },
  { aspect: "aspect-[1/1] md:aspect-[4/3]", offset: "md:ml-[8%] md:mr-[8%]", align: "items-start" },
];

const revealSequence: RevealVariant[] = ["clipUp", "slideRight", "fadeUp"];

/* ═══════════════════════════════════════════════
   PROJECT NUMBER — large, visible, animated
   ═══════════════════════════════════════════════ */

function ProjectNumber({ num, isEven }: { num: number; isEven: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const formatted = String(num).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      className={`absolute -top-4 z-10 md:-top-12 ${isEven ? "right-0 md:right-4" : "left-0 md:left-4"}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-display text-[5rem] font-light leading-none text-cinema-gold/20 md:text-[9rem]">
        {formatted}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PARALLAX MEDIA — image with video autoplay
   on scroll via IntersectionObserver
   ═══════════════════════════════════════════════ */

function ParallaxMedia({ project, layout, index }: { project: Project; layout: typeof layouts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  const hasVideo = Boolean(project.heroVideo ?? project.videos?.[0]?.src);
  const videoSrc = project.heroVideo ?? project.videos?.[0]?.src;

  // Autoplay video on scroll into view
  useEffect(() => {
    const video = videoRef.current;
    const container = ref.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative ${layout.offset}`}>
      <div
        className={`relative ${layout.aspect} w-full overflow-hidden rounded-sm`}
        style={{
          background: `linear-gradient(${project.gradientAngle}deg, ${project.gradientFrom}, ${project.gradientTo})`,
        }}
      >
        {/* Parallax container */}
        <motion.div style={{ y }} className="absolute inset-[-15%]">
          {/* Static image — always visible as poster/fallback */}
          {project.heroImage && (
            <Image
              src={project.heroImage}
              alt={project.subtitle ?? project.title}
              fill
              className={`object-cover w-full h-full ${hasVideo ? "opacity-0" : "opacity-100"}`}
              sizes="(max-width: 768px) 100vw, 85vw"
            />
          )}
          {/* Video — autoplays on scroll, no hover needed */}
          {hasVideo && videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={project.heroImage}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </motion.div>

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: noiseOverlay, backgroundSize: "256px 256px" }}
          aria-hidden="true"
        />

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 flex items-center justify-center bg-cinema-black/0 transition-colors duration-500 group-hover:bg-cinema-black/40">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-warm">
            <span className="group-hover:[clip-path:inset(0_0_0_0)] [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] inline-block">
              {hasVideo ? "▶ Watch Project" : "View Project →"}
            </span>
          </span>
        </div>

        {/* Video indicator badge */}
        {hasVideo && (
          <div className="absolute top-3 right-3 flex items-center gap-2 rounded-full bg-cinema-black/50 border border-cinema-warm/10 px-3 py-1.5 backdrop-blur-sm md:top-4 md:right-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cinema-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cinema-gold" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-cinema-warm/70">
              Film
            </span>
          </div>
        )}

        {/* Bottom gradient for text readability on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cinema-black/40 to-transparent pointer-events-none md:hidden" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PROJECT CARD — number + media + info
   ═══════════════════════════════════════════════ */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const layout = layouts[index % layouts.length];
  const isEven = index % 2 === 1;
  const variant = revealSequence[index % revealSequence.length];

  return (
    <SectionReveal key={project.slug} delay={index * 0.1} variant={variant}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <article className="relative">
          {/* Prominent project number */}
          <ProjectNumber num={index + 1} isEven={isEven} />

          {/* Small number + divider above media on mobile */}
          <div className="mb-4 flex items-center gap-3 md:hidden">
            <span className="font-display text-2xl font-light text-cinema-gold/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-cinema-gold/20" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cinema-muted/60">
              {project.year}
            </span>
          </div>

          <ParallaxMedia project={project} layout={layout} index={index} />

          <div className={`mt-6 flex flex-col gap-2 ${layout.align} md:mt-8`}>
            <div className={`max-w-xl ${isEven ? "md:ml-auto" : ""}`}>
              <div className="mb-2 hidden items-center gap-3 md:flex">
                <span className="font-mono text-xs text-cinema-gold">
                  {project.year}
                </span>
                <span className="h-px w-8 bg-cinema-gold/30" aria-hidden="true" />
                <span className="font-mono text-xs text-cinema-muted/60">
                  {project.venue}
                </span>
              </div>
              <h3 className="font-display text-2xl font-light tracking-tight text-cinema-warm md:text-4xl group-hover:text-cinema-gold transition-colors duration-500">
                {project.subtitle ?? project.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-cinema-muted">
                {project.shortDescription}
              </p>
              {/* Hover underline sweep */}
              <div className="mt-3 h-px w-0 bg-cinema-gold transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16" aria-hidden="true" />
            </div>
          </div>
        </article>
      </Link>
    </SectionReveal>
  );
}

/* ═══════════════════════════════════════════════
   PROJECTS SHOWCASE — section container
   ═══════════════════════════════════════════════ */

export function ProjectsShowcase() {
  const featured = projects.filter((p) => !p.isUpcoming);

  return (
    <section id="projects" className="relative bg-cinema-black py-24 md:py-48 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <div>
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
              Selected Works
            </span>
            <h2 className="font-display text-4xl font-light tracking-tight text-cinema-warm md:text-6xl">
              Projects
            </h2>
          </div>
          <div className="mt-8 mb-16 h-px w-full bg-gradient-to-r from-cinema-gold/40 via-cinema-gray-800 to-transparent md:mb-20" />
        </SectionReveal>

        <div className="space-y-20 md:space-y-36">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
