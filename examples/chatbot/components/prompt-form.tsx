import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { IconPlayground, IconSparkles } from '@/components/ui/icons'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'

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
  const router = useRouter()

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
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background p-2 sm:rounded-2xl sm:border">
        <div className="flex w-full flex-col">
          <label
            htmlFor="playground"
            className="text-config flex justify-between gap-y-4 rounded-xl px-3 py-4 font-medium leading-6 text-foreground md:flex-row md:items-center md:gap-y-0 "
          >
            <div className="flex items-center gap-x-2">
              <IconPlayground
                className="h-5 w-5 text-muted-foreground/50"
                aria-hidden="true"
              />
              <h3>Chat</h3>
            </div>

            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Button
                variant="outline"
                className="max-w-xs"
                onClick={e => {
                  e.preventDefault()
                  router.refresh()
                  router.push('/')
                }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || input === ''}
              >
                <IconSparkles />
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
          className="min-h-[60px] w-full resize-none rounded-lg bg-muted px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 bg-muted sm:right-4">
          {/* <Button
            type="submit"
            size="icon"
            disabled={isLoading || input === ''}
          >
            <IconSparkles />
            <span className="sr-only">Send message</span>
          </Button> */}
        </div>
      </div>
    </form>
  )
}
