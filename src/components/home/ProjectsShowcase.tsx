"use client";

import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";

const noiseOverlay =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Each project gets a different visual treatment for asymmetry */
const layouts = [
  { aspect: "aspect-[4/5] md:aspect-[16/10]", offset: "md:ml-0 md:mr-[15%]", align: "items-start" },
  { aspect: "aspect-[3/2] md:aspect-[21/9]", offset: "md:ml-[20%] md:mr-0", align: "items-end md:text-right" },
  { aspect: "aspect-[1/1] md:aspect-[4/3]", offset: "md:ml-[8%] md:mr-[8%]", align: "items-start" },
];

export function ProjectsShowcase() {
  const featured = projects.filter((p) => !p.isUpcoming);

  return (
    <section id="projects" className="relative bg-cinema-black py-32 md:py-48 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <div className="flex items-end justify-between">
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-cinema-gold">
                Selected Works
              </span>
              <h2 className="font-display text-4xl font-light tracking-tight text-cinema-warm md:text-6xl">
                Projects
              </h2>
            </div>
            <span className="hidden font-display text-[8rem] font-light leading-none text-cinema-warm/[0.03] md:block">
              {String(featured.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-8 mb-20 h-px w-full bg-gradient-to-r from-cinema-gold/40 via-cinema-gray-800 to-transparent" />
        </SectionReveal>

        <div className="space-y-24 md:space-y-36">
          {featured.map((project, i) => {
            const layout = layouts[i % layouts.length];
            const isEven = i % 2 === 1;

            return (
              <SectionReveal key={project.slug} delay={i * 0.1}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <article className="relative">
                    {/* Decorative project number */}
                    <span
                      className={`absolute -top-8 font-display text-[7rem] font-light leading-none text-cinema-warm/[0.04] select-none md:text-[10rem] ${isEven ? "right-0" : "left-0"}`}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Image — asymmetric sizing per project */}
                    <div className={`relative ${layout.offset}`}>
                      <div
                        className={`relative ${layout.aspect} w-full overflow-hidden`}
                        style={{
                          background: `linear-gradient(${project.gradientAngle}deg, ${project.gradientFrom}, ${project.gradientTo})`,
                        }}
                      >
                        {project.heroImage && (
                          <Image
                            src={project.heroImage}
                            alt={project.subtitle ?? project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 85vw"
                          />
                        )}
                        <div
                          className="absolute inset-0 opacity-20 mix-blend-overlay"
                          style={{ backgroundImage: noiseOverlay, backgroundSize: "256px 256px" }}
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-cinema-black/0 transition-colors duration-500 group-hover:bg-cinema-black/40">
                          <span className="translate-y-4 font-mono text-xs uppercase tracking-[0.3em] text-cinema-warm opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                            View Project →
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Info — offset opposite to image */}
                    <div className={`mt-6 flex flex-col gap-2 ${layout.align} md:mt-8`}>
                      <div className={`max-w-xl ${isEven ? "md:ml-auto" : ""}`}>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="font-mono text-xs text-cinema-gold">
                            {project.year}
                          </span>
                          <span className="h-px w-8 bg-cinema-gold/30" aria-hidden="true" />
                          <span className="font-mono text-xs text-cinema-muted/60">
                            {project.venue}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl font-light tracking-tight text-cinema-warm md:text-4xl">
                          {project.subtitle ?? project.title}
                        </h3>
                        <p className="mt-2 font-body text-sm leading-relaxed text-cinema-muted">
                          {project.shortDescription}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
