import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { getPlaylistMainInfo } from '../components/helpers/GetPlaylistInfo';
import { useHistory, useParams } from "react-router-dom";
import { YouTube } from '@material-ui/icons';
import { store } from '../components/globalStateHandler';

function useStyles(darkMode: boolean) {
    const styles = makeStyles({
        root: {
            padding: '1rem',
            transition: 'background-color 200ms ease-in-out',
            cursor: 'pointer',
            paddingTop: '35vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            '&:hover': {
                backgroundColor: darkMode ? '#666666' : 'whitesmoke'
            }
        },
        heading: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        info: {
            wordWrap: 'break-word',
        }
    });
    return styles();
}

interface SearchPlaylistProps {
    darkMode: boolean;
}

type Info = {
    channel: string;
    title: string;
    thumbnail: string | undefined;
    loading: boolean;
    error: any;
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ darkMode }) => {
    const classes = useStyles(darkMode);
    const history = useHistory();

    const params: { id: string } = useParams();
    const playlistId = params.id;

    const [info, setInfo]: [Info, Function] = useState({
        channel: '',
        title: '',
        thumbnail: undefined,
        loading: true,
        error: undefined,
    });

    useEffect(() => {
        async function handleSearchedId() {
            try {
                const [channel, title, thumbnail] = await getPlaylistMainInfo(playlistId);
                setInfo({ ...{ channel, title, thumbnail }, loading: false, error: undefined });
            }
            catch (err: any) {
                console.warn(err);
                setInfo({ channel: "", title: "", thumbnail: undefined, loading: false, error: err });
            }
        }

        handleSearchedId();
        // eslint-disable-next-line
    }, [playlistId]);

    return (
        <Paper
            className={classes.root}
            onClick={() => {
                if (info.loading || info.error)
                    return;  // click does nothing if theres an error or is still loading

                store.setState({ ...store.state, id: playlistId });
                history.push("/queue");
            }}
        >
            <div className={classes.heading}>
                <Typography variant="h3" className={classes.info} style={{ overflowX: 'scroll' }}>
                    {info.loading ? "loading..." : (
                        info.error ? "Couldn't find playlist!" : info.channel
                    )}
                </Typography>
                <Typography variant="h4" className={classes.info}>
                    {info.loading ? null : (
                        info.error ? "Make sure it's public/unlisted!" : info.title
                    )}
                </Typography>
                {info.error ? <Typography>(Or the API could have reached its daily limit)</Typography> : (
                    info.thumbnail ? <img alt="thumbnail" src={info.thumbnail} width="40%" /> : <YouTube fontSize="large" />
                )}
            </div>
        </Paper>
    )
}

export default SearchPlaylist;
