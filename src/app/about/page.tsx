import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Unconfined Cinema is a Filipino art collective exploring what cinema is and what else it could be.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — The Unconfined Cinema",
    description:
      "A Filipino art collective exploring what cinema is and what else it could be. Founded 2020 by Erwin Romulo and Philbert Dy.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Unconfined Cinema",
  description:
    "The Unconfined Cinema is a Filipino art collective exploring what cinema is and what else it could be.",
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
  knowsAbout: ["Philippine Cinema", "Film Installation", "Experimental Screening", "Immersive Art"],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
