import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SUPPORT_TO = "latioms@gmail.com";
const SUPPORT_CC = "ronaldkamgaing4@gmail.com";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      subject?: string;
      message?: string;
    };

    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Email, subject, and message are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: getRequiredEnv("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : Number(process.env.SMTP_PORT || "465") === 465,
      auth: {
        user: getRequiredEnv("SMTP_USER"),
        pass: getRequiredEnv("SMTP_PASS"),
      },
    });

    const fromAddress = process.env.SMTP_FROM || getRequiredEnv("SMTP_USER");
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
    const safeEmail = escapeHtml(email);

    await transporter.sendMail({
      from: fromAddress,
      to: SUPPORT_TO,
      cc: SUPPORT_CC,
      replyTo: email,
      subject: `[ReachDem Support] ${subject}`,
      text: `New support request\n\nFrom: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin-bottom: 16px;">New support request</h2>
          <p><strong>From:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p style="margin-top: 24px;"><strong>Message</strong></p>
          <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; background: #f9fafb;">
            ${safeMessage}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send support email.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
