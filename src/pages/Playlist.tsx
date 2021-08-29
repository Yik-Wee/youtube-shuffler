import { makeStyles } from "@material-ui/core";
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '15vh',
    },
})

const Playlist: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper style={{ padding: '1rem' }}>
                <Typography variant="h2">Playlists</Typography>
            </Paper>
        </div>
    );
}

export default Playlist;