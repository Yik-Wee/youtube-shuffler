import Playlist from "../../components/helpers/Playlist";
import Video from "./Video";

export function addVideos(jsxVideos: JSX.Element[], playlist: Playlist, className: string | undefined) {
    for (let i = 0; i < playlist.size; i++) {
        jsxVideos.push(
            <Video 
                key={i}
                video={playlist.videos[i]}
                className={className}
            />
        );
    }
}