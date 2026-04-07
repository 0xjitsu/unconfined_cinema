import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Collaborators } from "@/components/home/Collaborators";
import { CallToAction } from "@/components/home/CallToAction";

export const metadata: Metadata = {
  title: "The Unconfined Cinema — Where Philippine Cinema Escapes the Screen",
  description:
    "A Filipino art collective designing immersive, unconventional spaces to experience film. Installations, experimental screenings, and collaborative workshops.",
  openGraph: {
    title: "The Unconfined Cinema",
    description:
      "A Filipino art collective designing immersive, unconventional spaces to experience film.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Unconfined Cinema",
  description:
    "A Filipino art collective designing immersive, unconventional spaces to experience film.",
  url: "https://unconfinedcinema.art",
  publisher: {
    "@type": "Organization",
    name: "The Unconfined Cinema",
    foundingDate: "2020",
    founder: [
      { "@type": "Person", name: "Erwin Romulo" },
      { "@type": "Person", name: "Philbert Dy" },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Manifesto />
      <ProjectsShowcase />
      <UpcomingEvents />
      <Collaborators />
      <CallToAction />
    </>
  );
}
