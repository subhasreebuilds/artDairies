"use client";

import { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  postUrl?: string;
  shortcode?: string;
  className?: string;
}

export default function InstagramEmbed({ postUrl, shortcode, className = "" }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract shortcode if postUrl is provided
  let code = shortcode;
  if (!code && postUrl) {
    const match = postUrl.match(/instagram\.com\/(?:p|reel|tv)\/([^/?#&]+)/);
    if (match) code = match[1];
  }

  const embedUrl = code ? `https://www.instagram.com/p/${code}/embed` : null;

  return (
    <div ref={containerRef} className={`w-full flex justify-center ${className}`}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full max-w-[540px] min-h-[600px] rounded-2xl border border-ink-900/10 shadow-lg bg-white"
          frameBorder="0"
          scrolling="no"
          allowTransparency={true}
        />
      ) : (
        <div className="p-8 text-center text-xs text-ink-800/40 border border-dashed rounded-2xl">
          Instagram post preview unavailable
        </div>
      )}
    </div>
  );
}
