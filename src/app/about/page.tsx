import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Unconfined Cinema is a Filipino art collective exploring what cinema is and what else it could be.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Unconfined Cinema",
  description:
    "The Unconfined Cinema is a Filipino art collective exploring what cinema is and what else it could be.",
  foundingDate: "2020",
  url: "https://unconfinedcinema.art",
  founder: [
    { "@type": "Person", name: "Erwin Romulo" },
    { "@type": "Person", name: "Philbert Dy" },
  ],
  location: {
    "@type": "Place",
    name: "Manila, Philippines",
  },
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
