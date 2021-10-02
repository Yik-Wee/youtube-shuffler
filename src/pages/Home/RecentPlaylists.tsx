import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { YouTube } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { store } from "../../components/globalStateHandler";
import { getPlaylistMainInfo } from "../../components/helpers/GetPlaylistInfo";

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
}

const RecentPlaylistCard: React.FC<RPCProps> = ({ id, title, channel, thumbnail, darkMode }) => {
    const classes = useStyles(darkMode);
    const history = useHistory();

    return (
        <Paper className={classes.playlistCard}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={3}
                onClick={() => {
                    store.setState({ ...store.state, id: id });  // set current playlist to playlist clicked
                    history.push('/queue');  // go to queue
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

async function getRecentsCards(recentIds: string[], darkMode: boolean) {
    let cards: any[] = [];

    for (let i = 0; i < recentIds.length; i++) {
        const id = recentIds[i];
        try {
            const [channel, title, thumbnail] = await getPlaylistMainInfo(id);
            cards.push(
                <RecentPlaylistCard
                    darkMode={darkMode}
                    key={i}
                    id={id}
                    title={title}
                    channel={channel}
                    thumbnail={thumbnail}
                />
            );
        } catch (err) {
            console.warn(err);
        }
    }

    return cards;
}


export default getRecentsCards;