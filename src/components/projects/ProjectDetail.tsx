"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { CinematicGallery } from "@/components/ui/CinematicGallery";
import { FilmHoverText } from "@/components/ui/FilmHoverText";
import { noiseOverlay, fadeIn, heroTitle, heroWord } from "@/lib/animations";

interface ProjectDetailProps {
  project: Project;
  projectIndex: number;
  nextProject?: Project;
  prevProject?: Project;
}

/* ═══════════════════════════════════════════════
   HERO VIDEO — autoplay with IntersectionObserver
   ═══════════════════════════════════════════════ */

function HeroVideo({ src, poster }: { src: string; poster?: string }) {
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
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover opacity-50"
        aria-hidden="true"
      />
    </div>
  );
}

export function ProjectDetail({
  project,
  projectIndex,
  nextProject,
  prevProject,
}: ProjectDetailProps) {
  const projectNum = projectIndex >= 0 ? String(projectIndex + 1).padStart(2, "0") : null;

  return (
    <article>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pb-16 md:pb-24">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${project.gradientAngle}deg, ${project.gradientFrom}, ${project.gradientTo})`,
          }}
          aria-hidden="true"
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{ backgroundImage: noiseOverlay, backgroundSize: "256px 256px" }}
          aria-hidden="true"
        />
        {/* Gradient fade to black at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--color-cinema-black))",
          }}
          aria-hidden="true"
        />

        {/* Hero media — video uses IntersectionObserver autoplay */}
        {project.heroVideo ? (
          <HeroVideo src={project.heroVideo} poster={project.heroImage} />
        ) : project.heroImage ? (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        ) : null}

        {/* Project number — large watermark in hero */}
        {projectNum && (
          <motion.div
            className="absolute right-6 top-24 z-[1] md:right-12 md:top-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <span className="font-display text-[6rem] font-light leading-none text-cinema-gold/15 md:text-[12rem]">
              {projectNum}
            </span>
          </motion.div>
        )}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div variants={heroTitle} initial="hidden" animate="visible">
            {/* Number badge + metadata */}
            <motion.div variants={heroWord} className="mb-4 flex items-center gap-3">
              {projectNum && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cinema-gold/30 font-mono text-xs text-cinema-gold md:h-10 md:w-10 md:text-sm">
                  {projectNum}
                </span>
              )}
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                {project.displayDate ?? project.year} · {project.venue}
              </span>
            </motion.div>
            <motion.h1
              variants={heroWord}
              className="max-w-4xl font-display text-4xl font-light leading-[0.9] tracking-tight text-cinema-warm md:text-7xl"
            >
              {project.title}
            </motion.h1>
            {/* Medium tag below title */}
            <motion.p
              variants={heroWord}
              className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-cinema-warm/50 md:text-base"
            >
              {project.medium}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cinema-black py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Format tags */}
          <SectionReveal variant="slideLeft">
            <div className="mb-8 flex flex-wrap gap-2">
              {project.format.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cinema-gray-800 px-3 py-1 font-mono text-xs uppercase tracking-wider text-cinema-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SectionReveal>

          {/* Description — hover scramble effect */}
          <SectionReveal delay={0.1} variant="fadeUp">
            <FilmHoverText
              text={project.description}
              className="font-body text-lg leading-relaxed text-cinema-warm/80 md:text-xl"
            />
          </SectionReveal>

          {/* Collaborators */}
          <SectionReveal delay={0.2}>
            <div className="mt-16 border-t border-cinema-gray-800 pt-8">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                Collaborators
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {project.collaborators.map((name) => (
                  <span
                    key={name}
                    className="font-display text-lg font-light text-cinema-warm/70"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Cinematic gallery */}
          <CinematicGallery project={project} />
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-cinema-gray-800 bg-cinema-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-cinema-gray-800">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex flex-col gap-2 py-12 pr-8 transition-colors hover:bg-cinema-elevated/30 md:py-16"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cinema-muted">
                  ← Previous
                </span>
                <span className="font-display text-lg font-light text-cinema-warm group-hover:text-cinema-gold transition-colors md:text-2xl">
                  {prevProject.subtitle ?? prevProject.title}
                </span>
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex flex-col items-end gap-2 py-12 pl-8 text-right transition-colors hover:bg-cinema-elevated/30 md:py-16"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-cinema-muted">
                  Next →
                </span>
                <span className="font-display text-lg font-light text-cinema-warm group-hover:text-cinema-gold transition-colors md:text-2xl">
                  {nextProject.subtitle ?? nextProject.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
