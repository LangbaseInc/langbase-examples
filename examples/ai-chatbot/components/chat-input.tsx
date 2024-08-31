import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import { IconRegenerate, IconStop } from '@/components/ui/icons'
import { Message } from 'langbase'

export function ChatInput({
  isLoading,
  // stop,
  // reload,
  input,
  setInput,
  messages,
  sendMessage
}: {
  isLoading: boolean
  input: string
  setInput: (value: string) => void
  messages: any
  sendMessage: (message: Message) => void
}) {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="xbg-muted mx-auto max-w-3xl sm:max-w-4xl">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              // onClick={() => stop()}
              className="bg-background"
              size={'sm'}
            >
              <IconStop className="text-muted-foreground/50 group-hover:text-background" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                // onClick={() => reload()}
                className="bg-background"
                size={'sm'}
              >
                <IconRegenerate className="text-muted-foreground/50 group-hover:text-background size-4" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 py-2 md:pb-4 md:pt-2">
          <PromptForm
            onSubmit={sendMessage}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
