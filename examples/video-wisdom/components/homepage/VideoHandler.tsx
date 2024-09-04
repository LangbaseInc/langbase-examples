
import React, { useState } from 'react'
import YTLoaded from './YTLoaded';
import VideoInfoAndControls from './VideoInfoAndControl';
import { AIInteraction } from './AIInteraction';
import YTVideoSelect from './YTVideoSelect';

export default function VideoHandler() {
    const [currentVideoId, setCurrentVideoId] = useState<number | null>(null);

    if (currentVideoId === null) return <YTVideoSelect setCurrentVideoId={setCurrentVideoId} />
    if (currentVideoId !== null) return (
        <div className="max-w-full flex flex-col gap-2">
            <VideoInfoAndControls setCurrentVideoId={setCurrentVideoId} />
            <YTLoaded currentVideoId={currentVideoId} />
            <AIInteraction currentVideoId={currentVideoId} />
        </div >
    )


}


