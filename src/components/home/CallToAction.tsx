"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ctas = [
  {
    title: "Commission a Project",
    description:
      "Bring cinema to your space. We work with brands, festivals, museums, and institutions to design immersive film experiences.",
    href: "/contact?type=commission",
    label: "Work With Us",
    accent: "from-cinema-gold/20 to-transparent",
  },
  {
    title: "Attend an Event",
    description:
      "Experience the unconfined. Join our next screening, installation, or workshop.",
    href: "/contact?type=attend",
    label: "See What’s Next",
    accent: "from-transparent to-cinema-gold/10",
  },
  {
    title: "Join the Collective",
    description:
      "Are you a filmmaker, artist, or technologist? We’re always looking for new voices to shape the future of cinema.",
    href: "/contact?type=collaborate",
    label: "Get Involved",
    accent: "from-cinema-gold/10 via-transparent to-cinema-gold/5",
  },
];

export function CallToAction() {
  return (
    <section className="relative bg-cinema-dark py-32 md:py-48 overflow-hidden">
      {/* Decorative diagonal line */}
      <div
        className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-cinema-gold/10 via-cinema-gold/5 to-transparent origin-top-right rotate-12"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
            Collaborate
          </span>
          <h2 className="mb-4 font-display text-4xl font-light tracking-tight text-cinema-warm md:text-6xl">
            Let’s Create Together
          </h2>
          <p className="mb-16 max-w-xl font-body text-sm leading-relaxed text-cinema-muted md:mb-20">
            The Unconfined Cinema is always open to new partnerships, audiences, and creative voices.
          </p>
        </SectionReveal>

        {/* Asymmetric grid: featured card + two stacked */}
        <div className="grid gap-6 md:grid-cols-5 md:gap-8">
          {/* Primary CTA — spans 3 cols, taller */}
          <SectionReveal delay={0.1} className="md:col-span-3">
            <div className={`glass glass-hover flex h-full flex-col justify-between rounded-sm p-8 md:p-12 relative overflow-hidden min-h-[320px]`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${ctas[0].accent} pointer-events-none`} aria-hidden="true" />
              <div className="relative">
                <div className="mb-6 h-px w-16 bg-cinema-gold" />
                <h3 className="mb-4 font-display text-3xl font-light text-cinema-warm md:text-4xl">
                  {ctas[0].title}
                </h3>
                <p className="max-w-md font-body text-sm leading-relaxed text-cinema-muted">
                  {ctas[0].description}
                </p>
              </div>
              <div className="relative mt-8">
                <MagneticButton href={ctas[0].href} variant="outline">
                  {ctas[0].label}
                </MagneticButton>
              </div>
            </div>
          </SectionReveal>

          {/* Two stacked cards — span 2 cols */}
          <div className="flex flex-col gap-6 md:col-span-2 md:gap-8">
            {ctas.slice(1).map((cta, i) => (
              <SectionReveal key={cta.title} delay={0.2 + i * 0.1} className="flex-1">
                <div className={`glass glass-hover flex h-full flex-col justify-between rounded-sm p-8 relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${cta.accent} pointer-events-none`} aria-hidden="true" />
                  <div className="relative">
                    <div className="mb-4 h-px w-10 bg-cinema-gold/60" />
                    <h3 className="mb-3 font-display text-xl font-light text-cinema-warm md:text-2xl">
                      {cta.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-cinema-muted">
                      {cta.description}
                    </p>
                  </div>
                  <div className="relative mt-6">
                    <MagneticButton href={cta.href} variant="outline">
                      {cta.label}
                    </MagneticButton>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
