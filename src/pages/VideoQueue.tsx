import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '35vh',
    },
})

const VideoQueue: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper style={{ padding: '1rem' }}>
                <Typography variant="h2">VideoQueue</Typography>
            </Paper>
        </div>
    );
}

export default VideoQueue;