import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { YouTubeOEmbedData } from '@/lib/utils';

export default function YouTubeEmbed({
    oEmbedData
}: {
    oEmbedData: YouTubeOEmbedData
}) {
    return (
        <div className="flex justify-center gap-2 sm:w-[450px] flex-col">
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
