import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

const VALID_TYPES = new Set(["commission", "attend", "collaborate", "other"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, type, message } = body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !type || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Validate type
    if (!VALID_TYPES.has(type)) {
      return NextResponse.json(
        { error: "Invalid inquiry type." },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        type,
        message: message.trim(),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase insert failed:", res.status, text);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
