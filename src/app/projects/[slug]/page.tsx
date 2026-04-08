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

  const ogImages = project.heroImage
    ? [{ url: project.heroImage, width: 1200, height: 630, alt: project.title }]
    : undefined;

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      type: "article",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.shortDescription,
      ...(project.heroImage ? { images: [project.heroImage] } : {}),
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
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    dateCreated: `${project.year}`,
    url: `https://unconfinedcinema.art/projects/${slug}`,
    ...(project.heroImage ? { image: `https://unconfinedcinema.art${project.heroImage}` } : {}),
    creator: {
      "@type": "Organization",
      name: "The Unconfined Cinema",
      url: "https://unconfinedcinema.art",
      sameAs: ["https://www.instagram.com/unconfinedcinema/"],
    },
    locationCreated: {
      "@type": "Place",
      name: project.venue,
    },
    contributor: project.collaborators.map((name) => ({
      "@type": "Person",
      name,
    })),
    genre: project.format,
    artMedium: project.medium,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail
        project={project}
        projectIndex={projectIndex}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    </>
  );
}
