export interface PlaylistData {
    etag?: string;
    items?: Item[];
    kind?: string;
    pageInfo?: {
        resultsPerPage: number;
        totalResults: number;
    }
    nextPageToken?: string;
    error?: {
        code: number;
    }
}

interface Item {
    etag: string;
    id: string;
    kind: string;
    snippet: Snippet;
}

interface Snippet {
    channelId: string;
    channelTitle: string;
    description: string;
    playlistId: string;
    position: number;
    publishedAt: string;
    resourceId: ResourceId;
    thumbnails?: Thumbnails;
    title: string;
    videoOwnerChannelId: string;
    videoOwnerChannelTitle: string;
}

interface ResourceId {
    kind: string;
    videoId: string;
}

interface Thumbnails {
    default?: Thumbnail;
    high?: Thumbnail;
    maxres?: Thumbnail;
    medium?: Thumbnail;
    standard?: Thumbnail;
}

interface Thumbnail {
    height: number
    width: number,
    url: string,
}
