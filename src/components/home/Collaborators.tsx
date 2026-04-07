"use client";

import { allCollaborators } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Collaborators() {
  // Double the list for seamless loop
  const row1 = [...allCollaborators, ...allCollaborators];
  const row2 = [...allCollaborators.slice().reverse(), ...allCollaborators.slice().reverse()];

  return (
    <section className="relative overflow-hidden bg-cinema-black py-24 md:py-32">
      <SectionReveal className="mx-auto max-w-7xl px-6 lg:px-8">
        <span className="mb-12 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
          Collaborators
        </span>
      </SectionReveal>

      <div className="space-y-6 marquee-container">
        {/* Row 1 — left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8">
            {row1.map((name, i) => (
              <span
                key={`r1-${i}`}
                className="whitespace-nowrap font-display text-3xl font-light tracking-tight text-cinema-warm/20 md:text-5xl"
                aria-hidden={i >= allCollaborators.length}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse flex shrink-0 items-center gap-8">
            {row2.map((name, i) => (
              <span
                key={`r2-${i}`}
                className="whitespace-nowrap font-display text-3xl font-light tracking-tight text-cinema-warm/10 md:text-5xl"
                aria-hidden={i >= allCollaborators.length}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
