import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getPlaylistTitle } from "../../components/helpers/GetPlaylistInfo";
import { toQuery } from "./QueryHandler";

const useStyles = makeStyles({
    root: {
        position: "relative",
        top: "25vh"
    }
});

const PlaylistCard: React.FC = () => {
    const classes = useStyles();
    const playlistId: string = toQuery(useLocation().search);  // get search query

    const [info, setInfo] = useState({
        channel: "",
        title: "",
        thumbnail: "",
        valid: true
    });

    useEffect(() => {
        (async () => {
            try {
                const [channel, title, thumbnail] = await getPlaylistTitle(playlistId);

                setInfo({
                    channel: channel,
                    title: title,
                    thumbnail: thumbnail,
                    valid: true
                });
            }
            catch (err) { 
                setInfo({
                    channel: "",
                    title: "",
                    thumbnail: "",
                    valid: false
                });
            }
        })();
    }, [playlistId]);

    return (
        <Paper className={classes.root} onClick={() => {
            useHistory().push("/queue");
        }}>
            {info.channel}
            {info.thumbnail}
            {info.title}
            {info.valid}
        </Paper>
    )
}

export default PlaylistCard