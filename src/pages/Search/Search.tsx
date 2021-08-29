import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import getPlaylist from '../../components/helpers/GetPlaylist';
import { useLocation } from "react-router-dom";
import Playlist from '../../components/helpers/Playlist';
import { setCurPlaylist, getCurPlaylist } from '../../components/globals/index';
import { ShuffleRounded } from '@material-ui/icons';
import PlaylistBody from './PlaylistBody';
import { toQuery } from './QueryHandler';
import { addVideos } from './AddVideos';

interface SearchProps { 
    darkMode: boolean;
    defaultPlaylist?: Playlist;
}

const Search: React.FC<SearchProps> = ({ darkMode }) => {
    const useStyles = makeStyles({
        root: {
            paddingTop: '15vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingBottom: '5rem'
        },
        title: {
            marginBottom: '2vh',
            padding: '1rem',
        },
        body: {
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
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
    const classes = useStyles();
    const defaultPlaylist = new Playlist([{id: '', title: '', channel: '', thumbnail: ''}]);

    const [playlist, setPlaylist] = useState(defaultPlaylist);
    const [isValid, setIsValid] = useState(false);

    if (playlist !== getCurPlaylist()) setCurPlaylist(playlist);

    const playlistId: string = toQuery(useLocation().search);  // get search query
    var jsxVideos: JSX.Element[] = [];
    // var loading = true;

    useEffect(() => {
        (async () => {
            try {
                setPlaylist(await getPlaylist(playlistId));
                setIsValid(true);
            } catch (err) {
                setPlaylist(defaultPlaylist);
                setIsValid(false);
            }
        })();
    // eslint-disable-next-line
    }, [playlistId]);

    addVideos(jsxVideos, playlist, classes.video);

    return (
        <div className={classes.root}>
            <Paper className={classes.title}>
                <Typography variant="h2">
                    { isValid ? "Title of playlist" : "Invalid Playlist ID" }
                </Typography>
                <Button onClick={() => { getCurPlaylist().shuffle(); }}>
                    <ShuffleRounded />
                </Button>
                { isValid ? null : <Typography variant="overline">Try searching for another playlist ID</Typography> }
            </Paper>
            { isValid ? <PlaylistBody title="TITLE" videos={jsxVideos} classes={classes} /> : null }
        </div>
    )
}

export default Search;
