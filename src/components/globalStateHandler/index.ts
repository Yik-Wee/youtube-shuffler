import Playlist from "../helpers/Playlist";
import GlobalStore from "./GlobalStore";

type State = {
    /**
     * Current playlist being played
     */
    playlist: Playlist;

    /**
     * playlist ID that was searched
     */
    id: string;
}

interface Store extends GlobalStore {
    /**
     * The readonly state of Global Storage `store`
     */
    readonly _state: State;

    /**
     * Returns the immutable state of Global Storage `store`
     */
    state: State;

    /**
     * 
     * @param state the updated state of Global Storage `store`
     */
    setState(state: State): void;
}

export const store: Store = new GlobalStore({
    playlist: new Playlist(),
    id: ''
});