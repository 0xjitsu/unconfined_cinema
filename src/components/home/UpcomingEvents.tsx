"use client";

import { getUpcomingProjects } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function UpcomingEvents() {
  const upcoming = getUpcomingProjects();
  if (upcoming.length === 0) return null;

  const event = upcoming[0];

  return (
    <section className="relative overflow-hidden bg-cinema-dark py-32 md:py-48">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(${event.gradientAngle}deg, ${event.gradientFrom}, ${event.gradientTo})`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <div className="mb-8 inline-flex items-center gap-3">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cinema-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
              Upcoming
            </span>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2 className="max-w-4xl font-display text-5xl font-light leading-[0.9] tracking-tight text-cinema-warm md:text-7xl lg:text-8xl">
            {event.title}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-sm text-cinema-muted">
            <span>March 14–15, 2026</span>
            <span className="text-cinema-gray-800">·</span>
            <span>{event.venue}</span>
            <span className="text-cinema-gray-800">·</span>
            <span>{event.medium}</span>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-6 flex flex-wrap gap-2">
            {event.collaborators.map((name) => (
              <span
                key={name}
                className="rounded-full border border-cinema-gray-800 px-3 py-1 font-mono text-xs text-cinema-muted"
              >
                {name}
              </span>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <p className="mt-8 max-w-2xl font-body text-base leading-relaxed text-cinema-muted">
            {event.description}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <div className="mt-12">
            <MagneticButton href="/contact?type=attend" variant="outline">
              Learn More
            </MagneticButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
