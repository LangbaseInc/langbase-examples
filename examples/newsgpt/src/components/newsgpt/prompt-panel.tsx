import { useState} from "react";
import type { FormEvent } from "react";
import * as React from "react"
import { Sparkles, Newspaper, Quote, Microscope } from "lucide-react"
import { toast } from "sonner";
import { cn } from "../../lib/utils"

const PRESETS = [
  "Summarize today’s AI news with citations",
  "TL;DR the top 5 market stories for busy execs",
  "Brief me on climate policy updates this week",
  "Explain 3 biggest sports headlines like I’m 12",
]

type NewsItem = {
  summary: string;
  url: string;
  source: string;
};

export type ApiResponse = {
  output: {
    newsItems: NewsItem[];
  };
};

type PromptPanelProps = {
  setResponse: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PromptPanel({ setResponse, setLoading }: PromptPanelProps) {
  const [prompt, setPrompt] = useState("")
  const handlePreset = (p: string) => setPrompt(p)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/langbase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: prompt.trim() })
      });

      const data: ApiResponse = await res.json();
      setResponse(data.output.newsItems);

      toast.success("Query processed successfully");
    } catch (err) {
      const error = err as Error;
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4 md:p-6">
        <div className="mb-4 flex items-center gap-3">
          <Sparkles className="size-5 text-primary" aria-hidden />
          <h3 className="text-xl font-extralight tracking-tight">Generate a TL;DR newsletter</h3>
        </div>

        <label htmlFor="newsgpt-prompt" className="sr-only">
          Prompt
        </label>
        <div className="rounded-xl border border-prompt bg-background p-2 focus-within:ring-2 focus-within:ring-ring">
          <textarea
            id="newsgpt-prompt"
            rows={5}
            placeholder="e.g., 'Summarize today’s AI breakthroughs with citations and a neutral tone'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className={cn(
              "w-full resize-none bg-transparent p-3",
              "text-base leading-relaxed outline-none placeholder:text-muted-foreground",
            )}
          />
          <div className="flex flex-col gap-3 border-t border-border p-2 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePreset(p)}
                  className={cn(
                    "rounded-full border border-border px-3 py-1 text-xs",
                    "hover:border-primary hover:text-primary",
                    "transition-colors",
                  )}
                  aria-label={`Use preset: ${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2",
                  "text-primary-foreground transition-colors hover:opacity-90",
                )}
              >
                <Newspaper className="size-4" aria-hidden />
                Generate
              </button>

              {/* <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm"
              aria-label="Try an example"
            >
              <Stars className="size-4 text-accent" aria-hidden />
              Try example
            </button> */}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Quote className="size-4" aria-hidden />
          <p>{"We always include citations and links to original sources."}</p>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Microscope className="size-4" aria-hidden />
          <p>{"Outputs are brief, neutral, and easy to scan."}</p>
        </div>
      </div>

    </form>
  )
}
