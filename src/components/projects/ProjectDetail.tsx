"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { fadeIn, heroTitle, heroWord } from "@/lib/animations";

interface ProjectDetailProps {
  project: Project;
  nextProject?: Project;
  prevProject?: Project;
}

export function ProjectDetail({
  project,
  nextProject,
  prevProject,
}: ProjectDetailProps) {
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
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
          aria-hidden="true"
        />
        {/* Gradient fade to black at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background: "linear-gradient(to bottom, transparent, #0A0A0A)",
          }}
          aria-hidden="true"
        />

        {/* TODO: Replace with actual image from project */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <motion.div variants={heroTitle} initial="hidden" animate="visible">
            <motion.span
              variants={heroWord}
              className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold"
            >
              {project.year} · {project.venue}
            </motion.span>
            <motion.h1
              variants={heroWord}
              className="max-w-4xl font-display text-5xl font-light leading-[0.9] tracking-tight text-cinema-warm md:text-7xl"
            >
              {project.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cinema-black py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Format tags */}
          <SectionReveal>
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

          {/* Description */}
          <SectionReveal delay={0.1}>
            <p className="font-body text-lg leading-relaxed text-cinema-warm/80 md:text-xl">
              {project.description}
            </p>
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

          {/* Image gallery placeholder */}
          <SectionReveal delay={0.3}>
            <div className="mt-16">
              <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                Gallery
              </h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="aspect-[4/3] rounded-sm"
                    style={{
                      background: `linear-gradient(${project.gradientAngle + n * 15}deg, ${project.gradientFrom}, ${project.gradientTo})`,
                    }}
                  >
                    {/* TODO: Replace with actual image from project */}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
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
