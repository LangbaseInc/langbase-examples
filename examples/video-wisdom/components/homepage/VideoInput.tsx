
import React, { useState } from 'react'
import { toast } from 'sonner';
import YTLinkInput from './YTLinkInput';
import YTLoaded from './YTLoaded';
import { YouTubeOEmbedData } from './YoutTubeEmbed';
import YouTubeEmbedSkeleton from './YouTubeEmbedSkeleton';
import VideoInfoAndControls from './VideoInfoAndControl';
import { AIInteraction } from './AIInteraction';
import { extractVideoId, getKeyFromLocalStorage, isKeyInLocalStorage, setKeyInLocalStorage } from '@/lib/utils';

export default function VideoInput({
    transcript,
    setTranscript,
    loading,
    setLoading,
}: {
    transcript: string;
    setTranscript: (transcript: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}) {

    const [videoEmbedData, setVideoEmbedData] = useState<YouTubeOEmbedData | null>(null);

    // Fetch the transcript from the api endpoint
    async function fetchTranscript(videoId: string) {
        const response = await fetch('/api/transcript', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ videoId }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch transcript');
        }

        const data = await response.json();
        return data.transcript;
    }

    const handleGetWisdom = async (ytLink: string) => {
        // Ping YT to make sure the video is available
        const response = await fetch(`https://www.youtube.com/oembed?url=${ytLink}`);
        if (!response.ok) {
            toast.error("This video is not available");
            return;
        }
        // Get the video embed data
        const data = await response.json();

        // Set the video embed data
        setVideoEmbedData(data);

        // Extract videoId from the YouTube link
        const videoId = extractVideoId(ytLink);

        // Check if the link is valid
        if (!videoId) {
            toast.error("Please enter a valid YouTube link");
            return;
        }

        try {
            // Set loading to true
            setLoading(true);

            let tempTranscript = '';
            // Check if it exists in the local storage
            if (isKeyInLocalStorage(videoId)) {
                tempTranscript = getKeyFromLocalStorage(videoId) || '';
            } else {
                tempTranscript = await fetchTranscript(videoId);
                setKeyInLocalStorage(videoId, transcript);
            }

            // Set the transcript
            setTranscript(tempTranscript);
        } catch (error: any) {
            // Set the error message
            toast.error(error.message);
        } finally {
            // Set loading to false
            setLoading(false);
        }
    };

    if (loading) return <YouTubeEmbedSkeleton />
    if (!loading && !transcript) return <YTLinkInput handleGetWisdom={handleGetWisdom} />
    if (!loading && transcript) return (
        <div className="max-w-full flex flex-col gap-2">
            <VideoInfoAndControls setTranscript={setTranscript} />
            <YTLoaded oEmbedData={videoEmbedData} />
            <AIInteraction transcript={transcript} />
        </div >
    )


}


