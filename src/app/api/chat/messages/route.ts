import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.chatUser.findUnique({
      where: { email },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({ messages: user.messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, email, name, isFromAdmin } = body;

    if (!text || !email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Find or Create User
    const user = await prisma.chatUser.upsert({
      where: { email },
      update: { name }, // Update name if it changed
      create: { email, name },
    });

    // 2. Save Message to Database
    const message = await prisma.message.create({
      data: {
        text,
        isFromAdmin: isFromAdmin || false,
        userId: user.id,
      },
    });

    // 3. Trigger Real-time Event via Pusher
    // We broadcast to a channel named after the user's email so only they (and you) hear it
    const channelName = `chat-${email.replace(/[@.]/g, "-")}`;
    await pusherServer.trigger(channelName, "new-message", message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
