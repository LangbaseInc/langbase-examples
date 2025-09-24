import { Newspaper, Circle, BadgeInfo, LinkIcon, Tag } from "lucide-react"
import { cn } from "../../lib/utils"

type SummaryItem = {
  id: string
  text: string
  source: string
  url: string
  tag?: string
}

export function SummaryBox({ items }: { items: SummaryItem[] }) {
  if (!items?.length) return null

  return (
    <section
      className={cn("rounded-xl border border-border bg-card p-4 md:p-6", "shadow-sm")}
      aria-labelledby="summary-heading"
    >
      <div className="mb-4 flex items-center gap-3">
        <Newspaper className="size-5 text-primary" aria-hidden />
        <h3 id="summary-heading" className="font-serif text-2xl font-semibold tracking-tight">
          Main TL;DR
        </h3>
      </div>

      <ul className="space-y-4" role="list">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <Circle className="mt-1 size-4 text-accent" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="text-pretty text-base leading-relaxed md:text-lg">{item.text}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <BadgeInfo className="size-3.5" aria-hidden />
                  Source:
                </span>
                <a
                  href={item.url}
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                  aria-label={`Open source from ${item.source}`}
                >
                  <LinkIcon className="size-3.5" aria-hidden />
                  {item.source}
                </a>
                {item.tag ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                    <Tag className="size-3" aria-hidden />
                    {item.tag}
                  </span>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
