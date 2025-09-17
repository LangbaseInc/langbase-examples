import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {MessageSquare, Hash, Clock, FileText } from "lucide-react";

export function Landing({ onLaunch }: { onLaunch: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-4 flex flex-col justify-center min-h-screen py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 overflow-hidden">
            <img src="/icon.jpeg" alt="Slack Agent" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Slack Insight Agent</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get intelligent insights from your Slack workspace with AI-powered analysis
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-2 mt-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={onLaunch}
          >
            Launch Slack Agent
          </Button>
        </div>

        {/* Features Preview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="animate-in fade-in slide-in-from-left-4 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                Channel Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analyze conversations and extract key information from any Slack channel
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-left-2 duration-500 delay-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Smart Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Find specific discussions and decisions across your entire Slack history
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-right-2 duration-500 delay-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Timeline Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track when important topics were discussed and decisions were made
              </p>
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-right-4 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create summaries and reports from your Slack conversations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              Get insights from your Slack workspace in three simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-3 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-lg font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold">Ask Questions</h3>
                <p className="text-muted-foreground">
                  Pose natural language questions about your Slack workspace
                </p>
              </div>
              <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-lg font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI processes your Slack data to find relevant information
                </p>
              </div>
              <div className="text-center space-y-3 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-lg font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold">Get Insights</h3>
                <p className="text-muted-foreground">
                  Receive structured, actionable insights from your conversations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}