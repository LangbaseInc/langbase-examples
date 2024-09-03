'use client'

import { ChatList } from '@/components/chat-list'
import cn from 'mxcn'
import { useState } from 'react'
import { toast } from 'sonner'
import { ChatInput } from './chat-input'
import { Opening } from './opening'
import { fromReadableStream, Message } from 'langbase'

export function Chatbot({ className }: { className?: string }) {
  const [threadId, setThreadId] = useState<null | string>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('')

  const sendMessage = async (message: Message) => {
    const newMessages = [...messages, message]
    setMessages(newMessages)

    try {
      setIsLoading(true)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: newMessages, threadId })
      })

      if (response.status !== 200) {
        console.log('✨ ~ response:', response)
        toast.error(response.statusText)
      }

      if (response.body) {
        const stream = fromReadableStream(response.body)
        let assistantMessage: Message = { role: 'assistant', content: '' }

        for await (const chunk of stream) {
          const content = chunk?.choices[0]?.delta?.content || ''
          if (content) {
            assistantMessage.content += content
            setMessages(prev => {
              const lastMessage = prev[prev.length - 1]
              if (lastMessage.role === 'assistant')
                return [...prev.slice(0, -1), assistantMessage]
              return [...prev, assistantMessage]
            })
          }
        }
      }

      // Set chat threadId
      const lbThreadId = response.headers.get('lb-thread-id')
      if (lbThreadId) setThreadId(lbThreadId)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

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
        isLoading={isLoading}
        // stop={stop}
        // reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  )
}
