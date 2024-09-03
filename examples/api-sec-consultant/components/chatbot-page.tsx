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
  return (
    <div className="min-h-screen">
      <div className="fixed left-5 top-1/2 transform -translate-y-1/2 w-64 p-4 bg-inherit shadow-lg rounded-r-lg z-10">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How to use this chatbot and what to expect?</AccordionTrigger>
            <AccordionContent>
              <li>Say Hello to start a guided conversation with the Web API Security Consultant Bot. Answer the Yes/No questions accurately to assess your API's security posture.</li>
              <li>If needed, ask the bot to clarify any question before answering.</li>
              <li>After the 10th section, the bot will provide an overall security score, offering a rough estimate of potential vulnerabilities based on the OWASP API Security Checklist (2023).</li> 
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Common use cases</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4">
                <li>Identifying security vulnerabilities in your API</li>
                <li>Understanding OWASP Top 10 for APIs</li>
                <li>Best practices for API authentication and authorization</li>
                <li>Guidance on input validation and sanitization</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>About this bot</AccordionTrigger>
            <AccordionContent>
              This Web API Security Consultant Bot is powered by Langbase and provides expert advice based on the latest OWASP 2023 guidelines for API security.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
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
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}
