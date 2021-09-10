import { player } from './PlayerAPI';

interface VideoType {
    id: string;
    title: string;
    channel: string;
    thumbnail: string;
}

class Playlist {
    videos: VideoType[];
    curIdx: number;
    size: number;

    constructor(videos: VideoType[] = [{ id: '', title: '', channel: '', thumbnail: '' }]) {
        this.videos = videos;
        this.size = videos.length;
        this.curIdx = 0;
    }

    isEmpty() {
        return this.videos[0].id === '';
    }

    shuffle(videos: VideoType[] = this.videos) {
        [this.videos[0], this.videos[this.curIdx]] = [this.videos[this.curIdx], this.videos[0]]  // make cur video first vid of playlist
        
        for (let i = 1; i < videos.length; i++) {  // shuffle
            let r: number = Math.floor(Math.random() * (videos.length - 2)) + 1;  // random number in array
            [videos[i], videos[r]] = [videos[r], videos[i]];  // swapping elements of array
        }

        this.curIdx = 0;
    }

    getData(type: string) {
        /* type = "ID" | "TITLE" | "CHANNEL" | "THUMBNAIL" */
        type = type.toLowerCase();
        if (type !== 'id' && type !== 'title' && type !== 'channel' && type !== 'thumbnail') {
            throw new Error('Invalid type. ID or TITLE or CHANNEL or THUMBNAIL');
        }

        var ids: string[] = [];

        for (let i = 0; i < this.size; i++) {
            ids.push(this.videos[i][type]);
        }

        return ids;
    }

    get curVideo() {
        return this.videos[this.curIdx];
    }

    playNext() {
        if (this.curIdx + 1 >= this.size) {
            return console.log("Last video reached");
        }

        this.curIdx++;
        this.load(this.curVideo.id);
        this.play();
    }

    playPrev() {
        if (this.curIdx - 1 < 0) {
            return console.log("First video reached");
        }

        this.curIdx--;
        this.load(this.curVideo.id);
        this.play();
    }

    load(videoID: string) {
        const idx = this.getData('id').indexOf(videoID);
        
        if (idx === -1) {
            console.log(this.videos);
            console.log(videoID, "not in playlist");
            return;
        }

        this.curIdx = idx;
        player.loadVideoById(videoID);
    }

    pause() {
        player.pauseVideo();
        document.title = 'YouTube Shuffler';
    }

    play() {
        const videoTitle = document.getElementById("video-title");
        const videoChannel = document.getElementById("video-channel");

        const curVideo = this.curVideo;
        const title = curVideo?.title;
        const channel = curVideo?.channel;

        if (videoTitle && videoChannel && title && channel) { 
            videoChannel.textContent = channel
            videoTitle.textContent = title;
            document.title = `${title} · ${channel}`;
        }

        player.playVideo();
    }
}

const global = {
    curPlaylist: new Playlist()
}

function setCurPlaylist(pl: Playlist) {
    global.curPlaylist = pl;
}

function getCurPlaylist() {
    return global.curPlaylist;
}



// get allData() {
//     var ids: string[] = [];
//     var titles: string[] = [];
//     var channels: string[] = [];
//     var thumbnails: string[] = [];

//     this.videos.forEach((vid: VideoType) => {
//         ids.push(vid['id']);
//         titles.push(vid['title']);
//         channels.push(vid['channel']);
//         thumbnails.push(vid['thumbnail']);
//     })

//     return [ids, titles, channels, thumbnails];
// }

export default Playlist;
export type { VideoType };
export { setCurPlaylist, getCurPlaylist };