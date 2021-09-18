<template>
  <div>
    <button @click="play('w2g8E_X8uKI')">Hotel</button>
    <button @click="play('ctP9A7rGeOE')">Istina je da te lazem</button>
    <button @click="pause()">Pause</button>
  </div>
</template>

<script>
export default {
    name: 'youtubeplayer',
  methods:{
    play(id){
      // calling global variable
      window.player.loadVideoById(id)
      window.player.playVideo()
    },
    pause(){
      window.player.pauseVideo()
    }
  }
}
</script>