import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,       // hello.art.diaries@gmail.com
      pass: process.env.GMAIL_APP_PASS,   // Gmail App Password
    },
  });

  const mailOptions = {
    from: `"Art Diaries Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,           // send to yourself
    replyTo: email,                        // reply goes to the user
    subject: `[Art Diaries] ${subject || "New Message"} — from ${name}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #121212;">
        <h2 style="font-size: 28px; color: #C8605A; margin-bottom: 8px;">New Message</h2>
        <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; color: #888; margin-bottom: 32px;">Via Art Diaries Contact Form</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0e8e5; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #888; width: 100px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0e8e5; font-size: 15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0e8e5; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #888;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0e8e5; font-size: 15px;"><a href="mailto:${email}" style="color: #C8605A;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0e8e5; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #888;">Subject</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0e8e5; font-size: 15px;">${subject || "General Inquiry"}</td>
          </tr>
        </table>

        <div style="background: #FBF7F5; border-left: 3px solid #C8605A; padding: 24px; border-radius: 4px;">
          <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #888; margin: 0 0 12px;">Message</p>
          <p style="font-size: 15px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${message}</p>
        </div>

        <p style="font-size: 11px; color: #aaa; margin-top: 40px; text-align: center; letter-spacing: 0.1em; text-transform: uppercase;">
          Art Diaries · Bhubaneswar, Odisha
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
