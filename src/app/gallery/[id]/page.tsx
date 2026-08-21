import { notFound } from "next/navigation";
import { artworks } from "@/data/artworks";
import { generateFallbackInstagramArtworks } from "@/lib/instagram";
import ArtworkDetailClient from "./ArtworkDetailClient";

export default async function ArtworkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Combine static & generated fallback instagram artworks for initial server render
  const defaultInstaArtworks = generateFallbackInstagramArtworks("art_.diaries._");
  const allInitialArtworks = defaultInstaArtworks;

  let currentIndex = allInitialArtworks.findIndex((a) => a.id === id);

  // Strip 'insta-' prefix if needed to match fallback
  if (currentIndex === -1 && id.startsWith("insta-")) {
    const rawId = id.replace(/^insta-/, "");
    currentIndex = allInitialArtworks.findIndex((a) => a.id === rawId || a.id === `aw-${rawId}`);
  }

  // Fallback to first artwork if not found initially so client context can re-hydrate
  const artwork = currentIndex !== -1 ? allInitialArtworks[currentIndex] : allInitialArtworks[0];
  if (!artwork) {
    notFound();
  }

  const prevArtwork = currentIndex > 0 ? allInitialArtworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < allInitialArtworks.length - 1 ? allInitialArtworks[currentIndex + 1] : null;

  const relatedArtworks = allInitialArtworks
    .filter((a) => a.category === artwork.category && a.id !== artwork.id)
    .slice(0, 3);

  return (
    <ArtworkDetailClient 
      artwork={artwork} 
      prevArtwork={prevArtwork} 
      nextArtwork={nextArtwork} 
      relatedArtworks={relatedArtworks}
    />
  );
}
