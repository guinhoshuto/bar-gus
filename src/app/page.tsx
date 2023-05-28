"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

async function getSongs(){
  return await fetch('/api/songs')
}

export default function Home(props: any) {
  useEffect(() => {
    fetch('/api/songs').then(r => {
      r.json().then(a => {
        console.log(a)
      })
    });

  }, [])

  return (
    <main>
      <div className="player">
        <div className="video"></div>
      </div>
      <div className="songs">
        <div className="search"></div>
        <div className="list">

        </div>
      </div>
      
    </main>  
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('@/api/songs');
  console.log(res)
  // const songs = await resson();
  // console.log(songs)
  return { props: { res } };
};
