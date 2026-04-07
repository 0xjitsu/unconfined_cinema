"use client";

import { TextReveal } from "@/components/ui/TextReveal";

const manifesto =
  "The Unconfined Cinema was formed in 2020 as an effort to explore what cinema is and what else it could be. It is a platform that seeks to present cinema in an unconventional fashion: designing unusual spaces to showcase films, facilitating conversations about the craft, staging performances that bring art to life, and producing work that challenges norms.";

export function Manifesto() {
  return (
    <section className="relative bg-cinema-black py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <span className="mb-12 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
          Manifesto
        </span>
        <TextReveal text={manifesto} />
      </div>
    </section>
  );
}
