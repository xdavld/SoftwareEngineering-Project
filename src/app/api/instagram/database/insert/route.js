import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Supabase-Client initialisieren
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req) {
  try {
    const body = await req.json();
    const { media_url, media_type, caption, user_id, upload_at, accessToken } = body;

    // Validierung der Eingaben
    if (!media_url || !media_type || !caption || !user_id || !upload_at || !accessToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Daten in der Supabase speichern
    const { data, error } = await supabase
      .from("posts") // Tabelle "posts" in Supabase
      .insert([
        {
          media_url,
          media_type,
          caption,
          user_id,
          upload_at,
          accessToken,
        },
      ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { error: "Failed to save post data", details: error.message },
        { status: 500 }
      );
    }

    // Erfolgreiche Antwort
    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Internal server error:", error.message);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}