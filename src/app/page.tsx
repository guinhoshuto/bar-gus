'use client'

import Script from 'next/script'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Video } from '../../utils/types'
import Playlist from '@/components/playlist'
import Player from '@/components/player'


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
    const res = await fetch('api/songs')
    const json = await res.json()
    setPlaylist(json.data)
    // setNowPlaying(playlist[0])
  }


  useEffect(() => {
    getSongs()
  }, [])


  return (
    <main className='flex h-screen w-full p-4'>
      <div className="player w-[65%] h-full">
        <Player video={nowPlaying} />
      </div>
      <div className='w-[35%]'>
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
