"use client";

import Link from "next/link";
import { projects } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function ProjectsShowcase() {
  const featured = projects.filter((p) => !p.isUpcoming);

  return (
    <section id="projects" className="relative bg-cinema-black py-32 md:py-48 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
            Selected Works
          </span>
          <h2 className="mb-20 font-display text-4xl font-light tracking-tight text-cinema-warm md:text-6xl">
            Projects
          </h2>
        </SectionReveal>

        <div className="space-y-16 md:space-y-24">
          {featured.map((project, i) => (
            <SectionReveal key={project.slug} delay={i * 0.1}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <article className="relative overflow-hidden">
                  {/* Image placeholder */}
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]"
                    style={{
                      background: `linear-gradient(${project.gradientAngle}deg, ${project.gradientFrom}, ${project.gradientTo})`,
                    }}
                  >
                    {/* Noise overlay */}
                    <div
                      className="absolute inset-0 opacity-20 mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        backgroundSize: "256px 256px",
                      }}
                      aria-hidden="true"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-cinema-black/0 transition-colors duration-500 group-hover:bg-cinema-black/40">
                      <span className="translate-y-4 font-mono text-xs uppercase tracking-[0.3em] text-cinema-warm opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        View Project →
                      </span>
                    </div>

                    {/* TODO: Replace with actual image from project */}
                  </div>

                  {/* Info */}
                  <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-light tracking-tight text-cinema-warm md:text-3xl">
                        {project.subtitle ?? project.title}
                      </h3>
                      <p className="mt-1 font-body text-sm text-cinema-muted">
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-cinema-muted">
                        {project.year}
                      </span>
                      <span className="font-mono text-xs text-cinema-muted/60">
                        {project.venue}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
