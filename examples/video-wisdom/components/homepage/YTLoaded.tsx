import { videosData, YouTubeOEmbedData } from "@/lib/utils";
import YouTubeEmbed from "./YoutTubeEmbed";

export default function YTLoaded({
    currentVideoId,
}: {
    currentVideoId: number;
}) {
    const oEmbedData = videosData[currentVideoId]?.oEmbed;

    return (
        <>
            {oEmbedData && <YouTubeEmbed oEmbedData={oEmbedData} />}
        </>
    )
}
