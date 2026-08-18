export type ArtworkCategory = 
  | 'MANDALA'
  | 'ODISHA & JAGANNATH'
  | 'PEN & INK'
  | 'HANDMADE'
  | 'DECORATIVE';

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  image: string;
  description: string;
  medium: string;
  year: number | string;
  featured?: boolean;
  orientation?: 'square' | 'portrait' | 'landscape';
}

export const artworks: Artwork[] = [
  {
    id: "aw-jagannath",
    title: "Jagannath",
    category: "ODISHA & JAGANNATH",
    image: "/artworks/Jagannath.png",
    description: "[PLACEHOLDER: Description of Jagannath artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-jay-jagannath",
    title: "Jay Jagannath",
    category: "ODISHA & JAGANNATH",
    image: "/artworks/jayJagannath.png",
    description: "[PLACEHOLDER: Description of Jay Jagannath artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-kanha",
    title: "Kanha",
    category: "ODISHA & JAGANNATH",
    image: "/artworks/kanha.png",
    description: "[PLACEHOLDER: Description of Kanha artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  },
  {
    id: "aw-flute",
    title: "Flute",
    category: "DECORATIVE",
    image: "/artworks/flute.png",
    description: "[PLACEHOLDER: Description of Flute artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  },
  {
    id: "aw-mandala",
    title: "Mandala",
    category: "MANDALA",
    image: "/artworks/mandala.png",
    description: "[PLACEHOLDER: Description of Mandala artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-cute",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "DECORATIVE",
    image: "/artworks/cute.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  },
  {
    id: "aw-cute2",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "DECORATIVE",
    image: "/artworks/cute2.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  },
  {
    id: "aw-art1",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "HANDMADE",
    image: "/artworks/art-1.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  },
  {
    id: "aw-art2",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "PEN & INK",
    image: "/artworks/art-2.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-art3",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "HANDMADE",
    image: "/artworks/art-3-portrait.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    featured: true,
    orientation: "portrait",
  },
  {
    id: "aw-art4",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "HANDMADE",
    image: "/artworks/art-4.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-art5",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "PEN & INK",
    image: "/artworks/art-5.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-art6",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "DECORATIVE",
    image: "/artworks/art-6.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  },
  {
    id: "aw-art7",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "HANDMADE",
    image: "/artworks/art-7.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  },
  {
    id: "aw-art8",
    title: "[PLACEHOLDER: Artwork Title]",
    category: "MANDALA",
    image: "/artworks/art-8.png",
    description: "[PLACEHOLDER: Description of artwork]",
    medium: "[PLACEHOLDER: Medium]",
    year: "[PLACEHOLDER: Year]",
    orientation: "square",
  }
];

