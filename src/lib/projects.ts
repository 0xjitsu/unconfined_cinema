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
  displayDate?: string;
  venue: string;
  medium: string;
  format: string[];
  shortDescription: string;
  description: string;
  collaborators: string[];
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
    displayDate: "February 2020",
    venue: "Art Fair Philippines, Makati Stock Exchange",
    medium: "Outdoor cinema, triptych video installation, live performance",
    format: ["Installation", "Live Performance", "Screening"],
    shortDescription: "The first-ever special project for film at Art Fair Philippines",
    description:
      "Conceived as the first-ever special project for film at Art Fair Philippines. In the lead up to the Art Fair, an outdoor cinema space was created, projecting films on the ceiling of the arch in the Makati Stock Exchange — among them short films from the QCinema International Film Festival, the documentary Sunday Beauty Queen, and One More Chance, screened on Valentine's Day. A staged live reading of Antoinette Jadaone's That Thing Called Tadhana followed, read by the writer-director herself with actors John Lloyd Cruz and Bea Alonzo. During the Art Fair, a three-projector triptych setup showcased films celebrating one hundred years of Filipino Cinema: classic restored works, digital independent films, experimental works, and mainstream hits. New work was also commissioned, including a short film from Martika Escobar and a documentary compiling footage recorded during the EDSA Revolution.",
    collaborators: [
      "Antoinette Jadaone",
      "John Lloyd Cruz",
      "Bea Alonzo",
      "Martika Escobar",
    ],
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
    shortDescription: "Cinema without ever sharing physical space",
    description:
      "At the height of the pandemic, The Unconfined Cinema reunited with director Antoinette Jadaone and actors John Lloyd Cruz and Bea Alonzo in an attempt to create cinema without ever sharing physical space. The result was a completely online work presented as an Instagram Live, having the two actors play out a scripted conversation that blurred the line between reality and fiction. Coordinating over weeks and laying the seeds of the story within Instagram stories, Love Team was an experiment with medium, using the established on-screen relationship of the actors as a foundation for drama, the reality of which was revealed a few days later, with the movie rolling credits through an Instagram post.",
    collaborators: [
      "Antoinette Jadaone",
      "John Lloyd Cruz",
      "Bea Alonzo",
    ],
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
      "In 1987, filmmaker and scholar Nick DeOcampo released Revolutions Happen Like Refrains in a Song, a documentary and film essay that studied the life of Oliver, a drag performer, against the backdrop of the last days of the Marcos dictatorship. In 2010, John Torres released Refrains Happen Like Revolutions in a Song, an experimental feature wherein he shot footage of actors without a script, all speaking in Hiligaynon, a language the director does not speak — Torres then wrote English subtitles, interpreting tone and crafting a new story disconnected from the actual words being spoken. Martika Escobar was then commissioned to create Songs Happen Like Refrains in a Revolution, a film shot during lockdown wherein she asked creative people for snippets of work, weaving them into the story of a young woman trying to write a song. All three films were screened simultaneously in adjacent rooms inside the gallery, with the sound of each movie leaking into the other rooms, simulating a conversation between generations of filmmakers working with constraints that would push their personal creativity to new heights.",
    collaborators: [
      "Nick DeOcampo",
      "John Torres",
      "Martika Escobar",
    ],
    gradientFrom: "#1a2e1a",
    gradientTo: "#0a1a0a",
    gradientAngle: 160,
    heroImage: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg",
    heroVideo: "/images/projects/revolutions-refrains-songs/trailer.mp4",
    images: [
      { src: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Orange wall with Revolutions, Refrains, Songs handwritten title", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Gallery screening room with film projection", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Dark room with single screen showing film", aspect: "wide" },
      { src: "/images/projects/revolutions-refrains-songs/installation-still-2.jpg", alt: "Pink gallery walls with poetry and text panels", aspect: "landscape" },
    ],
    videos: [
      { src: "/images/projects/revolutions-refrains-songs/trailer.mp4", poster: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Revolutions, Refrains, Songs exhibition trailer", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/installation-video-1.mp4", poster: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Multi-screen film installation playing in gallery", aspect: "landscape" },
      { src: "/images/projects/revolutions-refrains-songs/installation-video-2.mp4", poster: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Film projection in dark gallery room", aspect: "wide" },
    ],
    media: [
      { type: "video", src: "/images/projects/revolutions-refrains-songs/trailer.mp4", poster: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Revolutions, Refrains, Songs exhibition trailer", aspect: "landscape" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/gallery-title-wall.jpg", alt: "Orange wall with Revolutions, Refrains, Songs handwritten title", aspect: "landscape" },
      { type: "video", src: "/images/projects/revolutions-refrains-songs/installation-video-1.mp4", poster: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Multi-screen film installation playing in gallery", aspect: "landscape" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/installation-still-2.jpg", alt: "Pink gallery walls with poetry and text panels", aspect: "portrait" },
      { type: "video", src: "/images/projects/revolutions-refrains-songs/installation-video-2.mp4", poster: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Film projection in dark gallery room", aspect: "wide" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/screening-room.jpg", alt: "Gallery screening room with film projection", aspect: "square" },
      { type: "image", src: "/images/projects/revolutions-refrains-songs/installation-still-1.jpg", alt: "Dark room with single screen showing film", aspect: "landscape" },
    ],
  },
  {
    slug: "the-super-8-forum",
    title: "The Unconfined Cinema #4: The Super 8 Forum",
    subtitle: "The Super 8 Forum",
    year: 2024,
    venue: "Areté, Ateneo de Manila University",
    medium: "Forum, installation, collaborative film",
    format: ["Forum", "Installation", "Screening"],
    shortDescription: "Exposing younger audiences to the Super 8 film format",
    description:
      "The Super 8 Forum was held at Areté in Ateneo de Manila University. An event that exposed younger audiences to the now mostly-defunct film format, featuring talks from enthusiasts of the form, screenings of found footage, and the exhibition of new Super 8 work commissioned for the event. The Unconfined Cinema worked in collaboration with Roxlee, who set up an installation in the outdoor amphitheater of Areté. Attendees were led on a march from the third floor of the art space down to the outside, where a tent was set up. On each wall of the tent, moving image work was being projected. At the same time, Super 8 cameras were being passed around among the attendees, who were given instructions about how to shoot. The resulting footage creates a collaborative work capturing the controlled chaos of Roxlee's ritual art.",
    collaborators: ["Roxlee"],
    gradientFrom: "#2e2e1a",
    gradientTo: "#1a1a0a",
    gradientAngle: 170,
  },
  {
    slug: "moving-image-lockdown",
    title: "The Unconfined Cinema #5: Moving Image in the Time of Total Lockdown",
    subtitle: "Moving Image in the Time of Total Lockdown",
    year: 2024,
    venue: "Daadgallerie, Berlin",
    medium: "Exhibition",
    format: ["Exhibition", "Screening"],
    shortDescription: "Part of Videoke Philippines at Daadgallerie in Berlin",
    description:
      "Part of Videoke Philippines, a special showcase of the works of the film and art collective Furball, held in Daadgallerie in Berlin.",
    collaborators: ["Furball"],
    gradientFrom: "#1a1a2e",
    gradientTo: "#0a0a1a",
    gradientAngle: 200,
  },
  {
    slug: "a-conversation-on-horror",
    title: "The Unconfined Cinema #6: A Conversation on Horror",
    subtitle: "A Conversation on Horror",
    year: 2024,
    venue: "WHY NoT",
    medium: "Forum, live reading, screening",
    format: ["Forum", "Live Performance", "Screening"],
    shortDescription: "A forum on horror with filmmaker Dodo Dayao",
    description:
      "A forum on the horror genre and its elements conducted in collaboration with filmmaker Dodo Dayao. Dayao staged a live reading of an unproduced script, showed his films, and was part of a conversation parsing the elements of the genre and his approach to constructing things that leave a lasting discomfort in viewers.",
    collaborators: ["Dodo Dayao"],
    gradientFrom: "#1a0a0a",
    gradientTo: "#2e0a0a",
    gradientAngle: 160,
  },
  {
    slug: "dreams-introspection-moving",
    title: "The Unconfined Cinema #7: Dreams. Introspection. Moving Images.",
    subtitle: "Dreams. Introspection. Moving Images.",
    year: 2024,
    venue: "Project Space Pilipinas, Lucban City, Quezon",
    medium: "Film workshop",
    format: ["Workshop"],
    shortDescription: "A workshop for non-filmmakers in Lucban",
    description:
      "Done in collaboration with artist Silke Lapina, during her monthlong residency in Lucban doing research on the spiritual practices of the area. A workshop held for non-filmmakers, half of them natives of Lucban. The workshop eschewed the classic instruction for the creation of films, and instead urged the participants to take note of their dreams. The two-day session involved having the participants create storyboards based on dreams, walking around the city with a Super 8 camera, and a field trip to Sampaloc to visit Lav Diaz and observe his process.",
    collaborators: ["Silke Lapina", "Lav Diaz"],
    gradientFrom: "#2e1a1a",
    gradientTo: "#1a0a0a",
    gradientAngle: 180,
    heroImage: "/images/projects/dreams-introspection-moving/workshop-wall.jpg",
    images: [
      { src: "/images/projects/dreams-introspection-moving/workshop-wall.jpg", alt: "Dreams. Introspection. Moving Images. workshop at Project Space Pilipinas, Lucban", aspect: "landscape" },
    ],
    media: [
      { type: "image", src: "/images/projects/dreams-introspection-moving/workshop-wall.jpg", alt: "Dreams. Introspection. Moving Images. workshop at Project Space Pilipinas, Lucban", aspect: "landscape" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
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
  "Roxlee",
  "Furball",
  "Dodo Dayao",
  "Silke Lapina",
  "Lav Diaz",
  "Erwin Romulo",
  "Philbert Dy",
];
