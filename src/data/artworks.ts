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
    description: "A vibrant depiction of Lord Jagannath, blending traditional Odisha color palettes with contemporary detailing.",
    medium: "Acrylic on Canvas",
    year: "2023",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-jay-jagannath",
    title: "Jay Jagannath",
    category: "ODISHA & JAGANNATH",
    image: "/artworks/jayJagannath.png",
    description: "An intricate, circular mandala featuring divine motifs centered around Lord Jagannath.",
    medium: "Pen, Ink & Acrylic",
    year: "2023",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-kanha",
    title: "Kanha",
    category: "ODISHA & JAGANNATH",
    image: "/artworks/kanha.png",
    description: "A devotionally inspired piece capturing the essence of Krishna through dot work and traditional patterns.",
    medium: "Mixed Media",
    year: "2023",
    orientation: "square",
  },
  {
    id: "aw-flute",
    title: "The Divine Flute",
    category: "DECORATIVE",
    image: "/artworks/flute.png",
    description: "A highly detailed study of musical motifs interwoven with floral mandala patterns.",
    medium: "Pen & Ink",
    year: "2024",
    orientation: "square",
  },
  {
    id: "aw-mandala",
    title: "Monochrome Maze",
    category: "PEN & INK",
    image: "/artworks/mandala.png",
    description: "A complex, geometric black-and-white pen and ink drawing that draws the viewer into a meditative state.",
    medium: "Pen & Ink on Paper",
    year: "2024",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-cute",
    title: "Floral Harmony",
    category: "DECORATIVE",
    image: "/artworks/cute.png",
    description: "A delicate, nature-inspired decorative piece focusing on organic symmetry.",
    medium: "Pen & Ink",
    year: "2024",
    orientation: "square",
  },
  {
    id: "aw-cute2",
    title: "Nature's Rhythm",
    category: "DECORATIVE",
    image: "/artworks/cute2.png",
    description: "An intricate exploration of botanical forms using high-contrast black and white linework.",
    medium: "Fine Liner",
    year: "2024",
    orientation: "square",
  },
  {
    id: "aw-art1",
    title: "Handmade Shell Art",
    category: "HANDMADE",
    image: "/artworks/art-1.png",
    description: "A unique handmade creation bringing traditional patterns onto organic surfaces.",
    medium: "Acrylic on Shell",
    year: "2023",
    orientation: "square",
  },
  {
    id: "aw-art2",
    title: "Nature's Dot Art",
    category: "HANDMADE",
    image: "/artworks/art-2.png",
    description: "A vibrant green and yellow handmade dot art piece, beautifully photographed in nature.",
    medium: "Acrylic Dot Art",
    year: "2024",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-art3",
    title: "Vertical Symmetry",
    category: "HANDMADE",
    image: "/artworks/art-3-portrait.png",
    description: "An elegant, tall composition highlighting the beauty of cascading patterns.",
    medium: "Mixed Media",
    year: "2024",
    featured: true,
    orientation: "portrait",
  },
  {
    id: "aw-art4",
    title: "Earthen Craft",
    category: "HANDMADE",
    image: "/artworks/art-4.png",
    description: "Handcrafted art object featuring deep, resonant colors and sacred geometry.",
    medium: "Handmade Craft",
    year: "2023",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-art5",
    title: "Ink Whispers",
    category: "PEN & INK",
    image: "/artworks/art-5.png",
    description: "A highly detailed, patient exploration of line weight, contrast, and shading.",
    medium: "Pen & Ink",
    year: "2024",
    featured: true,
    orientation: "square",
  },
  {
    id: "aw-art6",
    title: "Festive Motifs",
    category: "DECORATIVE",
    image: "/artworks/art-6.png",
    description: "Bright, engaging patterns designed to bring warmth and joy to any space.",
    medium: "Acrylic",
    year: "2023",
    orientation: "square",
  },
  {
    id: "aw-art7",
    title: "Textured Memory",
    category: "HANDMADE",
    image: "/artworks/art-7.png",
    description: "A tactile handmade piece that invites touch and close inspection.",
    medium: "Mixed Media",
    year: "2023",
    orientation: "square",
  },
  {
    id: "aw-art8",
    title: "Sacred Circle",
    category: "MANDALA",
    image: "/artworks/art-8.png",
    description: "A classical mandala offering a sense of profound calm and aesthetic balance.",
    medium: "Dot Art",
    year: "2024",
    orientation: "square",
  }
];

