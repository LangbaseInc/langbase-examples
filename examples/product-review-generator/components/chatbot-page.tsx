'use client'

import { ChatList } from '@/components/chat-list'
import { useChat, type Message } from 'ai/react'
import cn from 'mxcn'
import { useState } from 'react'
import { toast } from 'sonner'
import { ChatInput } from './chat-input'
import { Opening } from './opening'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Suggestions } from './suggestions'

export interface ChatProps extends React.ComponentProps<'div'> {
  id?: string // Optional: Thread ID if you want to persist the chat in a DB
  initialMessages?: Message[] // Optional: Messages to pre-populate the chat from DB
}

export function Chatbot({ id, initialMessages, className }: ChatProps) {
  const [threadId, setThreadId] = useState<null | string>(null)
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

    const sendSuggestedPrompt = (prompt: string) => {
      setInput(prompt)
    }

  return (
    <div className="min-h-screen">
      <div className="fixed left-5 top-1/2 transform -translate-y-1/2 w-64 p-4 bg-inherit shadow-lg rounded-r-lg z-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How to use this chatbot and what to expect?</AccordionTrigger>
            <AccordionContent>
              <li>Say hello to start a guided conversation.</li>
              <li>Give a detailed review of the product you recently bought including postive and negative aspects.</li>
              <li>The Product Review Generator bot will generate a comprehensive review for you and other buyers looking for the same product.</li> 
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Common use cases</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4">
                <li>Consumer Experience Synthesis</li>
                <li>Balanced Feedback Generation</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>About this bot</AccordionTrigger>
            <AccordionContent>
              Product Review Generator Chatbot is powered by Langbase and generates reviews from individual user experiences into concise, informative reviews that highlight key product features, performance metrics, and potential drawbacks for prospective buyers.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    <div className="min-h-screen">
      <div className={cn('pb-36 pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
          </>
        ) : (
          <>
            <Opening />
            <Suggestions sendSuggestedPrompt={sendSuggestedPrompt} />
          </>
        )}
      </div>
      <ChatInput
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  </div>  
  )
}

