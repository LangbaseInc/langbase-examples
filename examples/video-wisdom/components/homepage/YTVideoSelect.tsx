import { videosData } from "@/lib/utils";
import YouTubeEmbed from "./YoutTubeEmbed";

export default function YTVideoSelect({
    setCurrentVideoId,
}: {
    setCurrentVideoId: (id: number) => void;
}) {
    return (
        <div className="flex justify-center w-full gap-4 flex-wrap max-w-5xl">
            {
                videosData.map((video, index) => (
                    <span onClick={() => setCurrentVideoId(video.id)} className="cursor-pointer" key={index}>
                        <YouTubeEmbed oEmbedData={video.oEmbed} />
                    </span>
                ))}
        </div>
    )
}
