import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '15vh',
    },
})

const Mix: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper style={{ padding: '1rem' }}>
                <Typography variant="h2">Mix</Typography>
            </Paper>
        </div>
    );
}

export default Mix;