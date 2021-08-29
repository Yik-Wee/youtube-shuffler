import Playlist from "../helpers/Playlist";

export const Global = {
    curPlaylist: new Playlist([{id: '', title: '', channel: '', thumbnail: ''}])
}

export function setCurPlaylist(pl: Playlist) {
    Global.curPlaylist = pl;
}

export function getCurPlaylist() {
    return Global.curPlaylist;
}