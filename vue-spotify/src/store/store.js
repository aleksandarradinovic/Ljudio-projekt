import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
     data: {
          searchstring:"",
          browseId: '',
          searchedSongs:[],
          searchedArtists:[],
          artistsongs: [],
          chosenSong:{
               videoId:'',
               name: "Song name",
               artist: {
                  name:"Artist name"
                        }
          },
     },
     mutations:{

     search(state,data){
        state.searchstring = data
     },
     browse(state,data){
         state.browseId = data
     },
     setSearchedSongs(state,data){
        state.searchedSongs = data
     },
     setSearchedArtists(state,data){
        state.searchedArtists = data
     },
     setChosenArtist(state,data){
        state.artistsongs = data
     },
     setChosenSong(state,data){
        state.chosenSong = data
     },
  },

     actions:{

     async fetchSongs(context,searchstring){
        let data = await axios.get(`https://yt-music-api.herokuapp.com/api/yt/songs/${searchstring}`)
        context.commit("setSearchedSongs",data.data.content)
     },
     async fetchArtists(context,searchstring){
        let data = await axios.get(`https://yt-music-api.herokuapp.com/api/yt/artists/${searchstring}`)
        context.commit("setSearchedArtists",data.data.content)
     },
     async fetchChosenSong(context,videoId){
        let data = await axios.get(`https://yt-music-api.herokuapp.com/api/yt/song/${videoId}`)
        context.commit("setChosenSong",data.data)
     }
  }
})

export default store