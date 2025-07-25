"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getRunner, type Message } from "langbase"
import { Heart, Brain, Lightbulb, Phone, AlertTriangle, Trash2 } from "lucide-react"
import { toast } from "sonner"
import MarkdownRender from "@/components/markdown-render"
import { IconSend } from "@/components/ui/icons/icon-send"
import cn from "mxcn"
import { IconWarn } from "@/components/ui/icons/icon-warn"
import { IconMemory } from "@/components/ui/icons/icon-memory"
import { IconHelp } from "@/components/ui/icon-help"

export const runtime = "edge"

const therapeuticPrompts = [
	"I'm feeling anxious about...",
	"I've been struggling with negative thoughts about...",
	"I need help coping with...",
	"I want to explore my feelings about...",
	"Can you guide me through a mindfulness exercise?",
	"I'd like to work on a CBT exercise for...",
]

const crisisResources = [
	{ name: "National Suicide Prevention Lifeline", number: "988", available: "24/7" },
	{ name: "Crisis Text Line", number: "Text HOME to 741741", available: "24/7" },
	{ name: "SAMHSA National Helpline", number: "1-800-662-4357", available: "24/7" },
]

export default function AITherapistChat() {
	const [showDisclaimer, setShowDisclaimer] = useState(true)
	const [showCrisisResources, setShowCrisisResources] = useState(false)
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState<string>("")
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault()
			setIsLoading(true)

			const message: Message = {
				role: "user",
				content: input,
			}

			setMessages((prev) => [...prev, message])
			setInput("")

			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: [...messages, message],
				}),
			})

			if (!response.ok) {
				const errorText = await response.text()
				toast.error(`Error: ${errorText || "Failed to process your request."}`)
				return
			}

			if (response.body) {
				const assistantMessage: Message = { role: "assistant", content: "" }
				setIsLoading(false)

				// Add the assistant message to the current state
				setMessages((prev) => [...prev, assistantMessage])

				const stream = getRunner(response.body)
				for await (const chunk of stream) {
					const content = chunk.choices[0]?.delta?.content || ""
					assistantMessage.content += content

					// Update only the last message (the assistant message)
					setMessages((prev) => [...prev.slice(0, -1), { ...assistantMessage }])
				}
			}
		} catch (error) {
			toast.error("An error occurred while processing your request. Please try again later.")
		} finally {
			setIsLoading(false)
		}
	}

	const handlePromptClick = (prompt: string) => {
		setInput(prompt)
	}

	const clearChat = () => {
		if (messages.length === 0) {
			toast.info("Chat is already empty")
			return
		}

		setMessages([])
		toast.success("Chat cleared successfully")
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
								<IconMemory className="h-5 w-5 text-white" />
							</div>
							<div>
								<h1 className="text-xl font-semibold text-gray-900 tracking-tight">Therapeutic Assistant</h1>
								<p className="text-sm text-gray-500">Professional support, available anytime</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
								<span className="text-xs font-medium text-gray-600 inline-flex items-center gap-1">
									Powered by
									<a
										href="https://www.langbase.com"
										target="_blank"
										className="text-gray-800 hover:text-gray-900 font-semibold"
										rel="noreferrer"
									>
										Langbase
									</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-6 py-6">
				{/* Disclaimer */}
				{showDisclaimer && (
					<div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
						<div className="flex items-start gap-3">
							<IconWarn className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
							<div className="flex-1">
								<p className="text-sm text-amber-800 leading-relaxed">
									<span className="font-semibold">Important:</span> This AI provides supportive guidance but cannot
									replace professional mental health care. For crisis situations, please contact emergency services or a
									mental health professional immediately.
								</p>
								<div className="flex gap-2 mt-3">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setShowCrisisResources(!showCrisisResources)}
										className="h-8 px-3 text-xs font-medium border-amber-300 text-amber-700 hover:bg-amber-100"
									>
										Crisis Resources
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setShowDisclaimer(false)}
										className="h-8 px-3 text-xs text-amber-600 hover:bg-amber-100"
									>
										Dismiss
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Crisis Resources */}
				{showCrisisResources && (
					<div className="mb-6 p-5 bg-red-50 border border-red-200 rounded-2xl">
						<div className="flex items-center gap-2 mb-4">
							<Phone className="h-5 w-5 text-red-600" />
							<h3 className="font-semibold text-red-900">Emergency Crisis Support</h3>
						</div>
						<div className="space-y-3">
							{crisisResources.map((resource, index) => (
								<div
									key={index}
									className="flex justify-between items-center p-3 bg-white rounded-xl border border-red-100"
								>
									<div>
										<p className="font-medium text-gray-900 text-sm">{resource.name}</p>
										<p className="text-lg font-mono text-red-600 mt-0.5">{resource.number}</p>
									</div>
									<Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
										{resource.available}
									</Badge>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Main Chat Interface */}
				<div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
					<div className={cn("h-[600px] overflow-y-auto", !showDisclaimer && "h-[700px]")}>
						<div className="p-6 space-y-6">
							{messages.length === 0 && (
								<div className="text-center space-y-8 py-12">
									<div className="space-y-4">
										<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
											<IconHelp className="h-8 w-8 text-gray-600" />
										</div>
										<div>
											<h2 className="text-2xl font-semibold text-gray-900 mb-2">How can I support you today?</h2>
											<p className="text-gray-600 max-w-md mx-auto leading-relaxed">
												I'm here to listen and guide you through therapeutic techniques including CBT, mindfulness, and
												exploratory conversations.
											</p>
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
										{therapeuticPrompts.map((prompt, index) => (
											<button
												key={index}
												onClick={() => handlePromptClick(prompt)}
												className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all duration-200 hover:shadow-sm group"
											>
												<div className="flex items-start gap-3">
													<Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
													<span className="text-sm text-gray-700 leading-relaxed">{prompt}</span>
												</div>
											</button>
										))}
									</div>
								</div>
							)}

							{messages.map((message) => (
								<div
									key={message.content}
									className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`max-w-[75%] px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 ${message.role === "user" ? "rounded-br-md" : "rounded-bl-md"
											}`}
									>
										<div className="max-w-full p-5 rounded-2xl sm:prose prose-sm prose-zinc !text-sm break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-pre:rounded-2xl prose-pre:ring-1 prose-pre:ring-border prose-pre:overflow-hidden overflow-hidden">
											<MarkdownRender content={message.content || ""} />
										</div>
									</div>
								</div>
							))}

							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md max-w-[75%]">
										<div className="flex items-center gap-3">
											<div className="flex gap-1">
												<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{ animationDelay: "0.1s" }}
												></div>
												<div
													className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
													style={{ animationDelay: "0.2s" }}
												></div>
											</div>
											<span className="text-sm text-gray-500">Thinking...</span>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Input Area */}
					<div className="border-t border-gray-200 bg-gray-50/50 p-4">
						<form onSubmit={handleSubmit} className="flex gap-2">
							<div className="flex-1">
								<Input
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder="Share what's on your mind..."
									className="h-11 bg-white text-black border-gray-300 rounded-full px-4 text-sm placeholder:text-gray-500 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 shadow-none"
									disabled={isLoading}
								/>
							</div>
							<div className="flex gap-2">
								{messages.length > 0 && (
									<Button
										type="button"
										onClick={clearChat}
										variant="outline"
										className="h-11 w-11 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 p-0 shadow-none bg-transparent"
										title="Clear chat"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								)}
								<Button
									type="submit"
									disabled={isLoading || !input.trim()}
									className="h-11 w-11 rounded-full bg-black hover:bg-gray-800 text-white p-0 shadow-none disabled:opacity-50 disabled:hover:bg-black"
								>
									<IconSend className="h-4 w-4" />
								</Button>
							</div>
						</form>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center mt-6 space-y-1">
					<p className="text-sm text-gray-600">
						This AI tool is designed to complement, not replace, professional therapy.
					</p>
					<p className="text-xs text-gray-500">
						For serious mental health concerns, please consult with a licensed professional.
					</p>
				</div>
			</div>
		</div>
	)
}
