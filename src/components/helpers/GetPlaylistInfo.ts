import { VideoType } from './Playlist';
import Playlist from './Playlist';
import { PlaylistData } from './PlaylistDataTypes';

export async function getPlaylistTitle(id: string) {
    /* Returns [channel, title] of playlist with id of `id` */
    const API_KEY = process.env.REACT_APP_API_KEY;
    let channel: string = "";
    let title: string = "";
    let thumbnail: string = "";
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${API_KEY}`

    await fetch(url, { method: 'GET' })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("Error fetching Playlist title");
        })
        .then(data => {
            console.log(data);
            channel = data.items[0].snippet.channelTitle;
            title = data.items[0].snippet.localized.title;
            thumbnail = data.items[0].snippet.thumbnails.default.url;
        })
        .catch(_ => console.clear());

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
        .catch(_ => console.clear());

    return retData;
}

// TODO get rid of any type pls
export async function getPlaylistVideos(playlistID: string) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let videos: VideoType[] = [];
    let nextPageToken: string | undefined = '';
    const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5000&playlistId=${playlistID}&key=${API_KEY}`;

    do {
        const data: any = await getPageVideos(url, nextPageToken);

        const items = data.items;
        nextPageToken = data.nextPageToken;

        if (data.error || !items) throw new Error('INVALID PLAYLIST ID or MAX API CALLS REACHED');

        items.forEach((item: any) => {
            const spt = item.snippet;
            const thumbnail = spt.thumbnails.medium;

            videos.push({
                id: spt.resourceId.videoId,
                title: spt.title,
                channel: spt.videoOwnerChannelTitle,
                thumbnail: thumbnail ? thumbnail.url : null
            });
        });

    } while (nextPageToken !== undefined)

    return new Playlist(videos);
}

export default getPlaylistVideos;