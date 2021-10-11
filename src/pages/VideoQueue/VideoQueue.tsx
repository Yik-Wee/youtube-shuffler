import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import { store } from "../../components/globalStateHandler";
import { getPlaylist } from "../../components/helpers/GetPlaylistInfo";
import { PlaylistBody } from "./QueueComponents";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '35vh',
    },
    body: {
        padding: '1rem',
    },
});

interface VideoQueueProps {
    darkMode: boolean;
}

function addToRecents(id: string) {
    const recents: string | null = localStorage.getItem('recents');
    const maxLength = 5;

    if (!recents)
        return localStorage.setItem('recents', `${id}`);

    let recentIds = recents.split(',')

    if (recentIds.includes(id))
        return

    if (recentIds.length > maxLength)
        recentIds = recentIds.slice(0, maxLength);

    localStorage.setItem('recents', `${id},${recentIds.join(',')}`);
}

const VideoQueue: React.FC<VideoQueueProps> = ({ darkMode }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function handleId() {
            if (store.state.id === store.state.playlist.id || !store.state.id)
                return setLoading(false);

            try {
                store.setState({ ...store.state, playlist: await getPlaylist(store.state.id) });
                addToRecents(store.state.id);
            }
            catch (err) {
                console.warn(err);
            }

            setLoading(false);
        }

        handleId();
    });

    const noPlaylist = store.state.playlist.isEmpty();

    return (
        <div className={classes.root}>
            <Paper className={classes.body}>
                <Typography variant="h3" style={{ overflowX: 'scroll' }}>Queue</Typography>
                {loading ? <LoadingBar /> : (
                    noPlaylist ?
                        <Typography variant="overline">
                            No playlist yet! Search for a playlist to get started!
                        </Typography> :
                        <HeaderWithBody darkMode={darkMode} />
                )
                }
            </Paper>
        </div>
    );
}

const LoadingBar: React.FC = () => {
    return (
        <>
            <div id="loading-bar" style={{ overflowX: 'scroll' }}>▢</div>
            <Typography variant="overline">Loading...</Typography>
        </>
    )
}

const HeaderWithBody: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <>
            <Typography variant="h4" style={{ overflowX: 'scroll' }}>
                {store.state.playlist.channel} ・ {store.state.playlist.title}
            </Typography>
            <PlaylistBody darkMode={darkMode} />
        </>
    )
}

export default VideoQueue;