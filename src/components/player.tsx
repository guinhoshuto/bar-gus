import Script from 'next/script'
import { useRef, useEffect} from 'react'
import { Video } from '../../utils/types'

interface PlayerProps{
    video: Video
}

export default function Player({video} : PlayerProps){
  const playerRef = useRef<any>()


  function playSong(id: string){
    playerRef.current.setVideo(video.id)
    console.log('id',id)
  }

  function pause(){
    playerRef.current.pause()
  }


  function nextSong(){
    console.log('opa')
  }

  useEffect(() => {
    if(!window.Twitch) return
    playSong(video.id)
    // window.player.play()
  }, [video])

    return(
        <div className="video h-full">
            <Script 
                src="https://embed.twitch.tv/embed/v1.js" 
                onReady={() => {
                    if(!window.Twitch) return
                    playerRef.current = new window.Twitch.Player("twitch-embed", {
                    width: 800,
                    height: 800,
                    video: video.id,
                    parent: ['localhost']
                })
                }}
                />
                <div id="twitch-embed"></div>
          <button onClick={pause}>PAUSE</button>  
        </div>

    )
}