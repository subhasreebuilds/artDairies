import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink-900">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Image Side */}
          <div className="lg:col-span-5 relative w-full aspect-[3/4] bg-earth-100 shadow-sm">
            {/* Portrait Placeholder */}
            <div className="absolute inset-0 bg-ink-900/5 mix-blend-multiply" />
          </div>

          {/* Text Side */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full">
            <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-8 block font-light">
              About the Artist
            </span>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-12 leading-[1.1] text-ink-900">
              The Artist <br/>
              <span className="italic font-light text-ink-800 text-4xl md:text-5xl lg:text-6xl">Behind the Diaries</span>
            </h1>

            <div className="space-y-8 font-light leading-[1.8] text-ink-800/80 text-lg">
              <p>
                [PLACEHOLDER: Add your personal introduction here. For example: I am a contemporary artist based in [City], exploring the intersection of traditional Indian motifs and modern mindful practices.]
              </p>
              <p>
                My journey with art began [PLACEHOLDER: Add a brief origin story. E.g. as a child fascinated by the intricate patterns of Pattachitra and the vibrant colors of Odisha's cultural heritage.] 
              </p>
              <p>
                Through "Art Diaries", I document not just my creative process, but the spiritual and emotional landscapes I navigate. Whether working with pen and ink, painting vibrant mandalas, or crafting detailed pieces on natural shells, my work is a meditation on patience and precision.
              </p>
              <p>
                [PLACEHOLDER: Add a concluding thought about what you hope viewers take away from your art.]
              </p>
            </div>

            <div className="mt-16 pt-12 border-t border-ink-900/10">
              <h2 className="font-serif text-2xl mb-6 text-ink-900">Exhibitions & Features</h2>
              <ul className="space-y-4 font-light text-ink-800/80">
                <li className="flex gap-4"><span className="text-ink-800/40 w-12">2024</span> [PLACEHOLDER: Name of Exhibition / Feature]</li>
                <li className="flex gap-4"><span className="text-ink-800/40 w-12">2023</span> [PLACEHOLDER: Name of Exhibition / Feature]</li>
                <li className="flex gap-4"><span className="text-ink-800/40 w-12">2022</span> [PLACEHOLDER: Name of Exhibition / Feature]</li>
              </ul>
            </div>

            <div className="mt-16">
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
