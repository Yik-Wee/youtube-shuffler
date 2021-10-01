import { ShuffleRounded } from "@material-ui/icons";
import { useState } from "react";
import { store } from "../../components/globalStateHandler";
import { Grid, Paper, Button } from "@material-ui/core";
import Playlist, { VideoType } from "../../components/helpers/Playlist";
import { makeStyles } from "@material-ui/styles";

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

interface VideoProps {
    video: VideoType;
    className: string | undefined;
    playlist: Playlist;
}

const VideoCard: React.FC<VideoProps> = ({ video, className, playlist }) => {
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



const useClasses = (darkMode: boolean) => {
    const useStyles = makeStyles({
        body: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        video: {
            padding: '1rem',
            transition: 'background-color 200ms ease-in-out',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: darkMode ? '#666666' : 'whitesmoke'
            }
        }
    });
    return useStyles();
}


interface PlaylistBodyProps {
    darkMode: boolean;
}

const PlaylistBody: React.FC<PlaylistBodyProps> = ({ darkMode }) => {
    const classes = useClasses(darkMode);
    const [showAll, setShowAll] = useState(false);
    const [renders, rerender] = useState(0);

    return (
        <>
            <Button onClick={() => setShowAll(!showAll)}>
                {showAll ? "LOAD LESS" : "LOAD ALL"}
            </Button>
            <Button onClick={() => {
                store.state.playlist.shuffle();
                rerender(renders + 1);
            }}>
                <ShuffleRounded />
            </Button>
            <div className={classes.body}>
                {store.state.playlist.toVideoCards(classes.video, showAll)}
            </div>
        </>
    )
}

export { PlaylistBody, VideoCard }