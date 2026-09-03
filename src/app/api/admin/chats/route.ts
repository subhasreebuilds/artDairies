import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all users except the admin, along with their latest message
    const users = await prisma.chatUser.findMany({
      where: {
        NOT: {
          email: "hello.art.diaries@gmail.com",
        },
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1, // Just get the latest message for the sidebar preview
        },
      },
      orderBy: {
        createdAt: "desc", // Sort users by newest first
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching admin chats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
