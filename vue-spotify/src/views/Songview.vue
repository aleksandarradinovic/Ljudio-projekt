
<template>
  <div>
    <div class="container2">
      <button class="btn btn-outline-primary"  @click="previous()">Prev</button>
      <button class="btn btn-outline-info"     @click="next()">Next</button>  
    </div>
    <div class="container1" style="border: none;">
      <table id="songlisttable" class="table table-bordered">
        <thead>
          <td>
            <span class="songnameArtist">Song name</span>
          </td>
          <td>
            <span class="songnameArtist">Artist</span>
          </td>
        </thead>
        <tr v-for="song in this.$store.state.searchedSongs" :key="song.videoId">
          <td>
              <span>{{song.name}}</span>   
          </td>
          <td>
            <span>{{song.artist.name}}</span> 
          </td>
          <td>
            <router-link class="routerlink" :to="{name: 'SongId', params: {videoId: song.videoId}}"><span>Show details</span></router-link>
          </td>
          
            <button class="btn btn-danger" v-bind:data-songindex="this.$store.state.searchedSongs.indexOf(song)"  v-bind:id="song.videoId" @click="playsong(song.videoId);" type="button"><i class="fas fa-play"></i></button>
          
        </tr>
        </table>
    </div>
    <div>
      <h1>{{namename}}</h1>
    </div>    
  </div>
</template>

<script>

export default{
    name: 'SongView',
    data() {
        return {
          chosenSong: {},
          videoid: '',
          isPuased: false,
          videoindex: 0,
          firstSong: false,
          songid:'',
        }
      },

  methods: {
    playsong(id){
        this.$store.state.chosenSong = id;
        if (event.currentTarget.children[0].classList.contains("fa-play")){
            if (this.videoid != '' && this.videoId != id && !this.firstSong)
            {
              document.getElementById(this.videoid).children[0].classList.remove("fa-pause");
              document.getElementById(this.videoid).children[0].classList.add("fa-play");
            }
              event.currentTarget.children[0].classList.remove("fa-play");
              event.currentTarget.children[0].classList.add("fa-pause");
            if (event.currentTarget.classList.contains("continue-video")){
                if(this.videoid == id){
                    window.player.playVideo(id);
                    }
                    else
                    {
                        this.videoid = id;
                        this.videoindex = event.currentTarget.getAttribute('data-songindex');
                        window.player.loadVideoById(id);
                        event.currentTarget.classList.add("continue-video");
                    }
                }
                else
                {
                     this.videoid = id;
                     this.videoindex = event.currentTarget.getAttribute('data-songindex');
                    window.player.loadVideoById(id)
                    event.currentTarget.classList.add("continue-video");
                }
            }
            else
            {
                window.player.pauseVideo(id);
                event.currentTarget.children[0].classList.add("fa-play");
                event.currentTarget.children[0].classList.remove("fa-pause");
            }
            this.firstSong = false; 
        },
        pause(){
        window.player.pauseVideo(this.videoid)
        this.isPaused = true;
        },
        next(){
            this.videoindex  = parseInt(this.videoindex) +1;
            if (this.videoindex >= this.$store.state.searchedSongs.length)
            {
                this.videoindex = 0;
            }

            var videobutton = document.getElementById("songlisttable").children[this.videoindex].getElementsByTagName("button")[0];
            
            if(this.videoid != '')
            {
                 document.getElementById(this.videoid).getElementsByTagName("i")[0].classList.remove("fa-pause");
                document.getElementById(this.videoid).getElementsByTagName("i")[0].classList.add("fa-play");
            }
            
            this.videoid = videobutton.id;
            window.player.loadVideoById(this.videoid)
            videobutton.children[0].classList.remove("fa-play");
            videobutton.children[0].classList.add("fa-pause");

        },
        previous(){

             this.videoindex  = this.videoindex  -1;
             if (this.videoindex < 0)
            {
                this.videoindex = this.$store.state.searchedSongs.length -1;
            }

            var videobutton = document.getElementById("songlisttable").children[this.videoindex].getElementsByTagName("button")[0];
            if(this.videoid != '')
            {
               document.getElementById(this.videoid).getElementsByTagName("i")[0].classList.remove("fa-pause");
                document.getElementById(this.videoid).getElementsByTagName("i")[0].classList.add("fa-play");
            }
            
            this.videoid = videobutton.id;
            window.player.loadVideoById(this.videoid);
            videobutton.children[0].classList.remove("fa-play");
            videobutton.children[0].classList.add("fa-pause");
        },
  }
}

</script>

<style scoped>

span{
  font-weight: bold;
  font-style: italic;
}

.routerlink{
  text-decoration: none;
  color:black
}

.routerlink:hover{
  color: rgb(84, 196, 186)
}

.songnameArtist{
  text-decoration: underline;
}

</style>

