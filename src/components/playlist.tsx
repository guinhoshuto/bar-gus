import { Video } from "../../utils/types"
import { Play } from "@phosphor-icons/react"

interface PlaylistProps {
    playlist: Video[]
    playSong: (video: Video) => void
}

export default function Playlist(props: PlaylistProps){
    return(
      <div className="songs">
        <div className="search">
            <input type="text" name="" id="" />
        </div>
        <div className="list">
          <ul>
            {props.playlist.map(song => (
              <li key={song.title}>
                <button onClick={() => props.playSong(song)}>
                    <Play size={44} />
                </button>
                <span>
                    {song.title} 
                </span>
                <span>
                    {song.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
}