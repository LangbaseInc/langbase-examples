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
              <li>Simply say <b>Hello</b> to start a guided conversation with the Web API Security Consultant Bot. The chatbot will present a series of Yes/No multiple-choice questions to assess the security posture of your API implementation. Please answer each question as accurately as possible based on your current API implementation status.</li>
              <li>You can always ask the chabot to clarify a specific question in the section before you can answer.</li>
              <li>After completing the 10th section, the chatbot will calculate an overall security posture score for your API implementation. Keep in mind that this score is a rough estimate, designed to help you identify potential vulnerabilities in your web API based on the OWASP API Security Checklist (2023).</li> 
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
