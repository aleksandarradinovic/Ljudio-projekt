function onYouTubeIframeAPIReady() {
    // using global variable
    window.player = new YT.Player('yt-player', {
      height: '200px',
      width: '200px',
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
  }
  
  // this function triggers when we change song in player
  // can be used to update things, like counters
  function onPlayerStateChange(event) {
    if (event.data != YT.PlayerState.PLAYING) return
  }
  