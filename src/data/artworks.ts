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
  year: number;
  featured?: boolean;
}

export const artworks: Artwork[] = [
  {
    id: "aw-1",
    title: "Divine Presence",
    category: "ODISHA & JAGANNATH",
    image: "/placeholder-1.jpg",
    description: "An intricate depiction of Lord Jagannath inspired by traditional Pattachitra styles with modern detailing.",
    medium: "Acrylic on Canvas",
    year: 2023,
    featured: true,
  },
  {
    id: "aw-2",
    title: "Sacred Geometry",
    category: "MANDALA",
    image: "/placeholder-2.jpg",
    description: "A highly detailed dot mandala representing cosmic balance and inner peace.",
    medium: "Dot Art on Canvas",
    year: 2023,
    featured: true,
  },
  {
    id: "aw-3",
    title: "Monochrome Nature",
    category: "PEN & INK",
    image: "/placeholder-3.jpg",
    description: "Intricate black-and-white pen and ink drawing featuring floral patterns.",
    medium: "Pen and Ink on Paper",
    year: 2022,
  },
  {
    id: "aw-4",
    title: "Peacock Elegance",
    category: "DECORATIVE",
    image: "/placeholder-4.jpg",
    description: "Vibrant traditional decorative pattern celebrating the Indian peafowl.",
    medium: "Mixed Media",
    year: 2024,
    featured: true,
  },
  {
    id: "aw-5",
    title: "Ocean Shell Art",
    category: "HANDMADE",
    image: "/placeholder-5.jpg",
    description: "Hand-painted intricate designs on natural sea shells.",
    medium: "Acrylic on Shell",
    year: 2023,
  },
  {
    id: "aw-6",
    title: "Cosmic Bloom",
    category: "MANDALA",
    image: "/placeholder-6.jpg",
    description: "A vibrant circular mandala blending warm and cool tones to signify life's blossoming journey.",
    medium: "Dot Art on Wood",
    year: 2024,
    featured: true,
  }
];
