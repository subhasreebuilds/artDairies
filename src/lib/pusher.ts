import PusherServer from "pusher";
import PusherClient from "pusher-js";

// Server-side Pusher
// We use fallback strings so that the Next.js build doesn't crash during static generation 
// if environment variables are not yet injected into the build environment.
export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID || "missing-app-id",
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "missing-key",
  secret: process.env.PUSHER_SECRET || "missing-secret",
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2", // Default to ap2 if missing during build
  useTLS: true,
});

// Client-side Pusher
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "missing-key", 
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
  }
);
