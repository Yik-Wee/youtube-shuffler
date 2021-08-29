import { VideoType } from './Playlist';
import Playlist from './Playlist';

// TODO this has more stuff just add it
interface PlaylistData {
    nextPageToken?: string;
    items?: Item[];
    error?: {
        code: number;
    }
}

// TODO this too i think
interface Item extends Array<object> {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}

interface Snippet {
    resourceId: {
        videoId: string;
    };
    thumbnails: {
        default: Thumbnail,
        medium: Thumbnail
        high: Thumbnail
    };
    title: string;
    videoOwnerChannelTitle: string;
    channelTitle: string;
}

interface Thumbnail {
    url: string,
    width: number,
    height: number
}

// ? HTTP request to get playlist items, converts to object and returns it
async function getPage(url: string, pageToken: string | undefined) {
    var retData: PlaylistData | undefined = undefined;
    if (pageToken) url += `&pageToken=${pageToken}`;

    await fetch(url, { method: 'GET' })
        .then(res => {
            return res.json();
        })
        .then(data => {
            retData = data;
        })
        .catch(err => console.log(err));

    return retData;
}

// TODO get rid of any type pls
async function getPlaylist(playlistID: string) {
    const apiKey = process.env.REACT_APP_API_KEY;
    var videos: VideoType[] = [];
    let nextPageToken: string | undefined = '';
    const url: string = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5000&playlistId=${playlistID}&key=${apiKey}`;

    do {
        const data: any = await getPage(url, nextPageToken);

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

export default getPlaylist;