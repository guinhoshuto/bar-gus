import { list } from "postcss";
import { Video } from "../../utils/types";
import { Play } from "@phosphor-icons/react"

interface SongProps {
    playSong: (video: Video) => void
    title: string
    duration: string
    // onMove: () => void
    video: Video
}

export default function Song(props: SongProps){
    return(
        <div>
            <button onClick={() => props.playSong(props.video)}>
                <Play size={44} />
            </button>
            <span>
                {props.title} 
            </span>
            <span>
                {props.duration}
            </span>
        </div>
    )
}