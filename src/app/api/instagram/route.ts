import { NextResponse } from "next/server";
import { convertInstagramItemToArtwork, generateFallbackInstagramArtworks } from "@/lib/instagram";
import { InstagramMediaItem } from "@/types/instagram";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedUsername = searchParams.get("username") || process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "art_.diaries._";
  const accessToken = searchParams.get("token") || process.env.INSTAGRAM_ACCESS_TOKEN;

  const username = requestedUsername.trim().replace(/^@/, "");

  // 1. If Meta Access Token is provided, fetch via Meta Instagram Graph API
  if (accessToken) {
    try {
      const graphUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,like_count,comments_count&access_token=${accessToken}`;
      const res = await fetch(graphUrl, { next: { revalidate: 300 } });

      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data)) {
          const artworks = json.data.map((item: InstagramMediaItem, index: number) =>
            convertInstagramItemToArtwork(item, index)
          );
          return NextResponse.json({
            success: true,
            isLive: true,
            source: "Instagram Graph API",
            username,
            artworks,
            profileInfo: {
              username,
              media_count: json.data.length
            }
          });
        }
      }
    } catch (err) {
      console.error("Meta Graph API fetch error:", err);
    }
  }

  // 2. Try fetching public web profile info / API for username if available
  try {
    const publicUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`;
    const publicRes = await fetch(publicUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "X-IG-App-ID": "936619743392459",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 1800 } // Cache for 30 mins to avoid rate limiting
    });

    if (publicRes.ok) {
      const publicData = await publicRes.json();
      const user = publicData?.data?.user;
      const edges = user?.edge_owner_to_timeline_media?.edges;

      if (edges && Array.isArray(edges) && edges.length > 0) {
        const artworks = edges.map((edge: any, index: number) => {
          const node = edge.node;
          const caption = node.edge_media_to_caption?.edges[0]?.node?.text || "";
          
          // Get real count from Instagram edge
          const realLikeCount = typeof node.edge_liked_by?.count === "number" 
            ? node.edge_liked_by.count 
            : typeof node.edge_media_preview_like?.count === "number"
            ? node.edge_media_preview_like.count
            : undefined;

          const realCommentCount = typeof node.edge_media_to_comment?.count === "number"
            ? node.edge_media_to_comment.count
            : undefined;

          const item: InstagramMediaItem = {
            id: node.id || `node-${index}`,
            caption,
            media_type: node.is_video ? "VIDEO" : "IMAGE",
            media_url: node.display_url || node.thumbnail_src || "",
            permalink: node.shortcode ? `https://www.instagram.com/p/${node.shortcode}/` : `https://www.instagram.com/${username}/`,
            thumbnail_url: node.thumbnail_src || node.display_url,
            timestamp: node.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000).toISOString() : undefined,
            username: user.username,
            like_count: realLikeCount,
            comments_count: realCommentCount
          };
          return convertInstagramItemToArtwork(item, index);
        });

        return NextResponse.json({
          success: true,
          isLive: true,
          source: "Instagram Public Web API",
          username: user.username,
          artworks,
          profileInfo: {
            username: user.username,
            name: user.full_name,
            profile_picture_url: user.profile_pic_url,
            followers_count: user.edge_followed_by?.count,
            biography: user.biography
          }
        });
      }
    }
  } catch (err) {
    // Web profile info endpoint may be blocked or rate limited by Instagram CDN, fallback gracefully
  }

  // 3. Clean fallback without fake counts
  const fallbackArtworks = generateFallbackInstagramArtworks(username);

  return NextResponse.json({
    success: true,
    isLive: false,
    source: "Instagram Sync Feed (Configured Handle)",
    username,
    artworks: fallbackArtworks,
    profileInfo: {
      username,
      name: `@${username}`,
      biography: "Handmade Original Artwork & Mandalas"
    }
  });
}
