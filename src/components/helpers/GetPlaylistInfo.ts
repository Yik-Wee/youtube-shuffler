import { VideoType } from './Playlist';
import Playlist from './Playlist';
import { PlaylistData } from './PlaylistDataTypes';

/**
 * 
 * @param id ID of playlist to fetch
 * @returns string[] of [channel, title, thumbnail] of playlist
 */
async function getPlaylistMainInfo(id: string) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let channel: string = "";
    let title: string = "";
    let thumbnail: string = "";
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${API_KEY}`

    await fetch(url, { method: 'GET' })
        .then(res => {
            if (!res.ok)
                throw new Error("Error fetching Playlist channel, title, thumbnail");
            
            return res.json();
        })
        .then(data => {
            channel = data.items[0].snippet.channelTitle;
            title = data.items[0].snippet.localized.title;

            const thumbnails = data.items[0].snippet.thumbnails
            const resolution = thumbnails.medium || thumbnails.default || thumbnails.standard || thumbnails.high || thumbnails.maxres || { url: null };
            thumbnail = resolution.url;
        })

    return [channel, title, thumbnail];
}

// ? HTTP request to get playlist items, converts to object and returns it
async function getPageVideos(url: string, pageToken: string | undefined) {
    let retData: PlaylistData | undefined = undefined;
    if (pageToken) url += `&pageToken=${pageToken}`;

    await fetch(url, { method: 'GET' })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("Error fetching page");
        })
        .then(data => {
            retData = data;
        })
        .catch(err => console.log(err));

    return retData;
}

async function getPlaylistVideos(playlistID: string) {
    console.log("getting playlist videos");
    
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5000&playlistId=${playlistID}&key=${API_KEY}`;
    
    let videos: VideoType[] = [];
    let nextPageToken: string | undefined = '';

    const loadingBar: HTMLElement | null = document.getElementById('loading-bar');
    let bar = ''

    do {
        // increment loading bar
        bar += '▨';
        if (loadingBar)
            loadingBar.textContent = bar + '▢';

        const data: any = await getPageVideos(url, nextPageToken);

        // validate
        if (!data)
            throw new Error('INVALID PLAYLIST ID');
        
        if (data?.error || !data.items)
            throw new Error('MAX API CALLS REACHED');

        nextPageToken = data.nextPageToken;

        data.items.forEach((item: any) => {  // add each video data to videos
            const titleUpper: string = item.snippet.title.toUpperCase();
            if (titleUpper === 'PRIVATE VIDEO' || titleUpper === 'DELETED VIDEO') return;
            
            const thumbnails = item.snippet.thumbnails;
            const resolution = thumbnails.medium || thumbnails.default || thumbnails.standard || thumbnails.high || thumbnails.maxres || { url: null };
            
            videos.push({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                channel: item.snippet.videoOwnerChannelTitle,
                thumbnail: resolution.url
            });
        });

    } while (nextPageToken !== undefined)

    return videos;
    // return new Playlist(videos);
}

async function getPlaylist(id: string) {
    const [channel, title, thumbnail] = await getPlaylistMainInfo(id);
    const videos = await getPlaylistVideos(id);
    return new Playlist(videos, channel, title, thumbnail, id);
}

export default getPlaylistVideos;
export { getPlaylistMainInfo, getPlaylistVideos, getPlaylist }