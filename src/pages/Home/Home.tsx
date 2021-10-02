import { Paper, Typography } from '@material-ui/core';
import { useEffect, useState } from "react";
import getRecentsCards from "./RecentPlaylists";

interface HomeProps {
    darkMode: boolean;
}

interface State {
    loading: boolean;
    recentsCards: undefined | any[];
}

const Home: React.FC<HomeProps> = ({ darkMode }) => {
    const recents = localStorage.getItem('recents');
    let recentIds = recents ? recents.split(',') : null;

    const [state, setState]: [State, Function] = useState({
        loading: true,
        recentsCards: [],
    })
    
    // get and display recent playlists
    useEffect(() => {
        if (!state.loading)
            return  // done handling requests

        async function handleIds() {
            if (!recentIds)  // blank id
                return setState({ loading: false, recentsCards: undefined })
            
            const cards = await getRecentsCards(recentIds, darkMode);
            setState({ loading: false, recentsCards: cards });
        }

        handleIds();
    }, [recentIds, state.loading, darkMode]);

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