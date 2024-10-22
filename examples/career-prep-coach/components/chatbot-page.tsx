'use client'

import { ChatList } from '@/components/chat-list'
import { useChat, type Message } from 'ai/react'
import cn from 'mxcn'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { ChatInput } from './chat-input'
import { Opening } from './opening'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string // Optional: Thread ID if you want to persist the chat in a DB
  initialMessages?: Message[] // Optional: Messages to pre-populate the chat from DB
}

export function Chatbot({ id, initialMessages, className }: ChatProps) {
  const [threadId, setThreadId] = useState<null | string>(null)
  const [memorySets, setMemorySets] = useState<any[]>([])
  const [selectedMemory, setSelectedMemory] = useState('')
  const [userApiKey, setUserApiKey] = useState<string>('');
  const [ownerLogin, setOwnerLogin] = useState<string>('');

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      api: '/api/chat',
      initialMessages,
      body: { threadId },
      onResponse(response) {
        if (response.status !== 200) {
          console.log('✨ ~ response:', response)
          toast.error(response.statusText)
        }

        // Get Thread ID from response header
        const lbThreadId = response.headers.get('lb-thread-id')
        setThreadId(lbThreadId)
      }
    })
  
    const fetchMemorySets = useCallback(async () => {
      try {
        const response = await fetch('/api/chat?action=getMemorySets', {
          method: 'POST',
          body: JSON.stringify({ userApiKey, ownerLogin })
        })
        if (!response.ok) throw new Error('Failed to fetch memory sets')
        const data = await response.json()

        setMemorySets(data.memorySets || [])
        toast.success('Memory sets refreshed successfully')
      } catch (error) {
        console.error('Error fetching memory sets:', error)
        toast.error('Failed to fetch memory sets')
      }
    }, [userApiKey, ownerLogin])
    
    

    const handleMemorySelect = useCallback((memoryUrl: string) => {
      setSelectedMemory(memoryUrl)
    }, [])
  
    return (
      <div className="min-h-screen">
        <div className={cn('pb-36 pt-4 md:pt-10', className)}>
          {messages.length ? (
            <>
              <ChatList messages={messages} />
            </>
          ) : (
            <Opening />
          )}
          <ChatInput
            id={id}
            isLoading={isLoading}
            stop={stop}
            append={append}
            reload={reload}
            messages={messages}
            input={input}
            setInput={setInput}
            memorySets={memorySets}
            selectedMemory={selectedMemory}
            refreshMemorySets={fetchMemorySets}
            onMemorySelect={handleMemorySelect}
            userApiKey={userApiKey} 
            setUserApiKey={setUserApiKey}
            ownerLogin={ownerLogin} 
            setOwnerLogin={setOwnerLogin} 
          />
        </div>
      </div>
    )
  }