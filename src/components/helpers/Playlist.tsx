import { VideoCard } from '../../pages/VideoQueue/QueueComponents';
import { player } from './PlayerAPI';

interface VideoType {
    id: string;
    title: string;
    channel: string;
    thumbnail: string;
}

const defaultVideo = { id: '', title: '', channel: '', thumbnail: '' };

class Playlist {
    private videos: VideoType[];
    private curIdx: number;
    public length: number;
    public paused: boolean;
    channel: string;
    title: string;
    thumbnail: string;
    id: string;

    constructor(videos: VideoType[] = [defaultVideo], channel='', title='', thumbnail='', id='') {
        this.videos = videos;
        this.length = videos.length;
        this.curIdx = 0;
        this.paused = true;

        this.channel = channel;
        this.title = title;
        this.thumbnail = thumbnail;
        this.id = id;
    }

    isEmpty() {
        return this.videos[0] === defaultVideo;
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

        for (let i = 0; i < this.length; i++) {
            ids.push(this.videos[i][type]);
        }

        return ids;
    }

    currentVideo() {
        return this.videos[this.curIdx];
    }

    playNext() {
        if (this.curIdx + 1 >= this.length) {
            return console.log("Last video reached");
        }

        this.curIdx++;
        this.load(this.currentVideo().id);
        this.play();
    }

    playPrev() {
        if (this.curIdx - 1 < 0) {
            return console.log("First video reached");
        }

        this.curIdx--;
        this.load(this.currentVideo().id);
        this.play();
    }

    load(videoID: string) {
        const idx = this.getData('id').indexOf(videoID);
        
        if (idx === -1) {
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
        const videoTitle: HTMLElement | null = document.getElementById("video-title");
        const videoChannel: HTMLElement | null = document.getElementById("video-channel");

        const curVideo: VideoType = this.currentVideo();
        const title: string = curVideo?.title;
        const channel: string = curVideo?.channel;

        if (videoTitle && videoChannel && title && channel) {
            videoChannel.textContent = channel;
            videoTitle.textContent = title;
            document.title = `${title} · ${channel}`;
        }

        player.playVideo();
    }

    toVideoCards(className: string | undefined, showAll: boolean) {
        return this.videos.slice(0, showAll ? undefined : 50)
            .map((video: VideoType) => {
                return <VideoCard 
                    key={video.id}
                    video={video}
                    className={className}
                    playlist={this} 
                />
            })
    }
}

export default Playlist;
export type { VideoType };