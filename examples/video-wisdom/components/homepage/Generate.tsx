import React, { Dispatch, SetStateAction } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { fromReadableStream } from 'langbase'

export default function Generate({
    transcript,
    setAIResponse,
}: {
    transcript: string,
    setAIResponse: Dispatch<SetStateAction<string>>,
}) {
    const [prompt, setPrompt] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent form submission
        e.preventDefault()

        // Prevent empty prompt
        if (!prompt.trim() || loading) return

        // Set loading state and clear previous response
        setLoading(true)
        setAIResponse("")

        try {

            // Fetch response from the server
            const response = await fetch('/api/langbase/wisdom', {
                method: 'POST',
                body: JSON.stringify({ prompt, transcript, type: "generate" }),
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
                    content && setAIResponse((prev: string) => (prev + content));
                }
            }

        } catch (error) {
            toast.error("Failed to generate response")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full items-center gap-2"
        >
            <Input
                type="text"
                placeholder="Enter prompt message here"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                required
            />

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'AI is thinking...' : 'Ask AI'}
            </Button>
        </form>
    )
}
