import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dns from "dns";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const TURNSTILE_SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || "1x000000000000000000000000000000AA";

function isValidName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  // Reject repeating characters (e.g. "aaaa", "zzzz")
  if (/^(.)\1+$/i.test(trimmed)) return false;
  // Reject keyboard mashing without vowels (e.g. "wdwd", "zxcv")
  if (/^[bcdfghjklmnpqrstvwxyz]{4,}$/i.test(trimmed)) return false;
  return true;
}

function isValidEmailUsername(email: string): boolean {
  const user = email.split("@")[0]?.trim();
  if (!user || user.length < 2) return false;
  // Reject repeating characters (e.g. "aaaaa")
  if (/^(.)\1+$/i.test(user)) return false;
  // Reject keyboard mashing without vowels (e.g. "wdxqd", "qwrtp")
  if (/^[bcdfghjklmnpqrstvwxyz]{5,}$/i.test(user)) return false;
  return true;
}

// Validate domain MX records to ensure the email can actually receive messages
async function isValidEmailDomain(email: string): Promise<boolean> {
  try {
    const domain = email.split("@")[1]?.trim();
    if (!domain || domain.length < 4) return false;

    // Block common disposable / spam email domains
    const disposableDomains = [
      "tempmail.com", "mailinator.com", "10minutemail.com", 
      "dispostable.com", "yopmail.com", "trashmail.com", "guerrillamail.com", "ijkj.com"
    ];
    if (disposableDomains.includes(domain.toLowerCase())) {
      return false;
    }

    const mxRecords = await dns.promises.resolveMx(domain);
    if (!mxRecords || mxRecords.length === 0) return false;

    // Check if MX exchange points to loopback / localhost / invalid IP addresses
    const invalidExchanges = ["0.0.0.0", "127.0.0.1", "localhost"];
    const hasValidMx = mxRecords.some(rec => !invalidExchanges.includes(rec.exchange.toLowerCase()));
    return hasValidMx;
  } catch {
    // DNS resolution failed or domain has no MX records
    return false;
  }
}

export async function POST(req: NextRequest) {
  const { name, email, subject, message, token } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // 1. Strict Name Validation (Reject keyboard mash like "wdwd")
  if (!isValidName(name)) {
    return NextResponse.json(
      { error: "Please enter a valid full name." },
      { status: 400 }
    );
  }

  // 2. Strict Email Format & Username Validation
  const trimmedEmail = email.trim();
  if (!EMAIL_REGEX.test(trimmedEmail) || !isValidEmailUsername(trimmedEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // 2. DNS MX Record Validation (Domain check)
  const isDomainValid = await isValidEmailDomain(trimmedEmail);
  if (!isDomainValid) {
    const domain = trimmedEmail.split("@")[1] || "provided";
    return NextResponse.json(
      { error: `The email domain '${domain}' appears to be invalid or non-existent. Please enter a real email address.` },
      { status: 400 }
    );
  }

  // 3. Cloudflare Turnstile Bot Protection Verification
  if (!token) {
    return NextResponse.json(
      { error: "Cloudflare bot protection challenge missing. Please complete verification." },
      { status: 400 }
    );
  }

  try {
    const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      }),
    });

    const turnstileResult = await turnstileRes.json();

    if (!turnstileResult.success && TURNSTILE_SECRET_KEY !== "1x000000000000000000000000000000AA") {
      return NextResponse.json(
        { error: "Cloudflare bot protection check failed. Automated requests are blocked." },
        { status: 403 }
      );
    }
  } catch (err) {
    console.error("Turnstile verification error:", err);
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
