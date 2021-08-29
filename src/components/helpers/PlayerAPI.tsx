// import { playVideo } from './Controls';
import { getCurPlaylist } from '../globals/index';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: Function;
        YT: any;
    }
}

(() => {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag?.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

type IFrameEvent = {
    data: number;
    target: {
        playVideo: Function
    };
};

var player: any;

(() => {
    window.onYouTubeIframeAPIReady = () => {
        player = new window.YT.Player('player', {
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': onPlayerReady,
                'onError': onPlayerError
            }
        });
    };

    function onPlayerReady(event: IFrameEvent) {
        event.target.playVideo();
    }

    function onPlayerError(err: Error) {
        console.log('ERROR', err);
    }

    function onPlayerStateChange(event: IFrameEvent) {  // play next video when ended
        if (event.data === 0) getCurPlaylist().playNext();
    }
})();

export { player };