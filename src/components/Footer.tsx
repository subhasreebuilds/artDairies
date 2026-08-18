import Link from "next/link";
import { Camera, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ivory py-16 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-2xl tracking-wider mb-6">ART DIARIES</h3>
          <p className="text-ivory-dark/70 max-w-sm font-light leading-relaxed">
            Traditional Indian artistic inspiration expressed through intricate contemporary handmade art.
          </p>
        </div>
        
        <div>
          <h4 className="font-serif text-lg tracking-wider mb-6 text-accent-gold">EXPLORE</h4>
          <ul className="space-y-4 font-light tracking-wide">
            <li>
              <Link href="/gallery" className="hover:text-accent-gold transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/process" className="hover:text-accent-gold transition-colors">
                My Process
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent-gold transition-colors">
                About the Artist
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent-gold transition-colors">
                Contact & Commissions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg tracking-wider mb-6 text-accent-gold">CONNECT</h4>
          <div className="flex flex-col space-y-4 font-light">
            <a
              href="https://instagram.com/art_.diaries._"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-accent-gold transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span>@art_.diaries._</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-3 hover:text-accent-gold transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-ivory-dark/50 font-light tracking-wide">
        <p>&copy; {new Date().getFullYear()} Art Diaries. All rights reserved.</p>
      </div>
    </footer>
  );
}
