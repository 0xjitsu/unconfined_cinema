import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Commission a project, attend an event, or join The Unconfined Cinema collective.",
};

export default function ContactPage() {
  return <ContactContent />;
}
