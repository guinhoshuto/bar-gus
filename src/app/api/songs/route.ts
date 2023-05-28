import { NextResponse } from "next/server";
import { list } from "../../../../list";
import axios from 'axios'

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

interface Video {
    id:             string;
    stream_id:      string;
    user_id:        string;
    user_login:     string;
    user_name:      string;
    title:          string;
    description:    string;
    created_at:     string;
    published_at:   string;
    url:            string;
    thumbnail_url:  string;
    viewable:       string;
    view_count:     number;
    language:       string;
    type:           string;
    duration:       string;
    muted_segments: null;
}

export async function GET(request: Request){
    const playlist: Playlist[] = []
    list.forEach(videoId => baseUrl += `id=${videoId}&`)
    baseUrl.slice(0, -1)
    console.log(baseUrl, options)
    const videos = await (await fetch(baseUrl, options)).json()
    console.log(videos)

    videos.data.forEach((video: Video) => playlist.push({
        title: video.title,
        url: video.url,
        duration: video.duration,
        created_at: video.created_at,
    }))

    return NextResponse.json({data: playlist})
}