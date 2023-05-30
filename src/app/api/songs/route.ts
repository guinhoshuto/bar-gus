import { NextResponse } from "next/server";
import { list } from "../../../../list";
import axios from 'axios'
import { Video } from "../../../../utils/types";

let baseUrl = 'https://api.twitch.tv/helix/videos?'
const options = {
    "headers": {
        "Authorization": `${process.env.TWITCH_TOKEN}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID!
    }
}

interface Playlist {
    title: string
    url: string
    duration: string
    created_at: string
}

export async function GET(request: Request){
    // const playlist: Playlist[] = []
    list.forEach(videoId => baseUrl += `id=${videoId}&`)
    baseUrl.slice(0, -1)
    console.log(baseUrl, options)
    const videos = await (await fetch(baseUrl, options)).json()
    console.log(videos)

    // videos.data.forEach((video: Video) => playlist.push({
    //     title: video.title,
    //     url: video.url,
    //     duration: video.duration,
    //     created_at: video.created_at,
    // }))

    return NextResponse.json({data: videos.data})
}