'use client';

import Title from "@/components/homepage/Title";
import VideoInput from "@/components/homepage/VideoInput";
import { useState } from "react";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-16 py-8 gap-12">

      <Title />
      <VideoInput transcript={transcript} setTranscript={setTranscript} loading={loading} setLoading={setLoading} />

    </main>
  );
}
