import { Button } from '@/components/ui/button'
import { IconChat, IconCommand, IconSpinner } from '@/components/ui/icons'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { MemorySidebar } from './memory-sidebar'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
  memorySets: any[] 
  selectedMemory: string 
  refreshMemorySets: () => Promise<void> 
  onMemorySelect: (memoryUrl: string) => void 
  userApiKey: string; 
  setUserApiKey: (apiKey: string) => void;
  ownerLogin: string 
  setOwnerLogin: (login: string) => void 
}



export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
  memorySets,
  selectedMemory,
  refreshMemorySets,
  onMemorySelect,
  userApiKey, 
  setUserApiKey,
  ownerLogin,
  setOwnerLogin 

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
            </div>

            <div className="flex items-center justify-center gap-2 md:justify-start">
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline-muted">
                    <IconCommand className="size-4" />
                    Memory
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 overflow-y-auto bg-background border shadow-md">
                  <div className="grid gap-4">
                    <div className="space-y-2"/>
                    <div className="grid gap-2">
                    <MemorySidebar 
                      memorySets={memorySets} 
                      selectedMemory={selectedMemory}
                      refreshMemorySets={refreshMemorySets}
                      onMemorySelect={onMemorySelect}
                      userApiKey={userApiKey} 
                      setUserApiKey={setUserApiKey}
                      ownerLogin={ownerLogin} // Add this line
                      setOwnerLogin={setOwnerLogin} // Add this line 
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
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