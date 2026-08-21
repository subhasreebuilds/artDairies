"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { InstagramArtwork, InstagramProfile } from "@/types/instagram";
import { fetchInstagramArtworks, generateFallbackInstagramArtworks } from "@/lib/instagram";
import { artworks as staticArtworks, Artwork } from "@/data/artworks";

interface InstagramContextType {
  instaId: string;
  artworks: InstagramArtwork[];
  combinedArtworks: (Artwork | InstagramArtwork)[];
  loading: boolean;
  isLive: boolean;
  profileInfo: InstagramProfile | null;
  refreshArtworks: () => Promise<void>;
}

const InstagramContext = createContext<InstagramContextType | undefined>(undefined);

export function InstagramProvider({ children }: { children: ReactNode }) {
  const instaId = "art_.diaries._";
  const [artworks, setArtworks] = useState<InstagramArtwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<InstagramProfile | null>(null);

  const loadArtworks = async () => {
    setLoading(true);
    try {
      const result = await fetchInstagramArtworks(instaId);
      setArtworks(result.artworks);
      setIsLive(result.isLive);
      if (result.profileInfo) {
        setProfileInfo(result.profileInfo);
      }
    } catch (err) {
      console.error("Error loading Instagram artworks:", err);
      setArtworks(generateFallbackInstagramArtworks(instaId));
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const combinedArtworks: (Artwork | InstagramArtwork)[] = artworks.length > 0
    ? artworks
    : staticArtworks;

  return (
    <InstagramContext.Provider
      value={{
        instaId,
        artworks,
        combinedArtworks,
        loading,
        isLive,
        profileInfo,
        refreshArtworks: loadArtworks,
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
}

export function useInstagram() {
  const context = useContext(InstagramContext);
  if (!context) {
    throw new Error("useInstagram must be used within an InstagramProvider");
  }
  return context;
}
