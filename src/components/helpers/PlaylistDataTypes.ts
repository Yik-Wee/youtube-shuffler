// TODO this has more stuff just add it
export interface PlaylistData {
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
