import { store } from '../globalStateHandler/';
import ReactDOM from 'react-dom';
import { PauseCircleOutlineRounded, PlayCircleOutlineRounded } from '@material-ui/icons';
import { PlayerEvent, Player, PlayerState } from './IPlayerAPI';

(() => {  // creating script tag for player api
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag?.parentNode) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

// initialise youtube player
var player: Player;

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

    // initialise player events
    function onPlayerReady(event: PlayerEvent) {
        event.target.playVideo();
    }

    function onPlayerError(event: PlayerEvent) {
        console.warn(event);
        store.state.playlist.playNext();
    }

    function onPlayerStateChange(event: PlayerEvent) {  // play next video when ended
        switch (event.data) {
            case PlayerState.ENDED:  // current video ended, play next video in playlist
                store.state.playlist.playNext();
                break;

            case PlayerState.PLAYING:
                store.state.playlist.paused = false;
                const currentVideo = store.state.playlist.currentVideo();
                
                if (currentVideo.title && currentVideo.channel)
                    document.title = `${currentVideo.title} · ${currentVideo.channel}`;

                if (currentVideo.id)
                    localStorage.setItem('mostRecentVideo', currentVideo.id);

                // change play button to pause button
                ReactDOM.render(
                    <PauseCircleOutlineRounded
                        id="pause"
                        style={{ width: '2rem', height: '2rem' }}
                        onClick={() => store.state.playlist.pause()}
                    />,
                    document.getElementById('play-pause-button')
                );
                break;

            case PlayerState.PAUSED:
                store.state.playlist.paused = true;
                document.title = 'YouTube Shuffler'

                // change pause button to play button
                ReactDOM.render(
                    <PlayCircleOutlineRounded
                        id="play"
                        style={{ width: '2rem', height: '2rem' }}
                        onClick={() => store.state.playlist.play()}
                    />,
                    document.getElementById('play-pause-button')
                );
                break;

            default:
                break;
        }
    }
})()

export { player };