import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink-900">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Image Side */}
          <div className="lg:col-span-5 relative w-full aspect-[3/4] bg-earth-100 shadow-sm overflow-hidden p-4 md:p-8">
            <div className="relative w-full h-full bg-white shadow-sm overflow-hidden">
              {/* Author Portrait */}
              <Image 
                src="/artworks/author.png" 
                alt="The Artist" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-ink-900/5 mix-blend-multiply pointer-events-none" />
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-8 block font-light">
              Bhubaneswar, Odisha
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-12 leading-[1.1] text-ink-900">
              The Artist <br/>
              <span className="italic font-light text-ink-800 text-4xl md:text-5xl lg:text-6xl">Behind the Diaries</span>
            </h1>

            <div className="space-y-8 font-light leading-[1.8] text-ink-800/80 text-lg">
              <p>
                I explore traditional Indian motifs through intricate, contemporary handmade art. Specializing in pen and ink and dot mandalas, my work is a continuous exploration of culture, patience, and symmetry.
              </p>
              <p>
                My journey began as a child, deeply fascinated by the rich, storytelling elements of Pattachitra. As a self-taught artist, I found myself drawn to the deeply meditative process of dot work—a practice that offers me profound peace in an otherwise fast-paced world.
              </p>
              <p>
                For me, art is home. Every piece I create is an invitation into that quiet, peaceful space. I hope that when viewers look closely at my work, they feel a sense of gladness and joy, and that it quietly deepens their own love and appreciation for the arts.
              </p>
            </div>

            <div className="mt-16 border-t border-ink-900/10 pt-12 flex gap-8">
              <Link 
                href="/process"
                className="group inline-flex items-center gap-4 border-b border-ink-900 pb-2 text-xs uppercase tracking-[0.2em] text-ink-900 hover:text-accent-gold hover:border-accent-gold transition-colors"
              >
                My Process
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-4 border-b border-ink-900 pb-2 text-xs uppercase tracking-[0.2em] text-ink-900 hover:text-accent-gold hover:border-accent-gold transition-colors"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
