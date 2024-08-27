import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { videoId } = body;

    // Send a get request to `https://www.vidscript.co/transcribe/${videId}/en`
    const response = await fetch(
      `https://www.vidscript.co/transcribe/${videoId}/en`
    );
    const res = await response.json();
    const transcript = res.savedTranscripts[0].subtitlesText;
    return NextResponse.json({ transcript });
  } catch (error) {
    console.error("Error fetching transcript:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
