import { Card } from "@/components/ui/card"
import { IconPlayground } from "../ui/iconists/icon-playground";
import { IconChat } from "../ui/iconists/icon-chat";
import { IconDocFile } from "../ui/iconists/icon-docfile";
import { IconExamples } from "../ui/iconists/icon-examples";
import { IconExplore } from "../ui/iconists/icon-explore";
import { IconInfo } from "../ui/iconists/icon-info";
import { IconMemory } from "../ui/iconists/icon-memory";
import { useState } from "react";
import Generate from "./Generate";
import { IconArrowLeft } from "../ui/iconists/icon-arrow-left";
import { IconX } from "../ui/iconists/icon-x";
import { IconCommand } from "../ui/iconists/icon-command";
import { fromReadableStream } from "langbase";
import { toast } from "sonner";
import { MemoizedReactMarkdown } from "../common/markdown";
import remarkGfm from 'remark-gfm'
import { CodeBlock } from "../common/codeblock";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { IconCheck } from "../ui/iconists/icon-check";
import { IconCopy } from "../ui/iconists/icon-copy";

export interface AIPipeI {
    title: string;
    pipeName: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const AIPipes: AIPipeI[] = [
    { title: "Ask a Question", pipeName: "generate", icon: IconChat },
    { title: "Summarize", pipeName: "summarize", icon: IconDocFile },
    { title: "Extract Quotes", pipeName: "quotes", icon: IconExamples },
    { title: "Get Recommendations ", pipeName: "recommendation", icon: IconExplore },
    { title: "Get Main Ideas", pipeName: "mainIdeas", icon: IconInfo },
    { title: "Get Interesting Facts", pipeName: "facts", icon: IconMemory },
    { title: "Wow Moments", pipeName: "wow", icon: IconPlayground },
    { title: "Extract Tweets", pipeName: "tweets", icon: IconX },
]

export enum GenerationType {
    Summarize = "summarize",
    Quotes = "quotes",
    Recommendation = "recommendation",
    MainIdeas = "mainIdeas",
    Facts = "facts",
    Wow = "wow",
    Tweets = "tweets"
};

export function AIInteraction({
    transcript,
}: {
    transcript: string;
}) {
    const [aiResponse, setAiResponse] = useState<string>("");
    const [selectedPipe, setSelectedPipe] = useState<AIPipeI | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

    const handlePredefinedPipes = async (type: GenerationType) => {
        // Prevent empty prompt
        if (loading) return

        // Set loading state and clear previous response
        setLoading(true)
        setAiResponse("")

        try {
            // Fetch response from the server
            const response = await fetch('/api/langbase/wisdom', {
                method: 'POST',
                body: JSON.stringify({ prompt: "", transcript, type }),
                headers: { 'Content-Type': 'text/plain' },
            });

            // If response is not successful, throw an error
            if (response.status !== 200) {
                const errorData = await response.text();
                toast.error(errorData);
                return;
            }


            // Parse the response
            if (response.body) {
                const stream = fromReadableStream(response.body);
                for await (const chunk of stream) {
                    const content = chunk?.choices[0]?.delta?.content;
                    content && setAiResponse((prev: string) => (prev + content));
                }
            }

        } catch (error) {
            toast.error("Failed to get AI response")
        } finally {
            setLoading(false)
        }
    }

    const handleCardClick = (pipe: AIPipeI) => {
        setSelectedPipe(pipe)
        if (pipe.pipeName == "generate") return;
        handlePredefinedPipes(pipe.pipeName as GenerationType)
    }

    const onCopy = () => {
        if (isCopied) return
        copyToClipboard(aiResponse)
    }

    return (
        <div className=" mt-4 max-w-[500px]">
            <div className='flex text-md pb-4 gap-2 items-center justify-between'>
                <div className="flex items-center gap-2">
                    <IconPlayground className="h-4 w-4 text-foreground-500" /> {selectedPipe ? selectedPipe.title : "Choose an AI action for this video"}
                </div>
                {selectedPipe &&
                    <div className="flex items-center gap-2 cursor-pointer" onClick={
                        () => {
                            setSelectedPipe(null);
                            setAiResponse("");
                        }
                    }>
                        <IconArrowLeft className="h-4 w-4 text-foreground-500" /> Back
                    </div>
                }
            </div>

            {!selectedPipe &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {AIPipes.map((pipe, index) => (
                        <Card key={index} className="cursor-pointer bg-zinc-900 border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 transition-colors duration-200 ease-in-out"
                            onClick={() => handleCardClick(pipe)}
                        >
                            <div className="p-4 space-y-2">
                                <div className="text-zinc-100 flex items-center gap-2 text-sm space-x-2">
                                    <pipe.icon className="h-4 w-4 text-foreground-500" /> {pipe.title}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            }

            {selectedPipe && selectedPipe.pipeName === "generate" && <Generate transcript={transcript} setAIResponse={setAiResponse} />}

            {selectedPipe && selectedPipe.pipeName !== "generate" && loading && !aiResponse &&
                <div className="text-sm mt-4 p-4 rounded-lg border font-regular text-zinc-100 shadow-md bg-muted flex flex-col">
                    <div className="text-sm">AI is thinking...</div>
                </div>
            }

            {aiResponse &&
                <div className="mt-5">
                    <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <IconCommand className="h-4 w-4 text-foreground-500" /> Response
                        </div>

                        <div onClick={onCopy} className="flex items-center">
                            {isCopied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
                            <span className="sr-only">Copy message</span>
                        </div>
                    </div>

                    <div className="text-sm mt-4 p-4 rounded-lg border font-regular text-zinc-100 shadow-md bg-muted flex flex-col">
                        <div className="text-sm">
                            <MemoizedReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                className="prose rounded-xl dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words prose-pre:rounded-xl"
                                components={{
                                    p({ children }) {
                                        return <p className="mb-2 last:mb-0">{children}</p>
                                    },
                                    h1({ children }) {
                                        return <h1 className="text-sm font-semibold">{children}</h1>
                                    },
                                    h2({ children }) {
                                        return <h2 className="text-sm font-semibold">{children}</h2>
                                    },
                                    h3({ children }) {
                                        return <h3 className="text-sm font-semibold">{children}</h3>
                                    },
                                    h4({ children }) {
                                        return <h4 className="text-sm font-semibold">{children}</h4>
                                    },
                                    h5({ children }) {
                                        return <h5 className="text-xs font-semibold">{children}</h5>
                                    },
                                    h6({ children }) {
                                        return <h6 className="text-xs font-normal">{children}</h6>
                                    },
                                    code({ node, inline, className, children, ...props }) {
                                        if (children.length) {
                                            if (children[0] == '▍') {
                                                return (
                                                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                                                )
                                            }

                                            children[0] = (children[0] as string).replace('`▍`', '▍')
                                        }

                                        const match = /language-(\w+)/.exec(className || '')

                                        if (inline) {
                                            return (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }

                                        return (
                                            <CodeBlock
                                                key={Math.random()}
                                                language={(match && match[1]) || ''}
                                                value={String(children).replace(/\n$/, '')}
                                                {...props}
                                            />
                                        )
                                    }
                                }}
                            >
                                {aiResponse}
                            </MemoizedReactMarkdown>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}