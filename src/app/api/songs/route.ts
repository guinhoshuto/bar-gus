import { NextResponse } from "next/server";
import { list } from "../../../../list";
import axios from 'axios'
import { Video } from "../../../../utils/types";

let baseUrl = 'https://api.twitch.tv/helix/videos?'
let options = {
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

async function auth(): Promise<string> {
    const token = await axios.post('https://id.twitch.tv/oauth2/token', {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_SECRET,
        grant_type: 'client_credentials',
    });
    return token.data.access_token;
}

export async function GET(request: Request){
    const token = await auth();
    options.headers.Authorization = `Bearer ${token}`;

    // const playlist: Playlist[] = []
    list.forEach(videoId => baseUrl += `id=${videoId}&`)
    baseUrl.slice(0, -1)
    console.log(baseUrl, options)
    const videos = await (await fetch(baseUrl, options)).json()

    // videos.data.forEach((video: Video) => playlist.push({
    //     title: video.title,
    //     url: video.url,
    //     duration: video.duration,
    //     created_at: video.created_at,
    // }))
    return NextResponse.json({data: videos.data})
}