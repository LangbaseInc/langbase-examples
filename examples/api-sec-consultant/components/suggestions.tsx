import cn from 'mxcn'
import { IconSparkles } from './ui/icons'

// Prompt suggestions – Change these to match your use-case/company
const suggestions = [
  {
    title: `Say hello to begin and follow guided conversation (MCQs)`,
    prompt: `Hello`
  },
]

export const Suggestions = ({
  sendSuggestedPrompt
}: {
  sendSuggestedPrompt: (prompt: string) => void
}) => {
  const handleClick = (prompt: string) => {
    sendSuggestedPrompt(prompt)
  }

  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <label className="font-semibold">Suggestions</label>
      <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
        {suggestions.map((suggestion, index) => {
          return (
            <div
              key={index}
              className={cn(
                'border-muted-foreground/20 flex cursor-pointer items-center gap-4 rounded-md border p-4',
                'hover:bg-background transition-all'
              )}
              onClick={() => handleClick(suggestion.prompt)}
            >
              <IconSparkles
                className="text-muted-foreground size-4"
                aria-hidden="true"
              />
              <p className="text-foreground/70 line-clamp-2 font-light leading-6">
                {suggestion.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}