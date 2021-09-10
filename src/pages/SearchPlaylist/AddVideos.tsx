import { Button, Typography } from "@material-ui/core";
import Playlist from "../../components/helpers/Playlist";
import Video from "./Video";

function loadAll() {

}

const LoadAllButton: React.FC = () => {
    return (
        <Button onClick={() => {
            // TODO
        }}>
            <Typography></Typography>
        </Button>
    )
}

export function lazyLoadAddVideos(jsxVideos: JSX.Element[], playlist: Playlist, className: string | undefined, loadLimit: number) {
    for (let i = 0; i < loadLimit; i++) {
        jsxVideos.push(
            <Video 
                key={i}
                video={playlist.videos[i]}
                className={className}
                playlist={playlist}
            />
        );
    }

    jsxVideos.push(<LoadAllButton />);
}

export function addVideos(jsxVideos: JSX.Element[], playlist: Playlist, className: string | undefined) {
    for (let i = 0; i < playlist.size; i++) {
        jsxVideos.push(
            <Video 
                key={i}
                video={playlist.videos[i]}
                className={className}
                playlist={playlist}
            />
        );
    }
}