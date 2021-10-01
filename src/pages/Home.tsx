import { Grid, makeStyles } from "@material-ui/core";
import { Paper, Typography } from '@material-ui/core';
import { YouTube } from "@material-ui/icons";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { store } from "../components/globalStateHandler";
import { getPlaylistMainInfo } from "../components/helpers/GetPlaylistInfo";

async function getRecentsCards(recentIds: string[], darkMode: boolean, setSearchedID: any) {
    let cards: any[] = [];

    for (let i = 0; i < recentIds.length; i++) {
        const id = recentIds[i];
        try {
            const [channel, title, thumbnail] = await getPlaylistMainInfo(id);
            cards.push(<RecentPlaylistCard setSearchedID={setSearchedID} darkMode={darkMode} key={i} id={id} title={title} channel={channel} thumbnail={thumbnail} />);
        } catch (err) {
            console.warn(err);
        }
    }

    return cards;
}

const useStyles = (darkMode: boolean) => {
    const styles = makeStyles({
        playlistCard: {
            padding: '1rem',
            transition: 'background-color 200ms ease-in-out',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: darkMode ? '#666666' : 'whitesmoke'
            }
        },
    })
    
    return styles();
}

interface RPCProps {
    id: string;
    title: string;
    channel: string;
    thumbnail: string | undefined;
    darkMode: boolean;
    setSearchedID(id: string): void;
}

const RecentPlaylistCard: React.FC<RPCProps> = ({ id, title, channel, thumbnail, darkMode, setSearchedID }) => {
    const classes = useStyles(darkMode);
    const history = useHistory();

    return (  // TODO
        <Paper className={classes.playlistCard}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
                onClick={() => {
                // set current playlist to playlist clicked
                setSearchedID(id);
                // go to queue
                history.push('/queue');
            }}>
                <Grid item xs={4}>
                    {thumbnail ? <img 
                        src={thumbnail} 
                        alt={`${title} by ${channel}`} 
                        width='50rem' 
                        height='30rem' 
                    /> : <YouTube fontSize="large" />}
                </Grid>
                <Grid item xs>
                    <Typography>{title}</Typography>
                    <Typography>{channel}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

interface HomeProps {
    darkMode: boolean;
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
    const recents = localStorage.getItem('recents');
    let recentIds = recents ? recents.split(',') : null;

    const [state, setState]: [{ loading: boolean, recentsCards: undefined | any[] }, Function] = useState({
        loading: true,
        recentsCards: [],
    })
    
    const setSearchedIDCallback = useCallback((id: string) => store.setState({ ...store.state, id: id }), [])

    // get and display recent playlists
    useEffect(() => {
        if (!state.loading)
            return  // done handling requests

        async function handleIds() {
            if (!recentIds)  // black id
                return setState({ loading: false, recentsCards: undefined })
            
            const cards = await getRecentsCards(recentIds, darkMode, setSearchedIDCallback);
            setState({ loading: false, recentsCards: cards });
        }

        handleIds();
    }, [recentIds, state.loading, darkMode, setSearchedIDCallback]);

    return (
        <div style={{
            paddingTop: '35vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <Paper style={{ padding: '1rem' }}>
                <Typography variant="h2" style={{ overflowX: 'scroll' }}>
                    {recentIds?.length ? 'Recently played' : 'Search for a playlist!'}
                </Typography>
                {state.loading ? <Typography>Loading...</Typography> : (
                    state.recentsCards ? state.recentsCards : <Typography>Search for a playlist to shuffle!</Typography>
                )}
            </Paper>
        </div>
    );
}

export default Home;