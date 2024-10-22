import { type UseChatHelpers } from 'ai/react'

import { PromptForm } from '@/components/prompt-form'
import { Button } from '@/components/ui/button'
import { IconRegenerate, IconStop } from '@/components/ui/icons'

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
  memorySets: any[]
  refreshMemorySets: () => Promise<void>
  selectedMemory: string
  onMemorySelect: (memoryUrl: string) => void
  userApiKey: string; 
  setUserApiKey: (apiKey: string) => void;
  ownerLogin: string; 
  setOwnerLogin: (login: string) => void;
   
}

export function ChatInput({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  memorySets,
  refreshMemorySets,
  selectedMemory,
  onMemorySelect,
  userApiKey, 
  setUserApiKey,
  ownerLogin, 
  setOwnerLogin 
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
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
                size={'sm'}
              >
                <IconRegenerate className="size-4 text-muted-foreground/50 group-hover:text-background" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 py-2 md:pb-4 md:pt-2">
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
            memorySets={memorySets}
            refreshMemorySets={refreshMemorySets}
            selectedMemory={selectedMemory}
            onMemorySelect={onMemorySelect}
            userApiKey={userApiKey} 
            setUserApiKey={setUserApiKey}
            ownerLogin={ownerLogin} 
            setOwnerLogin={setOwnerLogin} 
          />
        </div>
      </div>
    </div>
  )
}