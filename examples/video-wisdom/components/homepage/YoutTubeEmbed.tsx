import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export interface YouTubeOEmbedData {
    author_name: string;
    author_url: string;
    height: number;
    html: string;
    provider_name: string;
    provider_url: string;
    thumbnail_height: number;
    thumbnail_url: string;
    thumbnail_width: number;
    title: string;
    type: string;
    version: string;
    width: number;
}

const YouTubeEmbed: React.FC<YouTubeOEmbedData> = (oEmbedData) => {
    return (
        <div className="flex justify-center gap-2 sm:w-[500px] flex-col">
            <Card className="max-w-full mx-auto shadow-md flex bg-muted">
                <CardHeader className="p-4">
                    <CardTitle className="text-sm font-sm">{oEmbedData.title}</CardTitle>
                    <CardDescription>
                        <a
                            href={oEmbedData.author_url}
                            className="text-blue-500 text-xs hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {oEmbedData.author_name}
                        </a>
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                    <div
                        className="aspect-w-16 aspect-h-9"
                        dangerouslySetInnerHTML={{ __html: oEmbedData.html }}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default YouTubeEmbed;