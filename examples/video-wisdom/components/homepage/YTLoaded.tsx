import YouTubeEmbed, { YouTubeOEmbedData } from "./YoutTubeEmbed";
import YouTubeEmbedSkeleton from "./YouTubeEmbedSkeleton";

export default function YTLoaded({
    oEmbedData,
}: {
    oEmbedData: YouTubeOEmbedData | null;
}) {

    return (
        <>
            {oEmbedData && <YouTubeEmbed {...oEmbedData} />}
        </>
    )
}
