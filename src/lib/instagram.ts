import { ArtworkCategory, artworks as staticArtworks, CATEGORY_PRICES } from "@/data/artworks";
import { InstagramMediaItem, InstagramArtwork } from "@/types/instagram";

// Helper to determine artwork category from caption or hashtags
export function parseInstagramCategory(caption: string = ""): ArtworkCategory {
  const text = caption.toLowerCase();
  
  if (text.includes("mandala") || text.includes("dotart") || text.includes("dot_art") || text.includes("sacred") || text.includes("⭕")) {
    return "MANDALA";
  }
  if (text.includes("jagannath") || text.includes("odisha") || text.includes("puri") || text.includes("devotion") || text.includes("🪈")) {
    return "ODISHA & JAGANNATH";
  }
  if (text.includes("ink") || text.includes("pen") || text.includes("fineliner") || text.includes("monochrome") || text.includes("drawing") || text.includes("🩶")) {
    return "PEN & INK";
  }
  if (text.includes("handmade") || text.includes("craft") || text.includes("shell") || text.includes("clay") || text.includes("diy") || text.includes("🖇️")) {
    return "HANDMADE";
  }
  return "DECORATIVE";
}

// Helper to extract clean title from caption
export function parseInstagramTitle(caption: string = "", defaultId: string): string {
  if (!caption) return `Instagram Work #${defaultId.slice(-4)}`;
  
  const lines = caption.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length > 0) {
    const firstLine = lines[0]
      .replace(/#[\w\u0590-\u05ff]+/g, "")
      .replace(/[^\w\s\u00C0-\u024F\u1E00-\u1EFF']/gi, " ")
      .trim();
    if (firstLine.length >= 3 && firstLine.length <= 40) {
      return firstLine.charAt(0).toUpperCase() + firstLine.slice(1);
    }
  }
  return `Instagram Artwork ${defaultId.slice(-4)}`;
}

// Helper to parse medium from caption
export function parseInstagramMedium(caption: string = ""): string {
  const text = caption.toLowerCase();
  if (text.includes("acrylic")) return "Acrylic on Canvas";
  if (text.includes("pen") && text.includes("ink")) return "Pen & Ink on Paper";
  if (text.includes("dot art") || text.includes("⭕")) return "Acrylic Dot Art";
  if (text.includes("watercolor") || text.includes("watercolour")) return "Watercolor";
  if (text.includes("mixed media")) return "Mixed Media";
  if (text.includes("fineliner")) return "Fine Liner on Paper";
  return "Original Instagram Art";
}

// Convert Instagram API item to Artwork model
export function convertInstagramItemToArtwork(
  item: InstagramMediaItem,
  index: number
): InstagramArtwork {
  const staticMatch = staticArtworks.find(a => a.id === `insta-${item.id}`);
  const caption = item.caption || "";
  const category = staticMatch?.category || parseInstagramCategory(caption);
  const categories = staticMatch?.categories || [category];
  const title = staticMatch?.title || parseInstagramTitle(caption, item.id);
  const medium = parseInstagramMedium(caption);
  
  const year = item.timestamp ? new Date(item.timestamp).getFullYear().toString() : new Date().getFullYear().toString();
  const imageUrl = item.media_type === "VIDEO" && item.thumbnail_url ? item.thumbnail_url : item.media_url;

  return {
    id: `insta-${item.id}`,
    title,
    category,
    categories,
    image: imageUrl,
    description: caption.length > 150 ? caption.slice(0, 147) + "..." : (caption || "Handcrafted original artwork shared on Instagram."),
    medium,
    year,
    price: staticMatch?.price || CATEGORY_PRICES[category] || "₹699",
    featured: index < 6,
    orientation: index % 3 === 0 ? "portrait" : index % 3 === 1 ? "landscape" : "square",
    isInstagram: true,
    permalink: item.permalink || `https://instagram.com/art_.diaries._`,
    likeCount: typeof item.like_count === "number" ? item.like_count : undefined,
    commentsCount: typeof item.comments_count === "number" ? item.comments_count : undefined,
    timestamp: item.timestamp,
    instagramUsername: item.username || "art_.diaries._",
    originalCaption: caption
  };
}

// Fetch Instagram posts for a given Instagram username / ID or token
export async function fetchInstagramArtworks(
  usernameOrId: string = "art_.diaries._",
  accessToken?: string
): Promise<{ artworks: InstagramArtwork[]; isLive: boolean; profileInfo?: any }> {
  try {
    const cleanId = usernameOrId.trim().replace(/^@/, "");
    
    // Call server route /api/instagram
    const response = await fetch(`/api/instagram?username=${encodeURIComponent(cleanId)}${accessToken ? `&token=${encodeURIComponent(accessToken)}` : ''}`, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      if (data.artworks && data.artworks.length > 0) {
        return {
          artworks: data.artworks,
          isLive: data.isLive ?? true,
          profileInfo: data.profileInfo
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch Instagram artworks:", error);
  }

  return {
    artworks: generateFallbackInstagramArtworks(usernameOrId),
    isLive: false,
    profileInfo: {
      username: usernameOrId.replace(/^@/, ""),
      name: "Art Diaries Studio",
      biography: "Sacred Mandalas • Odisha Heritage • Fine Pen & Ink"
    }
  };
}

// ALL 12 REAL INSTAGRAM POSTS FETCHED FROM @art_.diaries._
export function generateFallbackInstagramArtworks(instaId: string): InstagramArtwork[] {
  const cleanId = instaId.replace(/^@/, "");
  
  const realInstagramPosts = [
    // Position 1: Red Jagannath Painting (ODISHA & JAGANNATH)
    {
      id: "3933982870994107354",
      shortcode: "DaYUJP6Ezva",
      title: "Not Perfect. Just Devotion",
      category: "ODISHA & JAGANNATH" as ArtworkCategory,
      image: "/images/artworks/artwork-1.jpg",
      caption: "Not perfect. Just devotion.",
      medium: "Handmade Artwork",
      likes: 24,
      comments: 1,
      orientation: "square" as const
    },
    // Position 2: Black & White Fine Liner Mandala (PEN & INK)
    {
      id: "3748304991087165783",
      shortcode: "DQEp4evkwFX",
      title: "Celestial Flow",
      category: "PEN & INK" as ArtworkCategory,
      image: "/images/artworks/artwork-2.jpg",
      caption: "💫 Celestial flow",
      medium: "Fine Liner on Paper",
      likes: 30,
      comments: 0,
      orientation: "portrait" as const
    },
    // Position 3: Black & White Bird/Line Art (PEN & INK)
    {
      id: "3676633705957220665",
      shortcode: "DMGBuA8zuE5",
      title: "Intricate Ties",
      category: "PEN & INK" as ArtworkCategory,
      image: "/images/artworks/artwork-3.jpg",
      caption: "🖇️ Handcrafted creation",
      medium: "Handmade Craft",
      likes: 25,
      comments: 0,
      orientation: "portrait" as const
    },
    // Position 4: Circular Jagannath Mandala held in hand (ODISHA & JAGANNATH)
    {
      id: "3638876963735373852",
      shortcode: "DJ_41GkzIgc",
      title: "Circular Harmony",
      category: "ODISHA & JAGANNATH" as ArtworkCategory,
      image: "/images/artworks/artwork-4.jpg",
      caption: "⭕❗⭕ Sacred mandala geometry",
      medium: "Dot Art",
      likes: 29,
      comments: 2,
      orientation: "square" as const
    },
    // Position 5: Handcrafted Painted Cups with Shells (HANDMADE)
    {
      id: "3831754309177119487",
      shortcode: "DUtID4hExL_",
      title: "Monochrome Harmony",
      category: "HANDMADE" as ArtworkCategory,
      image: "/images/artworks/artwork-5.jpg",
      caption: "🩶 Handcrafted with love",
      medium: "Pen & Ink",
      likes: 33,
      comments: 4,
      orientation: "portrait" as const
    },
    // Position 6: Colorful Dot Mandala Plate held in front of face (DECORATIVE)
    {
      id: "3704211785722583819",
      shortcode: "DNoAP5Mz1sL",
      title: "Golden Glow",
      category: "DECORATIVE" as ArtworkCategory,
      image: "/images/artworks/artwork-6.jpg",
      caption: "✨ Radiant art",
      medium: "Acrylic on Canvas",
      likes: 79,
      comments: 1,
      orientation: "square" as const
    },
    // Position 7: Jagannath Dot Mandala Plate on Reflection Surface (ODISHA & JAGANNATH)
    {
      id: "3651195655798178525",
      shortcode: "DKrpxqlTMLd",
      title: "Sacred Dot Mandala",
      category: "ODISHA & JAGANNATH" as ArtworkCategory,
      image: "/images/artworks/artwork-7.jpg",
      caption: "⭕❗⭕ Geometric dot mandala",
      medium: "Acrylic Dot Art",
      likes: 33,
      comments: 2,
      orientation: "square" as const
    },
    // Position 8: Blue Lord Shiva Art Plate (DECORATIVE)
    {
      id: "3637263708369943693",
      shortcode: "DJ6KBJbz3yN",
      title: "Heart Of Art",
      category: "DECORATIVE" as ArtworkCategory,
      image: "/images/artworks/artwork-8.jpg",
      caption: "❤️ Handmade with passion",
      medium: "Mixed Media",
      likes: 27,
      comments: 0,
      orientation: "square" as const
    },
    // Position 9: Black/Gold Circular Plate held up (DECORATIVE)
    {
      id: "3759913521976134505",
      shortcode: "DQt5W1nk0tp",
      title: "Spark Of Creativity",
      category: "DECORATIVE" as ArtworkCategory,
      image: "/images/artworks/artwork-9.jpg",
      caption: "✨ Divine details",
      medium: "Acrylic & Ink",
      likes: 33,
      comments: 4,
      orientation: "square" as const
    },
    // Position 10: Jagannath & Puri Temple Sketch (PEN & INK)
    {
      id: "3693306255474754015",
      shortcode: "DNBQnisTQHf",
      title: "Divine Flute Devotion",
      category: "PEN & INK" as ArtworkCategory,
      image: "/images/artworks/artwork-10.jpg",
      caption: "🪈🙏 Divine melody and devotion",
      medium: "Acrylic & Pen",
      likes: 86,
      comments: 2,
      orientation: "square" as const
    },
    // Position 11: Small Yellow/Green Mandala held in hand (DECORATIVE)
    {
      id: "3645371023996400890",
      shortcode: "DKW9aHfzrT6",
      title: "Light & Symmetry",
      category: "DECORATIVE" as ArtworkCategory,
      image: "/images/artworks/artwork-11.jpg",
      caption: "✨ Precision linework",
      medium: "Pen & Ink",
      likes: 27,
      comments: 1,
      orientation: "portrait" as const
    },
    // Position 12: Small Blue Dot Mandala Coaster held in hand (DECORATIVE)
    {
      id: "3636016362550167741",
      shortcode: "DJ1uZ4HT4i9",
      title: "Vision & Confusion",
      category: "DECORATIVE" as ArtworkCategory,
      image: "/images/artworks/artwork-12.jpg",
      caption: "Started with vision, ended in confusion 😞",
      medium: "Original Instagram Artwork",
      likes: 27,
      comments: 1,
      orientation: "square" as const
    }
  ];

  return realInstagramPosts.map((item) => {
    const staticMatch = staticArtworks.find(a => a.id === `insta-${item.id}`);
    const category = staticMatch?.category || item.category;
    const categories = staticMatch?.categories || [category];
    return {
      id: `insta-${item.id}`,
      title: staticMatch?.title || item.title,
      category,
      categories,
      image: staticMatch?.image || `https://www.instagram.com/p/${item.shortcode}/media/?size=l`,
      description: item.caption,
      medium: item.medium,
      year: "2024",
      price: staticMatch?.price || CATEGORY_PRICES[category] || "₹699",
      featured: true,
      orientation: item.orientation,
      isInstagram: true,
      permalink: `https://www.instagram.com/p/${item.shortcode}/`,
      likeCount: item.likes,
      commentsCount: item.comments,
      timestamp: undefined,
      instagramUsername: cleanId,
      originalCaption: item.caption
    };
  });
}
