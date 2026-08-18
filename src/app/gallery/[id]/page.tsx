import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-ink-800/60 hover:text-ink-900 mb-16 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className={`relative w-full ${artwork.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'} bg-earth-100 shadow-sm overflow-hidden group p-8 md:p-16`}>
            <Image 
              src={artwork.image}
              alt={artwork.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8 md:p-16 drop-shadow-xl"
              priority
            />
            
            {/* Expanded view button - mockup */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-ink-900/80 text-ivory text-xs uppercase tracking-[0.2em] px-4 py-2 backdrop-blur-sm">
                Expand
              </span>
            </div>
          </div>

          {/* Details Side */}
          <div className="flex flex-col">
            <p className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-4">
              {artwork.category}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 text-ink-900 leading-[1.1]">
              {artwork.title}
            </h1>
            
            <div className="flex flex-wrap gap-x-12 gap-y-4 mb-10 text-xs tracking-[0.2em] uppercase text-ink-800/70 border-y border-ink-900/10 py-6">
              <div>
                <span className="block text-ink-800/40 mb-2">Medium</span>
                {artwork.medium}
              </div>
              <div>
                <span className="block text-ink-800/40 mb-2">Year</span>
                {artwork.year}
              </div>
            </div>

            <div className="prose prose-p:font-light prose-p:leading-[1.8] prose-p:text-ink-800/80 max-w-none mb-16">
              <p>{artwork.description}</p>
            </div>

            <div className="mt-auto pt-8">
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-4 border-b border-ink-900 pb-2 text-xs uppercase tracking-[0.2em] text-ink-900 hover:text-accent-gold hover:border-accent-gold transition-colors"
              >
                Inquire About This Piece
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
