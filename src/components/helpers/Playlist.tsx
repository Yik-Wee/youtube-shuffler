// import { shuffle } from './Shuffle';
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
    isPaused: boolean;

    constructor(videos: VideoType[]) {
        this.videos = videos;
        this.size = videos.length;
        this.curIdx = 0;
        this.isPaused = true;
    }

    shuffle(videos: VideoType[] = this.videos) {  // TODO write shuffle code here instead save 1 file
        [this.videos[0], this.videos[this.curIdx]] = [this.videos[this.curIdx], this.videos[0]]  // make cur video first vid of playlist
        
        for (let i = 1; i < videos.length; i++) {  // shuffle
            let r: number = Math.floor(Math.random() * (videos.length - 2)) + 1;  // random number in array
            [videos[i], videos[r]] = [videos[r], videos[i]];  // swapping elements of array
        }

        this.curIdx = 0;
    }

    get allData() {
        var ids: string[] = [];
        var titles: string[] = [];
        var channels: string[] = [];
        var thumbnails: string[] = [];

        this.videos.forEach((vid: VideoType) => {
            ids.push(vid['id']);
            titles.push(vid['title']);
            channels.push(vid['channel']);
            thumbnails.push(vid['thumbnail']);
        })

        return [ids, titles, channels, thumbnails];
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
        if (idx === -1) return console.log('INVALID VIDEO ID');

        this.curIdx = idx;
        player.loadVideoById(videoID);
    }

    pause() {
        player.pauseVideo();
        document.title = 'YouTube Shuffler';
        this.isPaused = true;
    }

    play() {
        const nowPlaying = document.getElementById("now-playing");
        const curVideo = this.curVideo;
        const title = curVideo?.title;
        const channel = curVideo?.channel;

        if (nowPlaying && title) { 
            nowPlaying.textContent = `Now Playing: ${title} · ${channel}`;
            document.title = `${title} · ${channel}`;
        }

        player.playVideo();
        this.isPaused = false;
    }
}

export default Playlist;
export type { VideoType };