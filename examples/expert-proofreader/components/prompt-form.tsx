import { Button } from '@/components/ui/button'
import { IconChat, IconCommand, IconSpinner } from '@/components/ui/icons'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hovercard'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="bg-background relative flex max-h-60 w-full grow flex-col overflow-hidden px-2 pb-2 sm:rounded-2xl sm:border">
        <div className="flex w-full flex-col">
          <label
            htmlFor="playground"
            className="text-config text-foreground flex justify-between gap-y-4 rounded-xl px-3 py-4 font-medium leading-6 md:flex-row md:items-center md:gap-y-0"
          >
            <div className="flex items-center gap-x-2">
              <IconChat
                className="text-muted-foreground/50 h-5 w-5"
                aria-hidden="true"
              />
              <h3>Chat</h3>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" size="lg" className="text-inherit">@conversation tips</Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <ul className="list-disc pl-4">
                    <li>Say Hello to start a conversation, or simply enter the text you want to be proofread by the Expert Proofreader chatbot.</li>
                    <li>For more nuanced proofreading, you can choose state-of-the-art LLMs such as Claude 3.5, GPT-4 Turbo, or GPT-4o. With the Langbase agentic pipeline, this can be done easily with just a few clicks.</li>
                  </ul>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="flex items-center justify-center gap-2 md:justify-start">
              {/* Reset chat */}
              <Button
                variant="ghost"
                className="max-w-xs"
                onClick={e => {
                  e.preventDefault()
                  location.reload()
                }}
              >
                Reset
              </Button>
              {/* Send button */}
              <Button type="submit" disabled={isLoading || input === ''}>
                {isLoading ? (
                  <IconSpinner />
                ) : (
                  <IconCommand className="size-4" />
                )}
                Send
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </label>
        </div>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          maxRows={10}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your prompt message..."
          spellCheck={false}
          className="bg-muted min-h-[60px] w-full resize-none rounded-lg px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
      </div>
    </form>
  )
}
