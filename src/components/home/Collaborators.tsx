"use client";

import { allCollaborators } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Collaborators() {
  // Double the list for seamless loop
  const row1 = [...allCollaborators, ...allCollaborators];
  const row2 = [...allCollaborators.slice().reverse(), ...allCollaborators.slice().reverse()];

  return (
    <section className="relative overflow-hidden bg-cinema-black py-24 md:py-40">
      {/* Decorative horizontal rule */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cinema-gray-800 to-transparent" aria-hidden="true" />
      </div>

      <SectionReveal className="mx-auto max-w-7xl px-6 pt-20 lg:px-8 md:pt-24">
        <div className="flex items-end justify-between">
          <span className="mb-12 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
            Collaborators
          </span>
          <span className="mb-12 hidden font-mono text-xs text-cinema-muted/40 md:block">
            {allCollaborators.length} artists & filmmakers
          </span>
        </div>
      </SectionReveal>

      <div className="space-y-4 marquee-container md:space-y-8">
        {/* Row 1 — left, larger */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-6 md:gap-12">
            {row1.map((name, i) => (
              <span
                key={`r1-${i}`}
                className="whitespace-nowrap font-display text-4xl font-light tracking-tight text-cinema-warm/15 md:text-6xl lg:text-7xl"
                aria-hidden={i >= allCollaborators.length}
              >
                {name}
                <span className="mx-3 inline-block text-cinema-gold/20 md:mx-6" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right, smaller for visual hierarchy */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse flex shrink-0 items-center gap-6 md:gap-12">
            {row2.map((name, i) => (
              <span
                key={`r2-${i}`}
                className="whitespace-nowrap font-display text-2xl font-light italic tracking-tight text-cinema-warm/8 md:text-4xl lg:text-5xl"
                aria-hidden={i >= allCollaborators.length}
              >
                {name}
                <span className="mx-3 inline-block text-cinema-gold/10 md:mx-6" aria-hidden="true">—</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
