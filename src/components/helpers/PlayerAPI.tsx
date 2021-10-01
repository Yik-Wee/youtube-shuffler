import { store } from '../globalStateHandler/';

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

enum PlayerState {
    UNSTARTED = -1,
    ENDED,
    PLAYING,
    PAUSED,
    BUFFERING,
    VIDEO_CUED,
}


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
        console.log({ data: event.data });

        switch (event.data) {  //TODO
            case PlayerState.ENDED:
                store.state.playlist.playNext();
                break;
        
            case PlayerState.PLAYING:
                store.state.playlist.paused = false;
                // console.log(document.getElementById('play-pause'))
                // document.getElementById('play-pause')?.click();
                break;
            
            case PlayerState.PAUSED:
                store.state.playlist.paused = true;
                // console.log(document.getElementById('play-pause'))
                // document.getElementById('play-pause')?.click();
                break;

            default:
                break;
        }
    }
})();

export { player };