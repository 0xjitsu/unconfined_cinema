"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { projects } from "@/lib/projects";

const founders = [
  {
    name: "Erwin Romulo",
    role: "Co-founder",
    bio: "Cultural journalist and writer. Erwin brings a deep understanding of Philippine arts and culture to The Unconfined Cinema, curating experiences that bridge criticism and creation.",
  },
  {
    name: "Philbert Dy",
    role: "Co-founder",
    bio: "Film critic, filmmaker, and writer. Philbert's sharp critical eye and filmmaking experience shape the collective's artistic vision and push the boundaries of what cinema can be.",
  },
];

export function AboutContent() {
  return (
    <div className="bg-cinema-black">
      {/* Hero */}
      <section className="flex min-h-[50vh] items-end pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionReveal>
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
              About
            </span>
            <h1 className="font-display text-5xl font-light leading-[0.9] tracking-tight text-cinema-warm md:text-7xl">
              The Collective
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionReveal>
            <p className="font-display text-2xl font-light leading-relaxed text-cinema-warm/80 md:text-3xl">
              The Unconfined Cinema was formed in 2020 as an effort to explore
              what cinema is and what else it could be. It is a platform that
              seeks to present cinema in an unconventional fashion: designing
              unusual spaces to showcase films, facilitating conversations about
              the craft, staging performances that bring art to life, and
              producing work that challenges norms.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Founders */}
      <section className="border-t border-cinema-gray-800 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionReveal>
            <span className="mb-12 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
              Founders
            </span>
          </SectionReveal>

          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {founders.map((founder, i) => (
              <SectionReveal key={founder.name} delay={i * 0.1}>
                <div>
                  <h3 className="font-display text-3xl font-light text-cinema-warm">
                    {founder.name}
                  </h3>
                  <span className="mt-1 block font-mono text-xs uppercase tracking-[0.2em] text-cinema-gold">
                    {founder.role}
                  </span>
                  <p className="mt-4 font-body text-sm leading-relaxed text-cinema-muted">
                    {founder.bio}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-cinema-gray-800 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionReveal>
            <span className="mb-12 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
              Timeline
            </span>
          </SectionReveal>

          <div className="space-y-12">
            {projects.map((project, i) => (
              <SectionReveal key={project.slug} delay={i * 0.05}>
                <div className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-sm text-cinema-gold">
                      {project.year}
                    </span>
                    <div className="mt-2 h-full w-px bg-cinema-gray-800" />
                  </div>
                  <div className="pb-8">
                    <h3 className="font-display text-xl font-light text-cinema-warm md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-cinema-muted">
                      {project.venue}
                    </p>
                    <p className="mt-3 font-body text-sm leading-relaxed text-cinema-muted">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
