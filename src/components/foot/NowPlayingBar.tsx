import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { SkipNextRounded, SkipPreviousRounded } from '@material-ui/icons';
import { getCurPlaylist } from '../helpers/Playlist';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 2,
        top: '10vh',
        height: '25vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // padding: '1rem',
        alignItems: 'center'
    },
    nowPlaying: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',
        columnGap: '3ch',
        width: '100%'
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '3ch',
    }
});

const NowPlayingBar: React.FC = () => {
    const classes = useStyles();
    // const bgColor = darkMode ? "#181818" : "#8899A6";

    return (
        <div className={classes.root}>
            <Paper className={classes.item}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography id="video-channel" variant="h6" className={classes.nowPlaying}></Typography>
                    <Typography id="video-title" variant="h6" className={classes.nowPlaying}></Typography>
                    <Paper className={classes.button}>
                        <SkipPreviousRounded fontSize="large" onClick={() => getCurPlaylist().playPrev()} />
                        <SkipNextRounded fontSize="large" onClick={() => getCurPlaylist().playNext()} />
                    </Paper>
                </div>

                <iframe 
                    id="player" 
                    src="https://www.youtube.com/embed/?enablejsapi=1" 
                    style={{ position: 'relative', zIndex: 1, border: 0, width: "50%", height: "90%" }}
                ></iframe>
            </Paper>
        </div>
    );
}

export default NowPlayingBar;