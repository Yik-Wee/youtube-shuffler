import React, { useState } from 'react';

class NowPlayingBar extends React.Component {
  render() {
    return (
      <div>
        <p>Foot of thing</p>
        <iframe id='player' src='https://www.youtube.com/embed/?enablejsapi=1'></iframe>
      </div>
    );
  }
}

console.log('now playing bar script');

export default NowPlayingBar;