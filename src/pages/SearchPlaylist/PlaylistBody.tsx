import { Paper, Typography } from "@material-ui/core"
import { ClassNameMap } from "@material-ui/core/styles/withStyles"

interface PlaylistBodyProps {
    videos: JSX.Element[];
    className: string | undefined;
}

const PlaylistBody: React.FC<PlaylistBodyProps> = ({ videos, className }) => {
    return (
        <Paper className={className}>
            { videos }
        </Paper>
    )
}

export default PlaylistBody;