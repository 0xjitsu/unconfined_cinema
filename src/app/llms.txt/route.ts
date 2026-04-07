import { projects } from "@/lib/projects";

export function GET() {
  const lines = [
    "# The Unconfined Cinema",
    "",
    "> A Filipino art collective designing immersive, unconventional spaces to experience film.",
    "",
    "## About",
    "Founded in 2020 by Erwin Romulo and Philbert Dy.",
    "We commission films, program screenings in unexpected spaces, and blur the boundaries between cinema, performance, and installation art.",
    "",
    "## Projects",
    ...projects.map(
      (p) => `- ${p.title} (${p.year}) — ${p.shortDescription}`
    ),
    "",
    "## Links",
    "- Website: https://unconfinedcinema.com",
    "- Full data: https://unconfinedcinema.com/llms-full.txt",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
