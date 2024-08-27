import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function YTLinkInput({
    handleGetWisdom,
}: {
    handleGetWisdom: (ytLink: string) => void;
}) {
    // State to store the YouTube link
    const [ytLink, setYtLink] = useState("");

    // Handle the button click
    const handleButtonClick = () => {
        // Check if the link is empty
        if (!ytLink || (!ytLink.includes("youtube.com") && !ytLink.includes("youtu.be"))) {
            toast.error("Please enter a valid YouTube link");
            return;
        }

        // Call the parent function to get the wisdom
        handleGetWisdom(ytLink);
    };

    return (
        <div className="relative flex items-center place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] after:hidden md:after:block">
            <div className="z-10 flex justify-center flex-col border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 py-8 px-7 gap-6 w-full w-screen md:w-[600px] items-center">
                <p className="text-zinc-300 font-light text-sm">Paste a YouTube video link to get started</p>
                <div className="flex justify-center gap-2 w-full max-w-full">
                    <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        type="text"
                        className="p-2 flex-grow"
                        value={ytLink}
                        onChange={(e) => setYtLink(e.target.value)}
                    />
                    <Button className="w-fit whitespace-nowrap" onClick={handleButtonClick}>Get Wisdom</Button>
                </div>
            </div>
        </div>
    )
}
