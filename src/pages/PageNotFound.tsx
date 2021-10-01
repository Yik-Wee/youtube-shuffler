import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '35vh',
    },
})

const PageNotFound: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper style={{ padding: '1rem' }}>
                <Typography variant="h2">Page Not Found</Typography>
                <Typography variant="overline">It looks like this page doesn't exist!</Typography>
            </Paper>
        </div>
    );
}

export default PageNotFound;