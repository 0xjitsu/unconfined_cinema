import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, getNextProject, getPrevProject } from "@/lib/projects";
import { ProjectDetail } from "@/components/projects/ProjectDetail";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = getNextProject(slug);
  const prevProject = getPrevProject(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: `${project.year}`,
    creator: {
      "@type": "Organization",
      name: "The Unconfined Cinema",
    },
    locationCreated: {
      "@type": "Place",
      name: project.venue,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail
        project={project}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    </>
  );
}
