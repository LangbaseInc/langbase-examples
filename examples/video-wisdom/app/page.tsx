'use client';

import Title from "@/components/homepage/Title";
import VideoHandler from "@/components/homepage/VideoHandler";
import { useState } from "react";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-16 py-8 gap-12">
      <Title />
      <VideoHandler />
    </main>
  );
}
