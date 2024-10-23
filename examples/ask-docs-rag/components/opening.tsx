import Link from 'next/link'

export function Opening() {
  return (
    <div className="mx-auto max-w-3xl px-2 sm:max-w-4xl sm:px-0">
      <div className="light:ring-ring:ring-border ring-ring/10 relative my-7 rounded-lg py-3.5 pl-[1.625rem] pr-4 ring-1 ring-inset [--callout-border:theme(colors.indigo.400)] [--callout-icon:theme(colors.indigo.400)] [--callout-title:theme(colors.indigo.400)] dark:[--callout-border:theme(colors.indigo.400)] dark:[--callout-icon:theme(colors.indigo.400)] dark:[--callout-title:theme(colors.indigo.400)] [&>*]:my-0 [&>*]:py-0">
        <div className="absolute inset-y-2 left-2 w-0.5 rounded-full bg-[--callout-border]"></div>
        <div className="mb-2 mt-0 flex items-center justify-start gap-1">
          <span className="text-xs font-medium text-[--callout-title]">
            Ask Docs Example
          </span>
        </div>

        <div className="mt-2">
          <div className="mt-4 flex flex-col gap-4 text-sm [&>p]:my-0 [&>p]:py-0">
            <p>Learn more by checking out:</p>
            <div className="mt-2 flex flex-col gap-4 text-sm">
              <Dlink href="https://langbase.com/docs/guides/rag-on-docs">
                <span>1.</span>
                <span>
                  Follow this guide to create a RAG on your documentation
                </span>
              </Dlink>
              <Dlink href="https://langbase.com/examples/ask-my-docs">
                <span>2.</span>
                <span>Fork the `ask-my-docs` RAG Pipe on ⌘ Langbase</span>
              </Dlink>

              <Dlink href="https://github.com/LangbaseInc/langbase-examples/tree/main/examples/ask-docs-rag">
                <span>3.</span>
                <span>Deep dive into the source code</span>
              </Dlink>
              <Dlink href="https://langbase.com/docs">
                <span>4.</span>
                <span>Learn more about Langbase Memory and Pipes</span>
              </Dlink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Description Link
function Dlink({
  href,
  children,
  ...props
}: {
  href: string
  children: React.ReactNode
  [key: string]: any
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-2 hover:text-indigo-400 [&>span:first-child]:text-indigo-400"
      {...props}
    >
      {children}
    </Link>
  )
}
