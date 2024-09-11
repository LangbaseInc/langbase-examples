import cn from 'mxcn'
import { IconSparkles } from './ui/icons'

// Prompt suggestions – Change these to match your use-case/company
const suggestions = [
  {
    title: `Say hello to begin conversation with TechBay Customer Support AI Agent `,
    prompt: `Hello`
  },
  {
    title: `Demo CS Electronics Section: Tracking number for LED TV not yet received.`,
    prompt: `I order 2 days ago a new Sony Bravia XR-65X90L, I did recieve confirmation that my order will be shipped shortly but I have not recieve any tracking number or any confirmation that the order has been disptachen. Please reply soon as I order because you guys ship fast and it should not take more then a week. `
  },
  {
    title: `Demo CS Travel Bag Section: Inquiring about exchange of laptop backpack`,
    prompt: `I have received the Wenger backpack for a 15-inch laptop two days ago, however, it is quite small for my use case. I would like to return it and order the Wenger 30L backpack for a 16-inch laptop. Can you confirm if it's currently in stock?`
  },
  {
    title: `Demo CS Sports Gear Section: Order missing dispatch tracking information`,
    prompt: `I bought the Nike ZoomX two days ago. Although I received the order confirmation and the receipt, I have not yet received the tracking number. Please send the tracking number as soon as possible.`
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