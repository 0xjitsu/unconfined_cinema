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
  },
  {
    title: "Attend an Event",
    description:
      "Experience the unconfined. Join our next screening, installation, or workshop.",
    href: "/contact?type=attend",
    label: "See What’s Next",
  },
  {
    title: "Join the Collective",
    description:
      "Are you a filmmaker, artist, or technologist? We’re always looking for new voices to shape the future of cinema.",
    href: "/contact?type=collaborate",
    label: "Get Involved",
  },
];

export function CallToAction() {
  return (
    <section className="relative bg-cinema-dark py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <h2 className="mb-16 text-center font-display text-4xl font-light tracking-tight text-cinema-warm md:text-5xl">
            Let’s Create Together
          </h2>
        </SectionReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {ctas.map((cta, i) => (
            <SectionReveal key={cta.title} delay={i * 0.1}>
              <div className="glass glass-hover flex h-full flex-col justify-between rounded-sm p-8 md:p-10">
                <div>
                  <div className="mb-6 h-px w-12 bg-cinema-gold" />
                  <h3 className="mb-4 font-display text-2xl font-light text-cinema-warm">
                    {cta.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-cinema-muted">
                    {cta.description}
                  </p>
                </div>
                <div className="mt-8">
                  <MagneticButton href={cta.href} variant="outline">
                    {cta.label}
                  </MagneticButton>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
