import { projects, allCollaborators } from "@/lib/projects";

export function GET() {
  const sections = [
    "# The Unconfined Cinema — Full Data",
    "",
    "## Organization",
    "Name: The Unconfined Cinema",
    "Founded: 2020",
    "Location: Manila, Philippines",
    "Founders: Erwin Romulo (Cultural journalist and writer), Philbert Dy (Film critic, filmmaker, and writer)",
    "Mission: To explore what cinema is and what else it could be.",
    "",
    "## Collaborators",
    allCollaborators.join(", "),
    "",
    "## Projects",
    "",
    ...projects.flatMap((p) => [
      `### ${p.title}`,
      `- Year: ${p.year}`,
      `- Venue: ${p.venue}`,
      `- Medium: ${p.medium}`,
      `- Format: ${p.format.join(", ")}`,
      `- Collaborators: ${p.collaborators.join(", ")}`,
      `- Description: ${p.description}`,
      `- URL: https://unconfinedcinema.com/projects/${p.slug}`,
      "",
    ]),
    "## Contact",
    "- Commission: https://unconfinedcinema.com/contact?type=commission",
    "- Events: https://unconfinedcinema.com/contact?type=attend",
    "- Collaborate: https://unconfinedcinema.com/contact?type=collaborate",
    "",
  ];

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
