import { list } from "postcss";
import { Video } from "../../utils/types";
import { Play } from "@phosphor-icons/react"
import { formatDuration } from "../../utils/format-duration";

interface SongProps {
    playSong: (video: Video) => void
    title: string
    duration: string
    // onMove: () => void
    video: Video
}

export default function Song(props: SongProps){
    return(
        <div className="flex items-center">
            <button 
                className="rounded-full p-2 bg-purple-800"
                onClick={() => props.playSong(props.video)}
            >
                <Play className="text-white" size={32} />
            </button>
            <div className="flex justify-between p-2 w-full">
                <span>
                    {props.title} 
                </span>
                <span>
                    {formatDuration(props.duration)}
                </span>

            </div>
        </div>
    )
}