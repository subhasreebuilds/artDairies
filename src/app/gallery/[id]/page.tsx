import { notFound } from "next/navigation";
import { artworks } from "@/data/artworks";
import ArtworkDetailClient from "./ArtworkDetailClient";

export default async function ArtworkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentIndex = artworks.findIndex((a) => a.id === id);
  
  if (currentIndex === -1) {
    notFound();
  }

  const artwork = artworks[currentIndex];
  const prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  // Find 3 related artworks (same category, not the current one)
  const relatedArtworks = artworks
    .filter((a) => a.category === artwork.category && a.id !== artwork.id)
    .slice(0, 3);
  
  // If not enough related in same category, pad with others
  if (relatedArtworks.length < 3) {
    const others = artworks.filter(
      (a) => a.id !== artwork.id && !relatedArtworks.find(r => r.id === a.id)
    );
    relatedArtworks.push(...others.slice(0, 3 - relatedArtworks.length));
  }

  return (
    <ArtworkDetailClient 
      artwork={artwork} 
      prevArtwork={prevArtwork} 
      nextArtwork={nextArtwork} 
      relatedArtworks={relatedArtworks}
    />
  );
}
