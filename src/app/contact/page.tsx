import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Commission a project, attend an event, or join The Unconfined Cinema collective.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — The Unconfined Cinema",
    description:
      "Commission a project, attend an event, or join The Unconfined Cinema collective.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Unconfined Cinema",
  url: "https://unconfinedcinema.art",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general",
    url: "https://unconfinedcinema.art/contact",
    availableLanguage: ["English", "Filipino"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  );
}
