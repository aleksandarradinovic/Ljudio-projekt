<template> 
    <body>
        <div>
              <Header/>
        </div>
        <div class="container1">
            <table class="table table-bordered">
                <tr class="table-success">
                    <td class="table-success" style="width: ">
                        <div class="input-group">
                            <input type="text" v-model="searchStringArtist" class="form-control" placeholder="Search Artist">
                            <button @click="getArtistList"  id="buttonsearchArtist" type="button" class="btn btn-secondary"><span class="fas fa-search"></span></button>
                        </div>
                    </td>
                    <td class="table-success">
                        <div class="input-group">
                            <input type="text" v-model="searchStringSong" class="form-control" placeholder="Search Song">
                            <button @click="getSongList"  id="buttonsearchSong" type="button" class="btn btn-secondary"><span class="fas fa-search"></span></button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="container2" id="yt-player">
        </div>
        <div class="container1">
            <table class="table-success">
                <tr class="table-success"  :key="song.videoId" v-for="song in songlist">
                    <td class="table-success">
                       <div>Song title: {{song.name}} Artist: {{song.artist.name}} <button id="buttonPlaySong" @click="playsong(song.videoId)" type="button"><i class="fas fa-play"></i>
                        </button><button id="buttonPauseSong" @click="pause(song.videoId)" type="button"><i class="fas fa-pause"></i></button></div>
                    </td>
                </tr>
                <tr class="table-success" :key="artist.browseId" v-for="artist in artistlist">
                     Artist: {{artist.name}} <button type="button" @click="searchyoutubeartistsong(artist.browseId)">Choose</button>  
                </tr>
            </table>
        </div>
        <div class="container1">
            <table class="table-success">
                <th class="table-success">
                    <td class="table-success">
                            <div>Artist: {{artistName}}</div>  
                    </td>
                </th>
                <tr class="table-success" v-for="item in ArtistSongList" :key="item.id">
                    
                    <td class="table-success">
                   <div>Song name: {{item.name}} <button id="buttonPlaySong" @click="playsong(item.id)" type="button"><i class="fas fa-play"></i></button></div> 
                    </td>
                </tr>
            </table>
        </div>
        
    </body>
</template>

<script>

import Header from './components/layout/Header.vue'
// import Youtubeplayer from'./components/layout/Header.vue'


export default{
    name: 'App',
    data() {
        return{
            songid: '',
            artistName: '',
            ArtistSongList: [],
            songlist: [],
            artistlist: [],
            searchStringBrowseId: '',
            searchStringSong: '',
            searchStringArtist: '',
            isPaused: false,
        }
    },
    components: {
        Header,
        // Youtubeplayer,
    },

    methods: {

        searchyoutubesong: function(searchStringSong){
                fetch("https://yt-music-api.herokuapp.com/api/yt/songs/" + searchStringSong , {
            "method": "GET",
        })
        .then(response => { 
            if(response.ok){
            return response.json()    
        } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(response => {
            this.songlist = response.content;
            this.responseAvailable = true;
        })
        .catch(err => {
            console.log(err);
        });
        },

        searchyoutubeartist: function(searchStringArtist) {

            fetch("https://yt-music-api.herokuapp.com/api/yt/artists/" + searchStringArtist , {
            "method": "GET",
        })
        .then(response => { 
            if(response.ok){
            return response.json()    
        } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(response => {
            this.artistlist = response.content; 
            this.responseAvailable = true;
        })
        .catch(err => {
            console.log(err);
        });
    },
        getSongList: function(){
            this.searchyoutubesong(this.searchStringSong);
        },

        getArtistList: function(){
            this.searchyoutubeartist(this.searchStringArtist);
        },

        playsong(id){
      // calling global variable
      window.player.loadVideoById(id)
      window.player.playVideo()
    },
    pause(id){
      window.player.pauseVideo(id)
      this.isPaused = true;
      if(this.isPaused === true){
          window.player.playVideo()
      }

    },
    unpause(){

    },
        searchyoutubeartistsong: function(searchStringBrowseId){
            fetch("https://yt-music-api.herokuapp.com/api/yt/artist/" + searchStringBrowseId , {
            "method": "GET",
        })
        .then(response => { 
            if(response.ok){
            return response.json()    
        } else{
                alert("Server returned " + response.status + " : " + response.statusText);
            }                
        })
        .then(response => {
            this.artistName = response.name;
            this.ArtistSongList = response.products.singles.content; 
            this.responseAvailable = true;
        })
        .catch(err => {
            console.log(err);
        });
        }
    },

    
    
}

    

</script>

<style>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    font-family: sans-serif;
    align-content: center;
    align-items: center;
}

table{
    margin:0 auto;
    widows: 60%;
}

tr{
    border: 2px solid grey;
}

p{
    font-weight: bold;
}

.searchButton{
    float: left;
  width: 20%;
  padding: 10px;
  background: #2196F3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}

.container1 {
  width: 800px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid rgb(28, 60, 87);
  padding: 30px;
  border-radius: 5px;
  background-color: white;
}

.container2 {
  width: 400px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid rgb(28, 60, 87);
  padding: 30px;
  border-radius: 5px;
  background-color: white;
  align-content: center;
  align-items: center;
}

</style>