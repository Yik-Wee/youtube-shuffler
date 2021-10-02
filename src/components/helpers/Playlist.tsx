import { Grid, Paper, Typography } from '@material-ui/core';
// import { VideoCard } from '../../pages/VideoQueue/QueueComponents';
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
    public channel: string;
    public title: string;
    public thumbnail: string;
    public id: string;

    constructor(videos: VideoType[] = [defaultVideo], channel = '', title = '', thumbnail = '', id = '') {
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
        return this.videos[0] === defaultVideo && this.videos.length === 1;
    }

    shuffle(videos: VideoType[] = this.videos) {
        [this.videos[0], this.videos[this.curIdx]] = [this.videos[this.curIdx], this.videos[0]]  // make cur video first vid of playlist

        for (let i = 1; i < videos.length; i++) {  // shuffle
            let r: number = Math.floor(Math.random() * (videos.length - 2)) + 1;  // random number in array
            [videos[i], videos[r]] = [videos[r], videos[i]];  // swapping elements of array
        }

        this.curIdx = 0;
    }

    currentVideo() {
        return this.videos[this.curIdx];
    }

    playNext() {
        if (this.curIdx + 1 >= this.length)
            return

        this.curIdx++;
        this.load(this.currentVideo().id);
        this.play();
    }

    playPrev() {
        if (this.curIdx - 1 < 0)
            return

        this.curIdx--;
        this.load(this.currentVideo().id);
        this.play();
    }

    load(videoID: string) {
        let idx = -1;

        // linear search to find index of video with id of `videoID`
        for (let i = 0; i < this.videos.length; i++) {
            const video = this.videos[i];
            if (video.id === videoID) {
                idx = i;
                break;
            }
        }

        if (idx === -1)  // video with id of `videoID` doesn't exist
            return
        
        const currentVideo = this.currentVideo();
        document.getElementById('video-channel')!.textContent = currentVideo.channel;
        document.getElementById('video-title')!.textContent = currentVideo.title;

        this.curIdx = idx;
        player.loadVideoById(videoID);
    }

    pause() {
        player.pauseVideo();
    }

    play() {
        player.playVideo();
    }

    toVideoCards(className: string | undefined, showAll: boolean) {
        return this.videos.slice(0, showAll ? undefined : 50)
            .map((video: VideoType) => 
                <VideoCard
                    key={video.id}
                    video={video}
                    className={className}
                    playlist={this}
                />
            )
    }
}

interface VideoProps {
    video: VideoType;
    className: string | undefined;
    playlist: Playlist;
}

const VideoCard: React.FC<VideoProps> = ({ video, className, playlist }) => {
    const { id, title, channel, thumbnail } = video;
    const onVideoClick = () => {
        playlist.load(id);
        playlist.play();
    }
    
    return (
        <Paper className={className} onClick={() => onVideoClick()}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
            >
                <Grid item xs={3}>
                    <img src={thumbnail} alt={`${title} by ${channel}`} width='50rem' height='30rem' />
                </Grid>
                <Grid item xs={9}>
                    <NoOverflowTypography text={title} />
                    <NoOverflowTypography text={channel} />
                </Grid>
            </Grid>
        </Paper>
    )
}

const NoOverflowTypography: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Typography style={{ overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', }}>
            {text}
        </Typography>
    )
}

export default Playlist;
export type { VideoType };
