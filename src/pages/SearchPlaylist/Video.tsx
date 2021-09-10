import { Grid, Paper } from "@material-ui/core";
import Playlist, { VideoType } from "../../components/helpers/Playlist";

interface VideoProps {
    video: VideoType;
    className: string | undefined;
    playlist: Playlist;
}

function onVideoClick(playlist: Playlist, videoID: string, videoTitle: string = '') {
    console.log(`Video ID: ${videoID}\nVideo Title: ${videoTitle}`);
    playlist.load(videoID);
    playlist.play();
}

const NoOverflowDiv: React.FC<{ text: string, width?: string }> = ({ text, width }) => {
    return (
        <div style={{ width: width || "auto", overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: 'nowrap', }}>
            { text }
        </div>
    )
}

const Video: React.FC<VideoProps> = ({ video, className, playlist }) => {
    const { id, title, channel, thumbnail } = video;
    
    return (
        <Paper className={className} onClick={() => onVideoClick(playlist, id, title)}>
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
                <Grid item xs={4}>
                    <NoOverflowDiv text={title} />
                </Grid>
                <Grid item xs={4}>
                    <NoOverflowDiv text={channel} />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Video;