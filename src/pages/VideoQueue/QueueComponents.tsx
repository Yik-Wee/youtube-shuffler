import { ShuffleRounded } from "@material-ui/icons";
import { useState } from "react";
import { store } from "../../components/globalStateHandler";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useClasses = (darkMode: boolean) => {
    const useStyles = makeStyles({
        body: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        video: {
            padding: '1rem',
            transition: 'background-color 200ms ease-in-out',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: darkMode ? '#666666' : 'whitesmoke'
            }
        }
    });
    return useStyles();
}


interface PlaylistBodyProps {
    darkMode: boolean;
}

const PlaylistBody: React.FC<PlaylistBodyProps> = ({ darkMode }) => {
    const classes = useClasses(darkMode);
    const [showAll, setShowAll] = useState(false);
    const [renders, rerender] = useState(0);

    return (
        <>
            <Button onClick={() => setShowAll(!showAll)}>
                {showAll ? "LOAD LESS" : "LOAD ALL"}
            </Button>
            <Button onClick={() => {
                store.state.playlist.shuffle();
                rerender(renders + 1);
            }}>
                <ShuffleRounded />
            </Button>
            <div className={classes.body}>
                {store.state.playlist.toVideoCards(classes.video, showAll)}
            </div>
        </>
    )
}

export { PlaylistBody }