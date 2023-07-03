"use client"

import { useRef } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Video } from '../../utils/types'
import Playlist from '@/components/playlist'
// import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import { TwitchEmbed } from 'react-twitch-embed'


const inter = Inter({ subsets: ['latin'] })

export default function Home(props: any) {
  const [playlist, setPlaylist] = useState<Video[]>([])
  const [nowPlaying, setNowPlaying] = useState<Video>({
    id: '1588392326',
    title: '',
    duration: '',
    timestamp: '0h0m00s'
  })

  async function getSongs(){
    const res = await fetch('/api/songs')
    const json = await res.json()
    setPlaylist(json.data)
    // setNowPlaying(playlist[0])
  }

  let player: any

  function playSong(id: string){
    console.log('id',id)
    if(!window.Twitch) return
    player = new window.Twitch.Player("twitch-embed", {
    width: 800,
    height: 800,
    video: nowPlaying.id,
    parent: ['localhost']
    });
  }

  function pause(){
    player.pause()
  }


  function nextSong(){
    console.log('opa')
  }

  useEffect(() => {
    playSong('aaa')
    // if(!window.Twitch) return
    // window.player.play()
  }, [nowPlaying])

  useEffect(() => {
    getSongs()
  }, [])


  return (
    <main className='flex h-screen w-full p-4'>
      <div className="player w-[65%] h-full">
        <div className="video h-full">
          <Script 
            src="https://embed.twitch.tv/embed/v1.js" 
            // onReady={() => {
            //     if(!window.Twitch) return
            //     window.player = new Twitch.Embed("twitch-embed", {
            //     width: 800,
            //     height: 800,
            //     video: nowPlaying.id,
            //     parent: ['localhost']
            //   })
            // }}
            />
            <div id="twitch-embed"></div>
            {/* <button onClick={() => embedRef.pause()}>pause</button> */}
          {/* <TwitchEmbed 
            onEnded={nextSong} 
            width="100%"
            height="100%"
            time={nowPlaying.timestamp}
            video={nowPlaying.id}
            hideControls
            // collection={{
            //   video: nowPlaying.id, 
            //   collection: "wFaDfmriExdmVA"
            // }}
            /> */}
          {/* <iframe 
            src={`https://player.twitch.tv/?video=${nowPlaying.id}&parent=localhost`} 
            height='100%'
            width='100%'
            allowFullScreen
          ></iframe> */}
        </div>
      </div>
      <div className='w-[35%]'>
          <Playlist playlist={playlist} playSong={setNowPlaying}/>
          <button onClick={pause}>PAUSE</button>  
      </div>
    </main>  
  )
}

// export const getServerSideProps = async () => {
//   const res = await fetch('@/api/songs');
//   console.log(res)
//   // const songs = await resson();
//   // console.log(songs)
//   return { props: { res } };
// };
