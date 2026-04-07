import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { CallToAction } from "@/components/home/CallToAction";

const Manifesto = dynamic(() => import("@/components/home/Manifesto").then((m) => m.Manifesto), {
  loading: () => <div className="min-h-[60vh] bg-cinema-black animate-pulse" />,
});
const UpcomingEvents = dynamic(() => import("@/components/home/UpcomingEvents").then((m) => m.UpcomingEvents));
const Collaborators = dynamic(() => import("@/components/home/Collaborators").then((m) => m.Collaborators), {
  loading: () => <div className="min-h-[40vh] bg-cinema-black animate-pulse" />,
});

export const metadata: Metadata = {
  title: "The Unconfined Cinema — Where Philippine Cinema Escapes the Screen",
  description:
    "A Filipino art collective designing immersive, unconventional spaces to experience film. Installations, experimental screenings, and collaborative workshops.",
  alternates: { canonical: "/" },
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
    url: "https://unconfinedcinema.art",
    sameAs: [
      "https://www.instagram.com/unconfinedcinema/",
    ],
    founder: [
      { "@type": "Person", name: "Erwin Romulo" },
      { "@type": "Person", name: "Philbert Dy" },
    ],
    location: {
      "@type": "Place",
      name: "Manila, Philippines",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://unconfinedcinema.art/projects/{search_term_string}",
    "query-input": "required name=search_term_string",
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
      <div className="contain-section">
        <Manifesto />
      </div>
      <div className="contain-section">
        <ProjectsShowcase />
      </div>
      <div className="contain-section">
        <UpcomingEvents />
      </div>
      <div className="contain-section">
        <Collaborators />
      </div>
      <div className="contain-section">
        <CallToAction />
      </div>
    </>
  );
}
