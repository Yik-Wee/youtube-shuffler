import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { SkipNextRounded, SkipPreviousRounded } from '@material-ui/icons';
import { store } from './globalStateHandler';

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
        alignItems: 'center'
    },
    nowPlaying: {
        textAlignLast: 'right',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40vh',
        columnGap: '2ch',
        width: '100%'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '2ch',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '40%'
    },
    iframe: {
        position: 'relative',
        zIndex: 1,
        border: 0,
        width: "45%",
        height: "90%"
    }
});

const NowPlayingBar: React.FC = () => {
    const classes = useStyles();
    const defaultVideoID = localStorage.getItem('mostRecentVideo') || 'dQw4w9WgXcQ';
    console.log(document.domain);

    return (
        <div className={classes.root}>
            <Paper className={classes.body}>
                <div className={classes.item}>
                    <Typography id="video-channel" variant="h6" className={classes.nowPlaying}></Typography>
                    <Typography id="video-title" variant="h6" className={classes.nowPlaying}></Typography>
                    <Paper className={classes.buttonGroup}>
                        <PrevButton />
                        <div id="play-pause-button"></div>
                        <NextButton />
                    </Paper>
                </div>

                <iframe 
                    className={classes.iframe}
                    title="YouTube Player"
                    id="player"
                    src={`https://www.youtube.com/embed/${defaultVideoID}?enablejsapi=1&widgetid=1`}
                ></iframe>
            </Paper>
        </div>
    );
}

const PrevButton: React.FC = () => {
    return (
        <SkipPreviousRounded style={{ width: '2rem', height: '2rem' }} onClick={() => store.state.playlist.playPrev()} />
    )
}

const NextButton: React.FC = () => {
    return (
        <SkipNextRounded id="play-next" style={{ width: '2rem', height: '2rem' }} onClick={() => store.state.playlist.playNext()} />
    )
}

export default NowPlayingBar;