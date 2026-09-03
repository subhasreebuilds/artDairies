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
    const channelName = `chat-${email.replace(/[@.]/g, "-")}`;
    await pusherServer.trigger(channelName, "new-message", message);
    
    // Also trigger on the global admin channel so the admin dashboard updates instantly
    await pusherServer.trigger("chat-admin", "new-message", {
      ...message,
      userEmail: email, // Include user email so admin knows who it's from
      userName: name,
    });

    // 4. Send Email Notification
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASS) {
      try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASS,
          },
        });

        let mailOptions;
        
        if (isFromAdmin) {
          // Send to User
          mailOptions = {
            from: `"Art Diaries" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Art Diaries just replied to your message!",
            html: `
              <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <h2 style="color: #000; text-align: center;">You have a new message!</h2>
                <p style="color: #666; font-size: 16px;">Hello ${name},</p>
                <p style="color: #666; font-size: 16px;">Subhashree from Art Diaries just replied to your chat:</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; font-style: italic; color: #333; margin: 20px 0;">
                  "${text}"
                </div>
                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://artdiaries.com" style="background-color: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                    View on Website
                  </a>
                </div>
                <p style="color: #aaa; font-size: 12px; text-align: center; margin-top: 30px;">
                  Reply directly on the website to continue the conversation.
                </p>
              </div>
            `,
          };
        } else {
          // Send to Admin
          mailOptions = {
            from: `"Art Diaries" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // Send to yourself
            subject: `New Chat Message from ${name}`,
            html: `
              <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                <h2 style="color: #000; text-align: center;">New Chat Message!</h2>
                <p style="color: #666; font-size: 16px;"><strong>${name}</strong> (${email}) just sent you a message:</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; font-style: italic; color: #333; margin: 20px 0;">
                  "${text}"
                </div>
                <div style="text-align: center; margin-top: 30px;">
                  <a href="https://artdiaries.com/admin/chats" style="background-color: #000; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
                    Reply in Admin Dashboard
                  </a>
                </div>
              </div>
            `,
          };
        }

        // Send email asynchronously without blocking the response
        transporter.sendMail(mailOptions).catch(console.error);
      } catch (e) {
        console.error("Failed to setup email notification:", e);
      }
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
