export interface ProjectImage {
  src: string;
  alt: string;
  aspect?: "landscape" | "portrait" | "square" | "wide";
}

export interface ProjectVideo {
  src: string;
  poster?: string;
  alt: string;
  aspect?: "landscape" | "portrait" | "square" | "wide";
}

export type MediaItem =
  | ({ type: "image" } & ProjectImage)
  | ({ type: "video" } & ProjectVideo);

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  venue: string;
  medium: string;
  format: string[];
  shortDescription: string;
  description: string;
  collaborators: string[];
  isUpcoming: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  heroImage?: string;
  heroVideo?: string;
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  media?: MediaItem[];
}

export const projects: Project[] = [
  {
    slug: "the-unconfined-cinema-1",
    title: "The Unconfined Cinema #1",
    year: 2020,
    venue: "Art Fair Philippines, Makati Stock Exchange",
    medium: "Outdoor cinema, triptych video installation, live performance",
    format: ["Installation", "Live Performance", "Screening"],
    shortDescription: "Where cinema escapes the screen",
    description:
      "The first-ever special film project at Art Fair Philippines. An outdoor cinema at the Makati Stock Exchange — films projected onto the ceiling of the arch. Featured a staged live reading of \"That Thing Called Tadhana\" by writer-director Antoinette Jadaone with actors John Lloyd Cruz and Bea Alonzo. A three-projector triptych installation celebrating 100 years of Filipino Cinema: classic restored works, digital independent films, experimental works, mainstream hits. Commissioned a new short film from Martika Escobar and a documentary compiling EDSA Revolution footage.",
    collaborators: [
      "Antoinette Jadaone",
      "John Lloyd Cruz",
      "Bea Alonzo",
      "Martika Escobar",
    ],
    isUpcoming: false,
    gradientFrom: "#1a1a2e",
    gradientTo: "#16213e",
    gradientAngle: 135,
    heroImage: "/images/projects/the-unconfined-cinema-1/outdoor-cinema-dome.jpg",
    heroVideo: "/images/projects/the-unconfined-cinema-1/opening-night.mp4",
    images: [
      { src: "/images/projects/the-unconfined-cinema-1/outdoor-cinema-dome.jpg", alt: "Outdoor cinema at Makati Stock Exchange dome with film projected on canopy", aspect: "wide" },
      { src: "/images/projects/the-unconfined-cinema-1/triptych-title.jpg", alt: "Triptych projection showing The Unconfined Cinema title screens", aspect: "landscape" },
      { src: "/images/projects/the-unconfined-cinema-1/triptych-screening.jpg", alt: "Triptych projection with film playing on three screens", aspect: "landscape" },
      { src: "/images/projects/the-unconfined-cinema-1/outdoor-cinema.jpg", alt: "Outdoor cinema setup at Art Fair Philippines", aspect: "landscape" },
      { src: "/images/projects/the-unconfined-cinema-1/gallery-installation.jpg", alt: "Gallery installation view", aspect: "landscape" },
    ],
    videos: [
      { src: "/images/projects/the-unconfined-cinema-1/opening-night.mp4", poster: "/images/projects/the-unconfined-cinema-1/outdoor-cinema-dome.jpg", alt: "Opening night footage of the outdoor cinema", aspect: "wide" },
    ],
    media: [
      { type: "image", src: "/images/projects/the-unconfined-cinema-1/outdoor-cinema-dome.jpg", alt: "Outdoor cinema at Makati Stock Exchange dome with film projected on canopy", aspect: "wide" },
      { type: "video", src: "/images/projects/the-unconfined-cinema-1/opening-night.mp4", poster: "/images/projects/the-unconfined-cinema-1/outdoor-cinema-dome.jpg", alt: "Opening night footage of the outdoor cinema", aspect: "landscape" },
      { type: "image", src: "/images/projects/the-unconfined-cinema-1/triptych-title.jpg", alt: "Triptych projection showing The Unconfined Cinema title screens", aspect: "portrait" },
      { type: "image", src: "/images/projects/the-unconfined-cinema-1/triptych-screening.jpg", alt: "Triptych projection with film playing on three screens", aspect: "landscape" },
      { type: "image", src: "/images/projects/the-unconfined-cinema-1/outdoor-cinema.jpg", alt: "Outdoor cinema setup at Art Fair Philippines", aspect: "square" },
      { type: "image", src: "/images/projects/the-unconfined-cinema-1/gallery-installation.jpg", alt: "Gallery installation view", aspect: "landscape" },
    ],
  },
  {
    slug: "love-team",
    title: "The Unconfined Cinema #2: Love Team",
    subtitle: "Love Team",
    year: 2020,
    venue: "Instagram Live",
    medium: "Live streaming performance",
    format: ["Digital Performance", "Social Media"],
    shortDescription: "Intimacy through the live stream",
    description:
      "Created during pandemic lockdown. Reunited director Antoinette Jadaone with John Lloyd Cruz and Bea Alonzo. A completely online work: a scripted conversation performed as Instagram Live, blurring reality and fiction. Seeds were planted through Instagram stories in the weeks before. The \"movie\" rolled credits through an Instagram post days later. An experiment with medium, using the established on-screen relationship as drama's foundation.",
    collaborators: [
      "Antoinette Jadaone",
      "John Lloyd Cruz",
      "Bea Alonzo",
    ],
    isUpcoming: false,
    gradientFrom: "#2d1b3d",
    gradientTo: "#1a1a2e",
    gradientAngle: 200,
    heroImage: "/images/projects/love-team/ig-live-bea-jlc.png",
    images: [
      { src: "/images/projects/love-team/ig-live-bea-jlc.png", alt: "Instagram Live screenshot showing Bea Alonzo and John Lloyd Cruz", aspect: "portrait" },
    ],
    media: [
      { type: "image", src: "/images/projects/love-team/ig-live-bea-jlc.png", alt: "Instagram Live screenshot showing Bea Alonzo and John Lloyd Cruz", aspect: "portrait" },
    ],
  },
  {
    slug: "revolutions-refrains-songs",
    title: "The Unconfined Cinema #3: Revolutions, Refrains, Songs",
    subtitle: "Revolutions, Refrains, Songs",
    year: 2022,
    venue: "ArtInformal, San Juan",
    medium: "Multi-screen film installation",
    format: ["Installation", "Screening"],
    shortDescription: "Three films. Three rooms. Sound bleeds through walls.",
    description:
      "Three films screened simultaneously in adjacent gallery rooms. Nick DeOcampo's 1987 documentary \"Revolutions Happen Like Refrains in a Song\" — a drag performer against the Marcos dictatorship. John Torres's 2010 experimental feature \"Refrains Happen Like Revolutions in a Song\" — actors speaking Hiligaynon while the director writes disconnected English subtitles. A newly commissioned work by Martika Escobar: \"Songs Happen Like Refrains in a Revolution\" — shot during lockdown, creative people contributing snippets woven into a song-writing narrative. Sound from each film leaked into adjacent rooms, simulating a cross-generational conversation between filmmakers working with constraints.",
    collaborators: [
      "Nick DeOcampo",
      "John Torres",
      "Martika Escobar",
    ],
    isUpcoming: false,
    gradientFrom: "#1a2e1a",
    gradientTo: "#0a1a0a",
    gradientAngle: 160,
    heroImage: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg",
    images: [
      { src: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Orange wall with Revolutions, Refrains, Songs handwritten title", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Gallery screening room with film projection", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Dark room with single screen showing film", aspect: "wide" },
      { src: "/images/projects/revolutions-refrains-songs/installation-still-2.jpg", alt: "Pink gallery walls with poetry and text panels", aspect: "landscape" },
    ],
    videos: [
      { src: "/images/projects/revolutions-refrains-songs/installation-video-1.mp4", poster: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Multi-screen film installation playing in gallery", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/installation-video-2.mp4", poster: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Film projection in dark gallery room", aspect: "wide" },
    ],
    media: [
      { type: "image", src: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Orange wall with Revolutions, Refrains, Songs handwritten title", aspect: "landscape" },
      { type: "video", src: "/images/projects/revolutions-refrains-songs/installation-video-1.mp4", poster: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Multi-screen film installation playing in gallery", aspect: "landscape" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/installation-still-2.jpg", alt: "Pink gallery walls with poetry and text panels", aspect: "portrait" },
      { type: "video", src: "/images/projects/revolutions-refrains-songs/installation-video-2.mp4", poster: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Film projection in dark gallery room", aspect: "wide" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Gallery screening room with film projection", aspect: "square" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Dark room with single screen showing film", aspect: "landscape" },
    ],
  },
  {
    slug: "dreams-introspection-moving",
    title: "The Unconfined Cinema #4: Dreams. Introspection. Moving.",
    subtitle: "Dreams. Introspection. Moving.",
    year: 2026,
    venue: "ArtInformal, San Juan",
    medium: "Film workshop",
    format: ["Workshop", "Screening"],
    shortDescription: "A film workshop with Lav Diaz and Silke Lapina",
    description:
      "A two-day film workshop exploring the boundaries of slow cinema and collective dreaming. Led by legendary slow-cinema director Lav Diaz and artist Silke Lapina. Participants engaged in intensive exercises blending introspection, movement, and the moving image. March 14–15, 2026.",
    collaborators: ["Lav Diaz", "Silke Lapina"],
    isUpcoming: false,
    gradientFrom: "#2e1a1a",
    gradientTo: "#1a0a0a",
    gradientAngle: 180,
    heroImage: "/images/projects/dreams-introspection-moving/workshop-wall.jpg",
    images: [
      { src: "/images/projects/dreams-introspection-moving/workshop-wall.jpg", alt: "Dreams. Introspection. Moving. title wall at ArtInformal gallery", aspect: "landscape" },
    ],
    media: [
      { type: "image", src: "/images/projects/dreams-introspection-moving/workshop-wall.jpg", alt: "Dreams. Introspection. Moving. title wall at ArtInformal gallery", aspect: "landscape" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getUpcomingProjects(): Project[] {
  return projects.filter((p) => p.isUpcoming);
}

export function getPastProjects(): Project[] {
  return projects.filter((p) => !p.isUpcoming);
}

export function getNextProject(currentSlug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  return projects[(index + 1) % projects.length];
}

export function getPrevProject(currentSlug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  return projects[(index - 1 + projects.length) % projects.length];
}

export const allCollaborators = [
  "Antoinette Jadaone",
  "John Lloyd Cruz",
  "Bea Alonzo",
  "Martika Escobar",
  "Nick DeOcampo",
  "John Torres",
  "Lav Diaz",
  "Silke Lapina",
  "Erwin Romulo",
  "Philbert Dy",
];
