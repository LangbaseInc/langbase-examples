import cn from 'mxcn'
import { IconSparkles } from './ui/icons'

// Prompt suggestions – Change these to match your use-case/company
const suggestions = [
  {
    title: `Say hello to begin conversation`,
    prompt: `Hello`
  },
  {
    title: `Demo text`,
    prompt: `The computational demands of Large Language Models (LLMs) have escalated dramatically, commensurate with their increasing size and complexity.
Training state-of-the-art LLMs necessitates vast arrays of high-performance GPUs, often numbering in the thousands, and can consume several megawatt-hours of electricity over periods extending to weeks or even months.
This resource-intensive process raises pertinent questions about the models' environmental impact and the economic feasibility of their development for all but the most well-funded research institutions or technology companies.
Moreover, the inference phase, while less demanding than training, still requires substantial computational resources, particularly for real-time applications, thereby limiting the deployment of these models in resource-constrained environments or edge devices.
Consequently, there is a growing impetus in the field to develop more efficient architectures and training paradigms that can mitigate these computational burdens without compromising the remarkable capabilities that have made LLMs so transformative in natural language processing.`


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