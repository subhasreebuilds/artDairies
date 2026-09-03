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
        _count: {
          select: {
            messages: {
              where: {
                isRead: false,
                isFromAdmin: false,
              },
            },
          },
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

export async function PATCH(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.chatUser.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.message.updateMany({
      where: {
        userId: user.id,
        isFromAdmin: false,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
