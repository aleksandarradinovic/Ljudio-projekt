<template>
    <div class="container1" style="border: none;">
        <table table table-bordered>
            <thead> 
                <span>Artist: </span> {{artistName}} <span>Browseid:</span> {{browseId}}
            </thead>
            <tr v-for="artistsong in ArtistSongList" :key="artistsong.browseId">
                <td>
                   <span> Song: </span> {{artistsong.name}}
                </td>
            </tr>
        </table>
        <button @click="NewSearch">New search</button>
    </div>
</template>
<script>

export default{
    name: 'Artistidview',
    props: ['browseId'],
    data(){
        return{
            ArtistSongList: [],
            artistName: '',
        }
    },
    methods: {
        NewSearch(){
            this.$router.go(-1)
        }
    },

    beforeMount(){
        fetch("https://yt-music-api.herokuapp.com/api/yt/artist/" + this.browseId , {
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
}

</script>

<style scoped>

buttons{
    border-radius: 4px;
    border:none;
}

span{
    font-weight: bold;
    font-style: italic;
}

</style>