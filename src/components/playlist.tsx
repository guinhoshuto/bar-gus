import { useCallback, useEffect, useState } from "react"
import { Video } from "../../utils/types"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Song from "./song"


interface PlaylistProps {
  playlist: Video[]
  playSong: (video: Video) => void
}


export default function Playlist(props: PlaylistProps){
  const [queue, setQueue] = useState<Video[]>(props.playlist)

  useEffect(() => {
    setQueue(props.playlist)
  }, [props.playlist])
  // const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
  //   setQueue((prevCards: Video[]) => {

  //   })
  // })
  console.log(queue)

  return(
    <div className="songs">
      <div className="search">
          <input type="text" name="" id="" />
      </div>
      {/* <DndProvider backend={HTML5Backend}> */}
        <div className="list">
          <ul>
            {queue.map(song => (
              <li key={song.id}>
                  <Song 
                      playSong={() => props.playSong(song)}
                      title={song.title}
                      duration={song.duration}
                      // onMove={}
                      video={song}
                      />
              </li>
            ))}
          </ul>
        </div>
      {/* </DndProvider> */}
    </div>
  )
}