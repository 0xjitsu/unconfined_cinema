"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { noiseOverlay } from "@/lib/animations";

export function EventsContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cinema-dark pt-32 pb-20 md:pt-48 md:pb-28">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, #C8A97E 0%, transparent 60%), linear-gradient(180deg, #0a0a0a, #1a1a2e)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: noiseOverlay, backgroundSize: "256px 256px" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionReveal>
            <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
              Calendar
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="font-display text-5xl font-light tracking-tight text-cinema-warm md:text-7xl lg:text-8xl">
              Events
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-cinema-muted">
              Screenings, installations, workshops, and conversations
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Luma Embed */}
      <section className="relative bg-cinema-black py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionReveal delay={0.1}>
            <div className="overflow-hidden rounded-lg border border-cinema-gray-800 bg-white/[0.02] backdrop-blur-sm">
              <iframe
                src="https://luma.com/embed/calendar/cal-L9c7lszC1zUDGwG/events"
                width="100%"
                height="600"
                className="block h-[500px] w-full md:h-[600px]"
                style={{ border: "none" }}
                loading="lazy"
                title="The Unconfined Cinema events calendar"
                allowFullScreen
              />
            </div>
          </SectionReveal>

          {/* View on Luma escape hatch */}
          <SectionReveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <MagneticButton
                href="https://luma.com/unconfinedcinema"
                variant="outline"
              >
                View on Luma →
              </MagneticButton>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
