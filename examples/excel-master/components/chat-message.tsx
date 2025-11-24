import { Message } from 'ai'
import { Streamdown } from 'streamdown'

import { ChatMessageActions } from '@/components/chat-message-actions'
import { IconSparkles, IconUser } from '@/components/ui/icons'
import cn from 'mxcn'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-xl border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconSparkles />}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <Streamdown>{message.content}</Streamdown>
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}
