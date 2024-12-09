'use client'

import { ChatList } from '@/components/chat-list'
import cn from 'mxcn'
import { useState } from 'react'
import { toast } from 'sonner'
import { ChatInput } from './chat-input'
import { Opening } from './opening'
import { usePipe } from '@baseai/core/react'
import { Message } from '@baseai/core'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string // Optional: Thread ID if you want to persist the chat in a DB
  initialMessages?: Message[] // Optional: Messages to pre-populate the chat from DB
}

export function Chatbot({ id, initialMessages, className }: ChatProps) {
  const [chatThreadId, setChatThreadId] = useState<string | undefined>(
    undefined
  )

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    regenerate,
    stop,
    setMessages,
    threadId,
    sendMessage
  } = usePipe({
    stream: true,
    apiRoute: '/api/chat',
    threadId: chatThreadId,
    onResponse: () => {
      setChatThreadId(threadId)
    },
    onFinish: messages => {},
    onError: error => {
      console.log('✨ ~ response:', error.message)
      toast.error(error.message)
    }
  })
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
      </div>
      <ChatInput
        id={id}
        isLoading={isLoading}
        stop={stop}
        regenerate={regenerate}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
