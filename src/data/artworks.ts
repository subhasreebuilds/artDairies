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
  categories?: ArtworkCategory[];
  image: string;
  description: string;
  medium: string;
  year: number | string;
  featured?: boolean;
  orientation?: 'square' | 'portrait' | 'landscape';
  price?: string;
}

export const CATEGORY_PRICES: Record<ArtworkCategory, string> = {
  "ODISHA & JAGANNATH": "₹1,099",
  "MANDALA": "₹1,199",
  "PEN & INK": "₹999",
  "HANDMADE": "₹1,099",
  "DECORATIVE": "₹799"
};

// 12 REAL INSTAGRAM WORKS FROM @art_.diaries._ (Ordered by Visual Grid Position 1 to 12)
export const artworks: Artwork[] = [
  // Position 1: Red Jagannath Painting (ODISHA & JAGANNATH)
  {
    id: "insta-3933982870994107354",
    title: "Not Perfect. Just Devotion",
    category: "ODISHA & JAGANNATH",
    categories: ["ODISHA & JAGANNATH"],
    image: "https://www.instagram.com/p/DaYUJP6Ezva/media/?size=l",
    description: "Not perfect. Just devotion.",
    medium: "Handmade Artwork",
    year: "2024",
    price: "₹1,099",
    featured: true,
    orientation: "square",
  },
  // Position 2: Black & White Fine Liner Mandala (PEN & INK)
  {
    id: "insta-3748304991087165783",
    title: "Celestial Flow",
    category: "PEN & INK",
    categories: ["PEN & INK"],
    image: "https://www.instagram.com/p/DQEp4evkwFX/media/?size=l",
    description: "💫 Celestial flow",
    medium: "Fine Liner on Paper",
    year: "2024",
    price: "₹999",
    featured: true,
    orientation: "portrait",
  },
  // Position 3: Black & White Bird/Line Art (PEN & INK)
  {
    id: "insta-3676633705957220665",
    title: "Intricate Ties",
    category: "PEN & INK",
    categories: ["PEN & INK"],
    image: "https://www.instagram.com/p/DMGBuA8zuE5/media/?size=l",
    description: "🖇️ Handcrafted creation",
    medium: "Handmade Craft",
    year: "2024",
    price: "₹999",
    orientation: "portrait",
  },
  // Position 4: Circular Jagannath Mandala held in hand (ODISHA & JAGANNATH, MANDALA)
  {
    id: "insta-3638876963735373852",
    title: "Circular Harmony",
    category: "ODISHA & JAGANNATH",
    categories: ["ODISHA & JAGANNATH", "MANDALA"],
    image: "https://www.instagram.com/p/DJ_41GkzIgc/media/?size=l",
    description: "⭕❗⭕ Sacred mandala geometry",
    medium: "Dot Art",
    year: "2024",
    price: "₹1,099",
    orientation: "square",
  },
  // Position 5: Handcrafted Painted Cups with Shells (HANDMADE)
  {
    id: "insta-3831754309177119487",
    title: "Monochrome Harmony",
    category: "HANDMADE",
    categories: ["HANDMADE"],
    image: "https://www.instagram.com/p/DUtID4hExL_/media/?size=l",
    description: "🩶 Handcrafted with love",
    medium: "Pen & Ink",
    year: "2024",
    price: "₹1,099",
    featured: true,
    orientation: "portrait",
  },
  // Position 6: Colorful Dot Mandala Plate held in front of face (DECORATIVE, MANDALA)
  {
    id: "insta-3704211785722583819",
    title: "Golden Glow",
    category: "DECORATIVE",
    categories: ["DECORATIVE", "MANDALA"],
    image: "https://www.instagram.com/p/DNoAP5Mz1sL/media/?size=l",
    description: "✨ Radiant art",
    medium: "Acrylic on Canvas",
    year: "2024",
    price: "₹799",
    featured: true,
    orientation: "square",
  },
  // Position 7: Jagannath Dot Mandala Plate on Reflection Surface (ODISHA & JAGANNATH, MANDALA)
  {
    id: "insta-3651195655798178525",
    title: "Sacred Dot Mandala",
    category: "ODISHA & JAGANNATH",
    categories: ["ODISHA & JAGANNATH", "MANDALA"],
    image: "https://www.instagram.com/p/DKrpxqlTMLd/media/?size=l",
    description: "⭕❗⭕ Geometric dot mandala",
    medium: "Acrylic Dot Art",
    year: "2024",
    price: "₹1,099",
    orientation: "square",
  },
  // Position 8: Blue Lord Shiva Art Plate (DECORATIVE, MANDALA)
  {
    id: "insta-3637263708369943693",
    title: "Heart Of Art",
    category: "DECORATIVE",
    categories: ["DECORATIVE", "MANDALA"],
    image: "https://www.instagram.com/p/DJ6KBJbz3yN/media/?size=l",
    description: "❤️ Handmade with passion",
    medium: "Mixed Media",
    year: "2024",
    price: "₹799",
    orientation: "square",
  },
  // Position 9: Black/Gold Circular Plate held up (DECORATIVE, MANDALA)
  {
    id: "insta-3759913521976134505",
    title: "Spark Of Creativity",
    category: "DECORATIVE",
    categories: ["DECORATIVE", "MANDALA"],
    image: "https://www.instagram.com/p/DQt5W1nk0tp/media/?size=l",
    description: "✨ Divine details",
    medium: "Acrylic & Ink",
    year: "2024",
    price: "₹799",
    featured: true,
    orientation: "square",
  },
  // Position 10: Jagannath & Puri Temple Sketch (PEN & INK)
  {
    id: "insta-3693306255474754015",
    title: "Divine Flute Devotion",
    category: "PEN & INK",
    categories: ["PEN & INK"],
    image: "https://www.instagram.com/p/DNBQnisTQHf/media/?size=l",
    description: "🪈🙏 Divine melody and devotion",
    medium: "Acrylic & Pen",
    year: "2024",
    price: "₹999",
    featured: true,
    orientation: "square",
  },
  // Position 11: Small Yellow/Green Mandala held in hand (DECORATIVE, MANDALA)
  {
    id: "insta-3645371023996400890",
    title: "Light & Symmetry",
    category: "DECORATIVE",
    categories: ["DECORATIVE", "MANDALA"],
    image: "https://www.instagram.com/p/DKW9aHfzrT6/media/?size=l",
    description: "✨ Precision linework",
    medium: "Pen & Ink",
    year: "2024",
    price: "₹799",
    orientation: "portrait",
  },
  // Position 12: Small Blue Dot Mandala Coaster held in hand (DECORATIVE, MANDALA)
  {
    id: "insta-3636016362550167741",
    title: "Vision & Confusion",
    category: "DECORATIVE",
    categories: ["DECORATIVE", "MANDALA"],
    image: "https://www.instagram.com/p/DJ1uZ4HT4i9/media/?size=l",
    description: "Started with vision, ended in confusion 😞",
    medium: "Original Instagram Artwork",
    year: "2024",
    price: "₹799",
    orientation: "square",
  }
];
