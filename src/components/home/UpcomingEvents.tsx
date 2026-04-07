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
      {/* Background gradient — shifted off-center */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${event.gradientFrom} 0%, transparent 60%), linear-gradient(${event.gradientAngle}deg, ${event.gradientFrom}, ${event.gradientTo})`,
        }}
        aria-hidden="true"
      />

      {/* Decorative large year watermark */}
      <span
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-display text-[14rem] font-light leading-none text-cinema-warm/[0.02] select-none hidden lg:block"
        aria-hidden="true"
      >
        {event.year}
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Two-column editorial layout on desktop */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-16 md:items-start">
          {/* Left: title block — takes 7 cols */}
          <div className="md:col-span-7">
            <SectionReveal>
              <div className="mb-8 inline-flex items-center gap-3">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cinema-gold" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                  Upcoming
                </span>
                <span className="h-px w-12 bg-cinema-gold/30" aria-hidden="true" />
                <span className="font-mono text-xs text-cinema-muted">March 14–15, 2026</span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="font-display text-5xl font-light leading-[0.9] tracking-tight text-cinema-warm md:text-7xl lg:text-8xl">
                {event.title}
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-sm text-cinema-muted">
                <span>{event.venue}</span>
                <span className="text-cinema-gray-800">·</span>
                <span>{event.medium}</span>
              </div>
            </SectionReveal>
          </div>

          {/* Right: details block — takes 5 cols, offset down */}
          <div className="md:col-span-5 md:pt-24">
            <SectionReveal delay={0.3}>
              <div className="flex flex-wrap gap-2">
                {event.collaborators.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-cinema-gray-800 px-4 py-1.5 font-mono text-xs text-cinema-muted"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <div className="mt-6 h-px w-full bg-cinema-gray-800" aria-hidden="true" />
              <p className="mt-6 font-body text-base leading-relaxed text-cinema-muted">
                {event.description}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.5}>
              <div className="mt-10">
                <MagneticButton href="/contact?type=attend" variant="outline">
                  Learn More
                </MagneticButton>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
