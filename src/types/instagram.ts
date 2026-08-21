import { ArtworkCategory, Artwork } from "@/data/artworks";

export interface InstagramMediaItem {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
  like_count?: number;
  comments_count?: number;
}

export interface InstagramProfile {
  username: string;
  name?: string;
  profile_picture_url?: string;
  media_count?: number;
  followers_count?: number;
  biography?: string;
}

export interface InstagramResponse {
  data: InstagramMediaItem[];
  paging?: {
    cursors?: {
      before: string;
      after: string;
    };
    next?: string;
  };
  error?: {
    message: string;
    type: string;
    code: number;
  };
}

export interface InstagramArtwork extends Artwork {
  isInstagram: boolean;
  permalink?: string;
  likeCount?: number;
  commentsCount?: number;
  timestamp?: string;
  instagramUsername?: string;
  originalCaption?: string;
}
