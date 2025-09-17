"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Send, MessageSquare, Hash, Clock, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function Agent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const exampleQueries = [
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "Show me all users with their status and role",
    category: "User Lookup"
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "Add 🚀 reaction to the last message in #launch",
    category: "Engagement"
  },
  {
    icon: <Hash className="w-4 h-4" />,
    text: "List all public channels sorted by activity",
    category: "Channel Discovery"
  },
  {
    icon: <Send className="w-4 h-4" />,
    text: "Post 'Don’t forget retro at 3 PM!' to #team-agile",
    category: "Messaging"
  },
  {
    icon: <Send className="w-4 h-4" />,
    text: "Reply 'On it!' to the thread about the login bug in #engineering",
    category: "Thread Replies"
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "Get Mairaj's full profile — email, title, and timezone",
    category: "Profile Lookup"
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "Show all replies in the 'Q3 Goals' thread in #leadership",
    category: "Thread History"
  },
  {
    icon: <Clock className="w-4 h-4" />,
    text: "Get the last 10 messages from #support",
    category: "Channel History"
  }
];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8787/api/langbase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim() })
      });

      // Parse the response (with fallback for non-JSON)
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Check for ANY error condition
      if (!response.ok || (data && typeof data === 'object' && (data.success === false || data.error))) {
        // Extract the most specific error message
        const errorMessage = data.error || (data.message || `Error: ${response.status}`);
        throw new Error(errorMessage);
      }

      // ONLY for successful responses, update the response
      if (typeof data === 'string') {
        setResponse(data);
      } else if (data && typeof data === 'object') {
        const responseText = data.output || data.message || JSON.stringify(data);
        setResponse(responseText);
      } else {
        setResponse(String(data));
      }

      // ONLY for successful responses, show success toast
      toast.success("Query processed successfully", {
        closeButton: true,
        duration: 3000
      });

    } catch (error) {
      console.error("Error processing Slack query:", error);

      // Show error toast with specific message
      toast.error(error.message || "An error occurred while processing your Slack query", {
        closeButton: true,
        duration: Infinity
      });

      // DON'T clear existing response on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (exampleText) => {
    setInput(exampleText);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <img src="/icon.jpeg" alt="Slack Agent" className="w-10 h-10 object-contain" />
            <span>Slack Agent</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Ask questions about your Slack workspace and get intelligent responses
          </p>
        </div>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Prompt the Slack Agent</CardTitle>
            <CardDescription>
              Enter your Slack-related query below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., Summarize the last 10 messages in #general"
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Example Queries */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5" />
              Example Queries
            </CardTitle>
            <CardDescription className="text-sm">
              Click on any example below to try it out
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-2 md:grid-cols-2">
              {exampleQueries.map((example, index) => (
                <div
                  key={index}
                  onClick={() => handleExampleClick(example.text)}
                  className="p-2 border rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div className="text-primary mt-2">
                      {example.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                        {example.category}
                      </Badge>
                      <p className="text-xs font-medium leading-relaxed">
                        {example.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Response */}
        {response && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}