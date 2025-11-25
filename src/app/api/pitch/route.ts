import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, pitch } = await request.json();

    // Validate required fields
    if (!name || !email || !pitch) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured - email not sent");
      // Return success in development to test form flow
      return NextResponse.json(
        { message: "Pitch submitted (email sending not configured)" },
        { status: 200 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: "SON Networks <onboarding@resend.dev>", // Update with your verified domain
      to: [process.env.PITCH_EMAIL || "pitches@sonnetworks.com"], // Your email for pitches
      replyTo: email,
      subject: `New Show Pitch from ${name}`,
      html: `
        <h2>New Show Pitch Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pitch:</strong></p>
        <p>${pitch.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Pitch sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Pitch form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
