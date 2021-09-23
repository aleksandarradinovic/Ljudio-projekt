<template> 
    <body>
        <div>
              <Header/>
        </div>
        <div class="Youtubecontainer2" id="yt-player">
        </div>
        <div class="container1" style="border: none;">
            <div >
                <table class="table table-bordered">
                <tr class="table-success">
                    <td class="table-success" >
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
        </div>
        <div>
            <Modal v-show="isModalVisible" @close="closeModal">
                <template v-slot:body>
                    <p> Song link - {{shareSongLink}}</p>
                    <p> Artist Link - {{shareArtistLink}}</p>
                </template>
            </Modal>
        </div>
        
        <div class="container1">
            <div class="container2">
                <button class="btn btn-outline-primary"  @click="previous()">Prev</button>
                <button class="btn btn-outline-info" @click="next()">Next</button>
            </div>
            <table id="songlisttable" class="table table-bordered">
                <tr  :key="(song.videoId)" v-for="song in songlist">
                    <td class="table-success">
                        <div> Song title: {{song.name}} &nbsp; &nbsp; &nbsp; Artist: {{song.artist.name}}
                        </div>
                    </td>
                    <td >
                        <div>
                            <button class="btn btn-primary" v-bind:data-songindex="songlist.indexOf(song)"  v-bind:id="song.videoId"  @click="playsong(song.videoId);" type="button"><i class="fas fa-play"></i></button>
                        </div>
                        
                    </td>
                        <td>
                        <div>
                            <button type="button" class="btn" @click="showModalSong(song.videoId)"><i class="far fa-share-square"></i></button>
                        </div>
                    </td>
                </tr>
                <tr :key="artist.browseId" v-for="artist in artistlist">
                    <td class="table-success">
                        <div>Artist: {{artist.name}} </div>   
                    </td>
                    <td >
                        <div><button class="btn btn-primary" type="button" @click="searchyoutubeartistsong(artist.browseId)"><i class="far fa-hand-pointer"></i></button> </div>
                    </td>
                    <td >
                        <button type="button" class="btn" @click="showModalArtist(artist.name)"><i class="far fa-share-square"></i></button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="container1">
            <table class="table table-bordered">
                <tr class="table-success" v-for="item in ArtistSongList" :key="item.id"> 
                    <td class="table-success">
                        <div>Song name:{{item.name}}   &nbsp;&nbsp;&nbsp;&nbsp;  Artist:{{artistName}} </div>  
                    </td>
                </tr>
            </table>
        </div>
    </body>
</template>

<script>
import Header from './components/layout/Header.vue'
import Modal from './components/layout/Modal.vue'

export default{
    name: 'App',
    data() {
        return{
            isModalVisible: false,
            songid: '',
            artistName: '',
            ArtistSongList: [],
            songlist: [],
            artistlist: [],
            searchStringBrowseId: '',
            searchStringSong: '',
            searchStringArtist: '',
            isPaused: false,
            videoid: '',
            videoindex: -1,
            firstSong: false,
            shareSongLink: 'https://www.youtube.com/watch?v=',
            shareArtistLink: 'https://www.youtube.com/results?search_query='
        }
    },
    components: {
        Header,
        Modal,
    },

    methods: {
        showModalSong(song) {
        this.isModalVisible = true;
        this.shareSongLink = this.shareSongLink + song;
      },
      showModalArtist(artist) {
        this.isModalVisible = true;
        this.shareArtistLink = this.shareArtistLink + artist;
      },
      closeModal() {
          this.shareSongLink = 'https://www.youtube.com/watch?v=';
          this.shareArtistLink ='https://www.youtube.com/results?search_query='
            this.isModalVisible = false;
      },

        searchyoutubesong: function(searchStringSong){
            this.songlist.splice(0);
            this.artistlist.splice(0);
            this.ArtistSongList.splice(0);
            this.firstSong = true;
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
            this.songlist.splice(0);
            this.artistlist.splice(0);
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
            this.searchStringSong = '';
        },

        getArtistList: function(){
            this.searchyoutubeartist(this.searchStringArtist);
            this.searchStringArtist = '';
        },

        next(){
            
            this.videoindex  = parseInt(this.videoindex) +1;
            if (this.videoindex >= this.songlist.length)
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
                this.videoindex = this.songlist.length -1;
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

        playsong(id){

           if (event.currentTarget.children[0].classList.contains("fa-play"))
            {
                if (this.videoid != '' && this.videoid != id && !this.firstSong)
                 {
                 document.getElementById(this.videoid).children[0].classList.remove("fa-pause");
                 document.getElementById(this.videoid).children[0].classList.add("fa-play");
                 }

               
                event.currentTarget.children[0].classList.remove("fa-play");
                event.currentTarget.children[0].classList.add("fa-pause");
             

                if (event.currentTarget.classList.contains("continue-video"))
                {
                    if(this.videoid == id)
                    {
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
            this.ArtistSongList = response.products.videos.content; 
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

.container1 {
  width: 600px;
  margin: 5px auto;
  overflow: auto;
  min-height: 100px;
  /* border: 1px solid rgb(28, 60, 87); */
  background-color: white;
}

.container2{
    width: 200px;
  margin: 5px auto;
  overflow: auto;
  min-height: 100px;
  padding: 10px;
  background-color: white;
  align-content: center;
  align-items: center;
}

.Youtubecontainer2 {
    display: flex;
  width: 400px;
  margin: 5px auto;
  overflow: auto;
  min-height: 100px;
  padding: 10px;
  background-color: white;
  align-content: center;
  align-items: center;
}

</style>