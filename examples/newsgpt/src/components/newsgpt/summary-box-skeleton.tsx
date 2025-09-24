import { Newspaper } from "lucide-react"
import { cn } from "../../lib/utils"

export function SummaryBoxSkeleton() {
  return (
    <section
      className={cn("rounded-xl border border-border bg-card p-4 md:p-6", "shadow-sm animate-pulse")}
    >
      <div className="mb-4 flex items-center gap-3">
        <Newspaper className="size-5 text-muted-foreground" aria-hidden />
        <div className="h-6 w-32 rounded bg-muted" />
      </div>

      <ul className="space-y-4" role="list">
        {[...Array(3)].map((_, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-1 size-4 rounded-full bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
