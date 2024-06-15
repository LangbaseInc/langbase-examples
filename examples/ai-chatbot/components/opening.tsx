import { IconArrowRight } from '@/components/ui/icons'
import Link from 'next/link'

export function Opening() {
  return (
    <div className="mx-auto max-w-3xl px-2 sm:max-w-4xl sm:px-0">
      <div className="light:ring-ring:ring-border ring-ring/10 relative my-7 rounded-lg py-3.5 pl-[1.625rem] pr-4 ring-1 ring-inset [--callout-border:theme(colors.indigo.400)] [--callout-icon:theme(colors.indigo.400)] [--callout-title:theme(colors.indigo.400)] dark:[--callout-border:theme(colors.indigo.400)] dark:[--callout-icon:theme(colors.indigo.400)] dark:[--callout-title:theme(colors.indigo.400)] [&>*]:my-0 [&>*]:py-0">
        <div className="absolute inset-y-2 left-2 w-0.5 rounded-full bg-[--callout-border]"></div>
        <div className="mb-2 mt-0 flex items-center justify-start gap-1">
          <span className="text-xs font-medium text-[--callout-title]">
            Chatbot Example
          </span>
        </div>

        <div className="mt-2">
          <h4 className="text-foreground mt-4 flex gap-1 tracking-wide">
            <span>AI Chatbot powered by a</span>
            <Link
              target="_blank"
              className="underline hover:text-indigo-400"
              href="https://beta.langbase.com/examples/ai-chatbot"
            >
              <span className="font-bold">pipe on ⌘ Langbase</span>
            </Link>
          </h4>

          <div className="mt-4 flex flex-col gap-4 text-sm [&>p]:my-0 [&>p]:py-0">
            <p>
              Try the chatbot by sending a message. Follow these links for the
              next steps:
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <DLink
                href="https://beta.langbase.com/examples/chatbot"
                icon={<IconArrowRight />}
                text={`→ Code on GitHub`}
              />
              <Link
                href="https://github.com/LangbaseInc/langbase-examples/tree/main/examples/chatbot"
                target="_blank"
                className="flex hover:text-indigo-400 flex items-center gap-2"
              >
                <IconArrowRight className="text-indigo-400" />
                <span>Code on GitHub</span>
              </Link>
              <Link
                href="https://beta.langbase.com/examples/chatbot"
                target="_blank"
                className="flex hover:text-indigo-400 flex items-center gap-2"
              >
                <IconArrowRight className="text-indigo-400" />
                <span>Langbase chatbot pipe used in this example</span>
              </Link>
              <Link
                href="https://beta.langbase.com/examples/chatbot"
                target="_blank"
                className="flex hover:text-indigo-400 flex items-center gap-2"
              >
                <IconArrowRight className="text-indigo-400" />
                Langbase chatbot pipe used in this example
              </Link>
              <Link
                href="https://langbase.com/docs/pipe/examples"
                target="_blank"
                className="flex hover:text-indigo-400 flex items-center gap-2"
              >
                <IconArrowRight className="text-indigo-400" />
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DLink({
  icon,
  text,
  href,
  ...props
}: {
  icon: React.ReactNode
  text: string
  href: string
  [key: string]: any
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex hover:text-indigo-400"
      {...props}
    >
      <i className="mr-2 text-indigo-400" />
      Code on GitHub
    </Link>
  )
}
