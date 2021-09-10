import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { getPlaylistVideos, getPlaylistTitle } from '../../components/helpers/GetPlaylistInfo';
import { useLocation } from "react-router-dom";
import Playlist, { getCurPlaylist } from '../../components/helpers/Playlist';
import { ShuffleRounded, PlaylistAddRounded, PlaylistAddCheckRounded } from '@material-ui/icons';
import PlaylistBody from './PlaylistBody';
import { toQuery } from './QueryHandler';
import { addVideos } from './AddVideos';

interface SearchPlaylistProps { 
    darkMode: boolean;
    setCurPlaylist: Function;
}

function useClasses(darkMode: boolean) {
    const useStyles = makeStyles({
        root: {
            // position: 'relative',
            paddingTop: '35vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflowY: 'scroll'
        },
        title: {
            marginBottom: '2vh',
            padding: '1rem',
        },
        body: {
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // overflowY: 'scroll'
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

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ darkMode, setCurPlaylist }) => {
    const classes = useClasses(darkMode);
    const defPl = new Playlist();

    const [state, setState] = useState({
        playlist: getCurPlaylist(),
        heading: ""
    })

    const playlistId: string = toQuery(useLocation().search);  // get search query
    let videoCards: JSX.Element[] = [];

    useEffect(() => {
        (async () => {
            try {
                const p = await getPlaylistVideos(playlistId);                
                const [channel, title] = await getPlaylistTitle(playlistId);

                setCurPlaylist(p);
                setState({
                    playlist: p,
                    heading: `${title} ・ ${channel}`
                });
            }
            catch (err) {
                setState({
                    playlist: defPl,
                    heading: state.heading
                });
            }
        })();
    }, [playlistId]);

    addVideos(videoCards, state.playlist, classes.video);
    const isValid = !state.playlist.isEmpty();
    console.log("playlistId", playlistId);

    return (
        <div className={classes.root}>
            <Paper className={classes.title}>
                <Typography variant="h4">
                    { isValid ? state.heading : "Invalid Playlist ID" }
                </Typography>
                <Button onClick={() => { state.playlist.shuffle(); }}>
                    <ShuffleRounded />
                </Button>
                { isValid ? null : <Typography variant="overline">Try searching for another playlist ID</Typography> }
            </Paper>
            { isValid ? <PlaylistBody videos={videoCards} className={classes.body} /> : null }
        </div>
    )
}

export default SearchPlaylist;