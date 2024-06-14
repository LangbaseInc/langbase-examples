import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight, IconInfo } from '@/components/ui/icons'
import Link from 'next/link'

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="light:ring-ring:ring-border ring-ring/10 relative my-7 rounded-lg py-3.5 pl-[1.625rem] pr-4 ring-1 ring-inset [--callout-border:theme(colors.indigo.400)] [--callout-icon:theme(colors.indigo.400)] [--callout-title:theme(colors.indigo.400)] dark:[--callout-border:theme(colors.indigo.400)] dark:[--callout-icon:theme(colors.indigo.400)] dark:[--callout-title:theme(colors.indigo.400)] [&>*]:my-0 [&>*]:py-0">
        <div className="absolute inset-y-2 left-2 w-0.5 rounded-full bg-[--callout-border]"></div>
        <div className="mb-2 mt-0 flex items-center justify-start gap-1">
          <span className="text-xs font-medium text-[--callout-title]">
            Chatbot Example
          </span>
        </div>

        <div className="mt-2">
          <h4 className="text-foreground mt-4 tracking-wide">
            AI chatbot powered by{' '}
            <Link
              target="_blank"
              className="underline hover:text-indigo-400"
              href="https://langbase.com/"
            >
              Langbase
            </Link>
          </h4>

          <div className="mt-4 flex flex-col gap-4 text-sm [&>p]:my-0 [&>p]:py-0">
            <p>
              Try the chatbot by sending a message. Follow these links for the
              next steps:
            </p>
            <p className="mt-2 flex flex-col gap-4">
              <Link href="/chatbot" className="flex">
                <IconArrowRight className="mr-2 text-indigo-400" />
                Code on GitHub
              </Link>
              <Link href="/chatbot" className="flex">
                <IconArrowRight className="mr-2 text-indigo-400" />
                Langbase chatbot pipe used in this example
              </Link>
              <Link href="/chatbot" className="flex">
                <IconArrowRight className="mr-2 text-indigo-400" />
                Documentation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
