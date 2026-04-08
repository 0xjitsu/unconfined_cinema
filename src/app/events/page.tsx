import type { Metadata } from "next";
import { EventsContent } from "./EventsContent";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Screenings, installations, workshops, and conversations by The Unconfined Cinema. See upcoming events and RSVP.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events — The Unconfined Cinema",
    description:
      "Screenings, installations, workshops, and conversations. Cinema experienced beyond the traditional theater.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "The Unconfined Cinema Events",
  description:
    "Screenings, installations, workshops, and conversations by The Unconfined Cinema.",
  url: "https://unconfinedcinema.art/events",
  organizer: {
    "@type": "Organization",
    name: "The Unconfined Cinema",
    url: "https://unconfinedcinema.art",
  },
  location: {
    "@type": "Place",
    name: "Manila, Philippines",
  },
};

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled content — safe to inline
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventsContent />
    </>
  );
}
