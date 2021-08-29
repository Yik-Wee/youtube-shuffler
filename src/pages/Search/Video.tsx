import { Grid, Paper, Typography } from "@material-ui/core";
import { getCurPlaylist } from "../../components/globals";
import { VideoType } from "../../components/helpers/Playlist";

interface VideoProps {
    video: VideoType;
    className: string | undefined;
}

function onVideoClick(videoID: string, videoTitle: string = '') {
    console.log(`Video ID: ${videoID}\nVideo Title: ${videoTitle}`);
    getCurPlaylist().load(videoID);
    getCurPlaylist().play();
}

const Video: React.FC<VideoProps> = ({ video, className }) => {
    const { id, title, channel, thumbnail } = video;
    console.log(id, title, channel, thumbnail);
    return (
        <Paper className={className} onClick={() => onVideoClick(id, title)}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
            >
                <Grid item xs={2}>
                    <img src={thumbnail} alt={`${title} by ${channel}`} width='100rem' height='60rem' />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="overline">{title}</Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="overline">{channel}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Video;