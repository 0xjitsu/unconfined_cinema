import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Unconfined Cinema is a Filipino art collective exploring what cinema is and what else it could be.",
};

export default function AboutPage() {
  return <AboutContent />;
}
