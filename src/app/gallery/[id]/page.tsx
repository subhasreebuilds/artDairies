import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { artworks } from "@/data/artworks";

export default async function ArtworkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const currentIndex = artworks.findIndex((a) => a.id === id);
  
  if (currentIndex === -1) {
    notFound();
  }

  const artwork = artworks[currentIndex];
  const prevArtwork = currentIndex > 0 ? artworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < artworks.length - 1 ? artworks[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-ivory text-ink-900">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        
        {/* Back Navigation */}
        <Link 
          href="/gallery" 
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-ink-800/60 hover:text-ink-900 mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className="relative w-full aspect-[4/5] bg-earth-200 shadow-xl overflow-hidden group">
             {/* Using placeholder div instead of image for now */}
            <div className="absolute inset-0 bg-earth-100 mix-blend-multiply" />
            
            {/* Expanded view button - mockup */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-ink-900/80 text-ivory text-xs uppercase tracking-widest px-4 py-2">
                Expand
              </span>
            </div>
          </div>

          {/* Details Side */}
          <div className="flex flex-col">
            <p className="text-accent-gold text-sm tracking-widest uppercase mb-4">
              {artwork.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              {artwork.title}
            </h1>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 text-sm tracking-wider uppercase text-ink-800/80 font-light border-y border-ink-900/10 py-6">
              <div>
                <span className="block text-xs text-ink-800/50 mb-1">Medium</span>
                {artwork.medium}
              </div>
              <div>
                <span className="block text-xs text-ink-800/50 mb-1">Year</span>
                {artwork.year}
              </div>
            </div>

            <div className="prose prose-p:font-light prose-p:leading-relaxed prose-p:text-ink-800 max-w-none mb-12">
              <p>{artwork.description}</p>
            </div>

            <div className="mt-auto pt-12">
              <Link 
                href="/contact"
                className="inline-block bg-ink-900 hover:bg-ink-800 text-ivory px-8 py-4 uppercase tracking-widest text-sm transition-colors"
              >
                Inquire About This Piece
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Between Artworks */}
        <div className="mt-24 pt-12 border-t border-ink-900/10 flex justify-between items-center">
          {prevArtwork ? (
            <Link 
              href={`/gallery/${prevArtwork.id}`}
              className="group flex flex-col items-start"
            >
              <span className="flex items-center gap-2 text-xs tracking-widest uppercase text-ink-800/60 mb-2 group-hover:text-ink-900 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Previous
              </span>
              <span className="font-serif text-lg md:text-xl text-ink-900">{prevArtwork.title}</span>
            </Link>
          ) : <div />}

          {nextArtwork ? (
            <Link 
              href={`/gallery/${nextArtwork.id}`}
              className="group flex flex-col items-end text-right"
            >
              <span className="flex items-center gap-2 text-xs tracking-widest uppercase text-ink-800/60 mb-2 group-hover:text-ink-900 transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </span>
              <span className="font-serif text-lg md:text-xl text-ink-900">{nextArtwork.title}</span>
            </Link>
          ) : <div />}
        </div>

      </div>
    </div>
  );
}
