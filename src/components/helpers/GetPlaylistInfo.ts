import { VideoType } from './Playlist';
import Playlist from './Playlist';
import { PlaylistData } from './PlaylistDataTypes';

/**
 * Gets the main info of the playlist - owner of playlist (channel), title and thumbnail - from its id
 * @param id ID of playlist to fetch
 * @returns string[] of [channel, title, thumbnail] of playlist
 */
async function getPlaylistMainInfo(id: string) {
    console.log('fetching main playlist info', id);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${API_KEY}`;

    const res = await fetch(url, { method: 'GET' });
    if (!res.ok)
        throw new Error('Error fetching Playlist channel, title & thumbnail');

    const data = await res.json();
    const channel = data.items[0].snippet.channelTitle;
    const title = data.items[0].snippet.localized.title;

    const thumbnails = data.items[0].snippet.thumbnails;
    const resolution = thumbnails.medium || thumbnails.default || thumbnails.standard || thumbnails.high || thumbnails.maxres || { url: null };
    const thumbnail = resolution.url;

    return [channel, title, thumbnail];
}


/**
 * HTTP request to get playlist items, converts to object and returns it
 * @param url url to fetch
 * @param pageToken Token for specific page of playlist
 * @returns YouTube PlaylistItems response `PlaylistData` object
 */
async function getPageVideos(url: string, pageToken: string | undefined) {
    console.log('fetching page videos');
    if (pageToken)
        url += `&pageToken=${pageToken}`;

    const res = await fetch(url, { method: 'GET' });
    if (!res.ok)
        throw new Error('Error fetching page');

    const data: PlaylistData | undefined = await res.json();
    return data;
}


/**
 * get videos of playlist from its id
 * @param id ID of playlist
 * @returns array of videos, each video containing id, channel, title and thumbnail
 */
async function getPlaylistVideos(id: string) {
    console.log('fetching playlist videos', id)
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5000&playlistId=${id}&key=${API_KEY}`;

    let videos: VideoType[] = [];
    let nextPageToken: string | undefined = '';

    const loadingBar: HTMLElement | null = document.getElementById('loading-bar');
    let bar = ''

    do {
        // increment loading bar
        bar += '▨';
        loadingBar!.textContent = bar + '▢';

        const data: PlaylistData | undefined = await getPageVideos(url, nextPageToken);

        // validate
        if (!data)
            throw new Error('INVALID PLAYLIST ID');

        if (data.error)
            throw new Error('MAX API CALLS REACHED');

        if (!data.items)
            throw new Error('NO ITEMS FOUND');

        nextPageToken = data.nextPageToken;

        data.items.forEach((item: any) => {  // add each video data to videos
            const titleUpper: string = item.snippet.title.toUpperCase();
            if (titleUpper === 'PRIVATE VIDEO' || titleUpper === 'DELETED VIDEO')
                return;  // skip deleted or private videos

            // get thumbnail, default to null if no thumbnail
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
}


/**
 * get the youtube playlist from its id
 * @param id playlist ID
 * @returns new Playlist object with videos, channel, title, thumbnail and id of playlist
 */
async function getPlaylist(id: string) {
    console.log('fetching playlist', id)
    const [channel, title, thumbnail] = await getPlaylistMainInfo(id);
    const videos = await getPlaylistVideos(id);
    return new Playlist(videos, channel, title, thumbnail, id);
}

export default getPlaylistVideos;
export { getPlaylistMainInfo, getPlaylist }