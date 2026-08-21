import { ArtworkCategory } from "@/data/artworks";
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
  const caption = item.caption || "";
  const category = parseInstagramCategory(caption);
  const title = parseInstagramTitle(caption, item.id);
  const medium = parseInstagramMedium(caption);
  
  const year = item.timestamp ? new Date(item.timestamp).getFullYear().toString() : new Date().getFullYear().toString();
  const imageUrl = item.media_type === "VIDEO" && item.thumbnail_url ? item.thumbnail_url : item.media_url;

  return {
    id: `insta-${item.id}`,
    title,
    category,
    image: imageUrl,
    description: caption.length > 150 ? caption.slice(0, 147) + "..." : (caption || "Handcrafted original artwork shared on Instagram."),
    medium,
    year,
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
    {
      id: "3933982870994107354",
      shortcode: "DaYUJP6Ezva",
      title: "Not Perfect. Just Devotion",
      category: "ODISHA & JAGANNATH" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/731580646_17896046865486085_4946006362058392429_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=bDNHnhVp84wQ7kNvwFDp2Yp&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQH2lGkMV2UfVXW5AM0NocwBwjqMEfu7Syv1_uS7DZ6w4w&oe=6A8DE406&_nc_sid=8b3546",
      caption: "Not perfect. Just devotion.",
      medium: "Handmade Artwork",
      likes: 24,
      comments: 1,
      orientation: "square" as const
    },
    {
      id: "3831754309177119487",
      shortcode: "DUtID4hExL_",
      title: "Monochrome Harmony",
      category: "PEN & INK" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/634211497_17876264391486085_3765906935459845360_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=0jjIkWCSwe0Q7kNvwG0r6WH&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQEP9YDnyhV1fYICjtC9rnNrs9CcmTIRz8sNrI3-xcJClg&oe=6A8DF5C8&_nc_sid=8b3546",
      caption: "🩶 Handcrafted with love",
      medium: "Pen & Ink",
      likes: 33,
      comments: 4,
      orientation: "portrait" as const
    },
    {
      id: "3759913521976134505",
      shortcode: "DQt5W1nk0tp",
      title: "Spark Of Creativity",
      category: "DECORATIVE" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/572132678_17865369684486085_4349771456467844788_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=t3vwRR2riksQ7kNvwHWKb7z&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQHq_L0Vn_86PVNwkMyXf--3PASe1XjS9kv7EchuS4_G1g&oe=6A8DEA38&_nc_sid=8b3546",
      caption: "✨ Divine details",
      medium: "Acrylic & Ink",
      likes: 33,
      comments: 4,
      orientation: "square" as const
    },
    {
      id: "3748304991087165783",
      shortcode: "DQEp4evkwFX",
      title: "Celestial Flow",
      category: "DECORATIVE" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/568183508_17863706412486085_3168057369638715392_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=zNWM0NiyynkQ7kNvwGCM-Do&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQGBq0vd97xuySMdVPX5qg8a5XTwD5fftL95D5P1rAYbmQ&oe=6A8DDDA2&_nc_sid=8b3546",
      caption: "💫 Celestial flow",
      medium: "Fine Liner on Paper",
      likes: 30,
      comments: 0,
      orientation: "portrait" as const
    },
    {
      id: "3704211785722583819",
      shortcode: "DNoAP5Mz1sL",
      title: "Golden Glow",
      category: "DECORATIVE" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/535871049_17857045668486085_762668802128071594_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=zvxsFB57oFoQ7kNvwFMqhjB&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQG5CGQ6NgEHJgu-_Vf4owqUycYa6KMuOaKqnEOGTmG6sw&oe=6A8DEE92&_nc_sid=8b3546",
      caption: "✨ Radiant art",
      medium: "Acrylic on Canvas",
      likes: 79,
      comments: 1,
      orientation: "square" as const
    },
    {
      id: "3693306255474754015",
      shortcode: "DNBQnisTQHf",
      title: "Divine Flute Devotion",
      category: "ODISHA & JAGANNATH" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/529141605_17855245545486085_5926344593230774566_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=VU3kHlC6SIIQ7kNvwFMSzLu&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQENBtQUCCsjW85C0atesYXzfuyFwkLrhVgb3Qma5JyiPg&oe=6A8DDEC2&_nc_sid=8b3546",
      caption: "🪈🙏 Divine melody and devotion",
      medium: "Acrylic & Pen",
      likes: 86,
      comments: 2,
      orientation: "square" as const
    },
    {
      id: "3676633705957220665",
      shortcode: "DMGBuA8zuE5",
      title: "Intricate Ties",
      category: "HANDMADE" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.82787-15/519504157_17852501514486085_450904647857436159_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=mfxbcoDRF4cQ7kNvwEUU8Bm&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQEasaJgH_XMnC6KVsgkq-tMDp3Vc5qCovGfC4qNVM6tjg&oe=6A8DE8CC&_nc_sid=8b3546",
      caption: "🖇️ Handcrafted creation",
      medium: "Handmade Craft",
      likes: 25,
      comments: 0,
      orientation: "portrait" as const
    },
    {
      id: "3651195655798178525",
      shortcode: "DKrpxqlTMLd",
      title: "Sacred Dot Mandala",
      category: "MANDALA" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/505361942_17848164159486085_6474861037744688142_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=4HSPDY2OXQMQ7kNvwHHFrCm&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQFXwB4ZMfTDkOS2ul5EVqAlxtUGvuNVDg0I2p-DvWAztw&oe=6A8DFEE0&_nc_sid=8b3546",
      caption: "⭕❗⭕ Geometric dot mandala",
      medium: "Acrylic Dot Art",
      likes: 33,
      comments: 2,
      orientation: "square" as const
    },
    {
      id: "3645371023996400890",
      shortcode: "DKW9aHfzrT6",
      title: "Light & Symmetry",
      category: "MANDALA" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/502755340_17847070428486085_68428017478557191_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=WtS4pJmL0hUQ7kNvwFjyj2b&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQGYVw8OSIoyMrYi0bxpxDO9nTXnOEwgWLOOSnSVWWNqRQ&oe=6A8DD819&_nc_sid=8b3546",
      caption: "✨ Precision linework",
      medium: "Pen & Ink",
      likes: 27,
      comments: 1,
      orientation: "portrait" as const
    },
    {
      id: "3638876963735373852",
      shortcode: "DJ_41GkzIgc",
      title: "Circular Harmony",
      category: "MANDALA" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/500544942_17845403193486085_7787974853815278006_n.webp?stp=dst-jpg_e35_p1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=6g0opB0lu_kQ7kNvwHmq38K&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQGL7G60KBXMFFDKNbYc5g75MpgwN7o9j2yhjRFHm3F0Bw&oe=6A8DD168&_nc_sid=8b3546",
      caption: "⭕❗⭕ Sacred mandala geometry",
      medium: "Dot Art",
      likes: 29,
      comments: 2,
      orientation: "square" as const
    },
    {
      id: "3637263708369943693",
      shortcode: "DJ6KBJbz3yN",
      title: "Heart Of Art",
      category: "DECORATIVE" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/499273911_17844942246486085_1300368042726079017_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=JBE70xdOqtUQ7kNvwFM6ufZ&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQFMYNoFu9JsNm8DqLzm3bhc0sQRwmubuX2MrIMSRZCAYg&oe=6A8DF247&_nc_sid=8b3546",
      caption: "❤️ Handmade with passion",
      medium: "Mixed Media",
      likes: 27,
      comments: 0,
      orientation: "square" as const
    },
    {
      id: "3636016362550167741",
      shortcode: "DJ1uZ4HT4i9",
      title: "Vision & Confusion",
      category: "DECORATIVE" as ArtworkCategory,
      image: "https://scontent-bom2-3.cdninstagram.com/v/t51.2885-15/498585780_17844589614486085_3759439454653623624_n.webp?stp=dst-jpg_e35_s1080x1080_sh2.08_tt6&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gHnnz4xdHKoTkvneJlQNcNp3oZjrT2pEMYDNYmXcwxkwj2IZxD6vWmqtcGrE92WQ_E&_nc_ohc=uqd4vYWu0V8Q7kNvwHJp151&_nc_gid=ke0gu_De2vfZRdNimf--NQ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AQH3Fp32zvC9UyiDGU78_kRgLCIg7orTzlpXCt1ixAkMMA&oe=6A8DEAB4&_nc_sid=8b3546",
      caption: "Started with vision, ended in confusion 😞",
      medium: "Original Instagram Artwork",
      likes: 27,
      comments: 1,
      orientation: "square" as const
    }
  ];

  return realInstagramPosts.map((item) => ({
    id: `insta-${item.id}`,
    title: item.title,
    category: item.category,
    image: item.image,
    description: item.caption,
    medium: item.medium,
    year: "2024",
    featured: true,
    orientation: item.orientation,
    isInstagram: true,
    permalink: `https://www.instagram.com/p/${item.shortcode}/`,
    likeCount: item.likes,
    commentsCount: item.comments,
    timestamp: undefined,
    instagramUsername: cleanId,
    originalCaption: item.caption
  }));
}
