import { useState } from 'react'
import './App.css'
import { PromptPanel } from "./components/newsgpt/prompt-panel"
import { SummaryBox } from "./components/newsgpt/summary-box"
import { SummaryBoxSkeleton } from "./components/newsgpt/summary-box-skeleton"

const newsgptUrl = import.meta.env.VITE_NEWSGPT_URL;

type NewsItem = {
  summary: string;
  url: string;
  source: string;
};

export default function App() {
  const [response, setResponse] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-dvh">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <a
                href={newsgptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <div aria-hidden className="size-6 rounded-md bg-primary" />
                <h1 className="text-balance font-serif text-3xl md:text-4xl font-bold tracking-tight">
                  NewsGPT
                </h1>
              </a>
            </div>
            <p className="text-sm text-muted-foreground text-center">AI-powered news, distilled into smart summaries.</p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <PromptPanel setLoading={setLoading} setResponse={setResponse} />
      </section>

      <section aria-label="Main TL;DR summary" className="mx-auto max-w-4xl px-4 py-8">
        {loading ? (
          <SummaryBoxSkeleton />
        ) : response.length > 0 ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
                Today’s TL;DR news
              </h2>
              <span className="text-xs text-muted-foreground">Bullet-point summary</span>
            </div>
            <SummaryBox
              items={response.map((item, idx) => ({
                id: `news-${idx}`,
                text: item.summary,
                source: item.source,
                url: item.url,
              }))}
            />
          </>
        ) : null}
      </section>


      <footer className="mx-auto max-w-6xl px-4 py-12 text-center text-lg text-muted-foreground">
        Powered by <a className="text-primary" href="https://langbase.com/?utm_source=newsgpt.langbase.dev&utm_campaign=DevRel"><strong>⌘Langbase</strong></a>
      </footer>
    </main>
  )
}
