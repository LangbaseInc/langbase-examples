import { type UseChatHelpers } from 'ai/react'

import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import { IconRefresh, IconStop } from '@/components/ui/icons'

export interface ChatInputProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function ChatInput({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages
}: ChatInputProps) {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="bg-muted mx-auto max-w-3xl sm:max-w-4xl">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 py-2 md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append({
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
