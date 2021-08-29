import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { PauseCircleFilledRounded, PlayCircleFilledRounded, SkipNextRounded, SkipPreviousRounded } from '@material-ui/icons';
import { setCurPlaylist, getCurPlaylist } from '../globals';
// import { useState } from 'react';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: '0',
        height: '5rem',
        width: '100%',
        justifyContent: 'center',
        padding: '1rem',
        // backgroundColor: '#181818'
    },
    nowPlaying: {
        width: '25vw',
        height: '75%',
        wordWrap: 'break-word',
        // overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

interface NowPlayingBarProps {
    darkMode: boolean
}

const NowPlayingBar: React.FC<NowPlayingBarProps> = ({ darkMode }) => {
    const classes = useStyles();
    const bgColor = darkMode ? "#181818" : "#8899A6";
    // const [circle, setCircle] = useState(<PlayCircleFilledRounded />);
    // TODO setstate for isPaused - onClick change PauseCircle to PlayCircle and vice verse

    return (
        <div className={classes.root} style={{ backgroundColor: bgColor }}>
            <Grid style={{ justifyContent: 'left' }} container>
                <Grid item xs>
                    <div id="now-playing" className={classes.nowPlaying}></div>
                    {/* <Typography id="now-playing" className={classes.nowPlaying} variant="overline"> */}
                    {/* </Typography> */}
                </Grid>
                <Grid style={{ justifyContent: 'center', position: 'fixed' }} container spacing={3}>
                    <Grid item xs={1}>
                        <SkipPreviousRounded fontSize="large" onClick={() => getCurPlaylist().playPrev()} />
                    </Grid>
                    <Grid item xs={1}>
                        <PauseCircleFilledRounded fontSize="large" onClick={() => {
                            getCurPlaylist().isPaused ? getCurPlaylist().play() : getCurPlaylist().pause();
                        }}/>
                        {/* {
                        Global.curPlaylist.isPaused ? 
                        <PlayCircleFilledRounded fontSize="large" onClick={() => Global.curPlaylist.play()}/> : 
                        <PauseCircleFilledRounded fontSize="large" onClick={() => Global.curPlaylist.pause()} />
                        } */}
                    </Grid>
                    <Grid item xs={1}>
                        <SkipNextRounded fontSize="large" onClick={() => getCurPlaylist().playNext()} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default NowPlayingBar;