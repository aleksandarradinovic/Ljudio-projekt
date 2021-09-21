<template>
  <div class="container1">
  </div>
</template>

<script>


export default {
    name: 'Youtubeplayer',
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