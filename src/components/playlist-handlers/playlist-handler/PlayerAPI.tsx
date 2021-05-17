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

var player: any;

window.onYouTubeIframeAPIReady = () => {
  player = new window.YT.Player('player', {
    events: {
      'onStateChange': onPlayerStateChange,
      'onReady': onPlayerReady,
      'onError': onPlayerError
    }
  });
  console.log(player);
};

function onPlayerReady(event: any) {
  console.log('ready');
  event.target.playVideo();
}

function onPlayerError(err: any) {
  console.log('ERROR', err);
}

function onPlayerStateChange(event: any) {
  if (event.data === 0) { // play next video
    // ! playNext();
    // ! console.log('CURRENT INDEX:', playerData.curIndex);
    console.log('ended');
  }
}

export { player };