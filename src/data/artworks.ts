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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/731580646_17896046865486085_4946006362058392429_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=bDNHnhVp84wQ7kNvwFDp2Yp&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQH2lGkMV2UfVXW5AM0NocwBwjqMEfu7Syv1_uS7DZ6w4w&oe=6A8DE406&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/568183508_17863706412486085_3168057369638715392_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=zNWM0NiyynkQ7kNvwGCM-Do&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQGBq0vd97xuySMdVPX5qg8a5XTwD5fftL95D5P1rAYbmQ&oe=6A8DDDA2&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/519504157_17852501514486085_450904647857436159_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=mfxbcoDRF4cQ7kNvwEUU8Bm&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQEasaJgH_XMnC6KVsgkq-tMDp3Vc5qCovGfC4qNVM6tjg&oe=6A8DE8CC&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/500544942_17845403193486085_7787974853815278006_n.webp?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=6g0opB0lu_kQ7kNvwHmq38K&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQGL7G60KBXMFFDKNbYc5g75MpgwN7o9j2yhjRFHm3F0Bw&oe=6A8DD168&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/634211497_17876264391486085_3765906935459845360_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=0jjIkWCSwe0Q7kNvwG0r6WH&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQEP9YDnyhV1fYICjtC9rnNrs9CcmTIRz8sNrI3-xcJClg&oe=6A8DF5C8&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/535871049_17857045668486085_762668802128071594_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=zvxsFB57oFoQ7kNvwFMqhjB&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQG5CGQ6NgEHJgu-_Vf4owqUycYa6KMuOaKqnEOGTmG6sw&oe=6A8DEE92&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/505361942_17848164159486085_6474861037744688142_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=4HSPDY2OXQMQ7kNvwHHFrCm&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQFXwB4ZMfTDkOS2ul5EVqAlxtUGvuNVDg0I2p-DvWAztw&oe=6A8DFEE0&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/499273911_17844942246486085_1300368042726079017_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=JBE70xdOqtUQ7kNvwFM6ufZ&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQFMYNoFu9JsNm8DqLzm3bhc0sQRwmubuX2MrIMSRZCAYg&oe=6A8DF247&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/572132678_17865369684486085_4349771456467844788_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=t3vwRR2riksQ7kNvwHWKb7z&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQHq_L0Vn_86PVNwkMyXf--3PASe1XjS9kv7EchuS4_G1g&oe=6A8DEA38&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/529141605_17855245545486085_5926344593230774566_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=VU3kHlC6SIIQ7kNvwFMSzLu&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQENBtQUCCsjW85C0atesYXzfuyFwkLrhVgb3Qma5JyiPg&oe=6A8DDEC2&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/502755340_17847070428486085_68428017478557191_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=WtS4pJmL0hUQ7kNvwFjyj2b&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQGYVw8OSIoyMrYi0bxpxDO9nTXnOEwgWLOOSnSVWWNqRQ&oe=6A8DD819&_nc_sid=8b3546",
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
    image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/498585780_17844589614486085_3759439454653623624_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=uqd4vYWu0V8Q7kNvwHJp151&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQH3Fp32zvC9UyiDGU78_kRgLCIg7orTzlpXCt1ixAkMMA&oe=6A8DEAB4&_nc_sid=8b3546",
    description: "Started with vision, ended in confusion 😞",
    medium: "Original Instagram Artwork",
    year: "2024",
    price: "₹799",
    orientation: "square",
  }
];
