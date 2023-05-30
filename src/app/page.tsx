"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Video } from '../../utils/types'
import Playlist from '@/components/playlist'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'


const inter = Inter({ subsets: ['latin'] })


export default function Home(props: any) {
  const [playlist, setPlaylist] = useState<Video[]>([])
  const [nowPlaying, setNowPlaying] = useState<Video>({
    id: '1588392326',
    timestamp: '0h0m00s'
  })

  async function getSongs(){
    const res = await fetch('/api/songs')
    const json = await res.json()
    setPlaylist(json.data)
    // setNowPlaying(playlist[0])
  }

  function playSong(id: string){
    console.log('id',id)
  }

  function pronto(){
    console.log('opa')
  }

  useEffect(() => {
    getSongs()
    console.log(playlist)
    console.log(nowPlaying)
  }, [])

  return (
    <main className='flex h-screen w-full p-4'>
      <div className="player w-[70%] h-full">
        <div className="video h-full">
          <ReactTwitchEmbedVideo 
            onReady={pronto} 
            width="640"
            height="360"
            time={nowPlaying.timestamp}
            video={nowPlaying.id}
            // collection={{
            //   video: nowPlaying.id, 
            //   collection: "wFaDfmriExdmVA"
            // }}
            />
          {/* <iframe 
            src={`https://player.twitch.tv/?video=${nowPlaying.id}&parent=localhost`} 
            height='100%'
            width='100%'
            allowFullScreen
          ></iframe> */}
        </div>
      </div>
      <div>
        <Playlist playlist={playlist} playSong={setNowPlaying}/>
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
