import { Paper, Typography } from "@material-ui/core"
import { ClassNameMap } from "@material-ui/core/styles/withStyles"

interface PlaylistBodyProps {
    title: string;
    videos: JSX.Element[];
    classes: ClassNameMap<string>;
}

const PlaylistBody: React.FC<PlaylistBodyProps> = ({ title, videos, classes }) => {
    return (
        <Paper className={classes.body}>
            <Typography variant="overline">{ title }</Typography>
            { videos }
        </Paper>
    )
}

export default PlaylistBody;