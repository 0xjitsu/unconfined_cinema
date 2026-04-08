"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { noiseOverlay } from "@/lib/animations";

export function EventsTeaser() {
  return (
    <section className="relative overflow-hidden bg-cinema-dark py-32 md:py-48">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #C8A97E 0%, transparent 60%), linear-gradient(135deg, #1a1a2e, #0a0a0a)",
        }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: noiseOverlay, backgroundSize: "256px 256px" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionReveal variant="clipLeft">
            <div className="mb-8 inline-flex items-center gap-3">
              <span className="h-px w-12 bg-cinema-gold/30" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                Upcoming
              </span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} variant="clipLeft">
            <h2 className="font-display text-5xl font-light leading-[0.9] tracking-tight text-cinema-warm md:text-7xl">
              Screenings &amp; Events
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2} variant="clipLeft">
            <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-cinema-muted">
              Immersive screenings, workshops, and conversations — cinema
              experienced beyond the traditional theater. See what&apos;s coming
              up next.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3} variant="clipLeft">
            <div className="mt-10">
              <MagneticButton href="/events" variant="outline">
                View Events →
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
