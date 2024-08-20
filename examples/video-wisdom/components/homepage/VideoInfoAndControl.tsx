import { Button } from "../ui/button";
import { IconCheck } from "../ui/iconists/icon-check";
import { IconEdit } from "../ui/iconists/icon-edit";

export default function VideoInfoAndControls({ setTranscript }: {
    setTranscript: (transcript: string) => void;
}) {
    return <div className='flex justify-between text-sm'>
        <div className='flex gap-2 items-center'>
            <IconCheck className="h-4 w-4 text-green-500" /> Video Processed
        </div>
        <Button className="self-end flex gap-2" variant="outline" onClick={() => setTranscript('')}>
            <IconEdit className="h-4 w-4" /> Edit URL
        </Button>
    </div>;
}