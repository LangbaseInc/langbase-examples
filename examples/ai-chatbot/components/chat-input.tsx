import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import { IconRegenerate, IconStop } from '@/components/ui/icons'
import { Message } from '@baseai/core'
import { ChangeEvent } from 'react'

export interface ChatInputProps {
  id?: string
  isLoading: boolean
  stop: () => void
  input?: string
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleSubmit: any
  regenerate: () => void
  messages?: Message[]
}

export function ChatInput({
  id,
  isLoading,
  stop,
  input,
  handleInputChange,
  handleSubmit,
  regenerate,
  messages
}: ChatInputProps) {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="xbg-muted mx-auto max-w-3xl sm:max-w-4xl">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
              size={'sm'}
            >
              <IconStop className="text-muted-foreground/50 group-hover:text-background" />
              Stop generating
            </Button>
          ) : (
            messages &&
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => regenerate()}
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
            handleSubmit={handleSubmit}
            input={input || ''}
            handleInputChange={handleInputChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
