import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon } from "@/components/icons/Instagram";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ivory py-16 px-6 md:px-12 mt-auto">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-6">Art <span className="italic font-light text-white/80">Diaries</span></h3>
          <p className="text-white/60 max-w-sm font-light leading-[1.8]">
            Traditional Indian artistic inspiration expressed through intricate contemporary handmade art.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase mb-8 text-white/40">Explore</h4>
          <ul className="space-y-4 font-light text-sm text-white/80">
            <li>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/process" className="hover:text-white transition-colors">
                My Process
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About the Artist
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact & Commissions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] tracking-[0.2em] uppercase mb-8 text-white/40">Connect</h4>
          <div className="flex flex-col space-y-4 font-light text-sm text-white/80">
            <a
              href="https://instagram.com/art_.diaries._"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:text-white transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-white/40" />
              <span>@art_.diaries._</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-4 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-white/40" />
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-[0.1em] text-white/40 font-light uppercase">
        <p>&copy; {new Date().getFullYear()} Art Diaries. All rights reserved.</p>
        <p>Bhubaneswar, Odisha</p>
      </div>
    </footer>
  );
}
