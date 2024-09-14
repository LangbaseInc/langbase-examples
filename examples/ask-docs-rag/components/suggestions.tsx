import cn from 'mxcn'
import { IconSparkles } from './ui/icons'

const xsuggestions = [
  {
    title: `What is Langbase?`,
    prompt: `What is Langbase?`
  },
  {
    title: `How to create a new pipe in Langbase?`,
    prompt: `How to create a new pipe in Langbase?`
  },
  {
    title: `Is JSON mode supported by Langbase?`,
    prompt: `Is JSON mode supported by Langbase?`
  },
  {
    title: `Can I create a RAG using Langbase?`,
    prompt: `Can I create a RAG using Langbase?`
  }
]

// Prompt suggestions – Change these to match your use-case/company
const suggestions = [
  {
    title: `Explain how to get started in easy steps`,
    prompt: `Explain how to get started in easy steps?`
  },
  {
    title: `How do I create an API key?`,
    prompt: `How do I create an API key?`
  },
  {
    title: `What are the available integrations?`,
    prompt: `What are the available integrations?`
  },
  {
    title: `How do I reset my password?`,
    prompt: `How do I reset my password?`
  }
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
