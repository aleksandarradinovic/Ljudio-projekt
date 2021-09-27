<template>


<div class="container1" style="border: none;">
    
                 <h3>Song videoId: "{{videoId}}"</h3> 
           
                <h3> Song name: "{{this.$store.state.chosenSong.name}}"</h3>
            
                <h3> Song Artist: "{{this.$store.state.chosenSong.artist.name}}"</h3>
            
    <button style="font-weight:bold;" @click="NewSearch()">New Search</button>
</div>
    
</template>

<script>
import { mapActions } from 'vuex'

export default{
    name: 'Songidview',
    props: ['videoId'],

    beforeMount(){
        this.getSong()
    },

    methods: {
        ...mapActions(["fetchChosenSong"]),
        getSong: function(){
            // this.$store.state.videoId = this.videoId;
            console.log(this.video)
            this.fetchChosenSong(this.videoId);   
        },
        NewSearch: function(){
            this.$router.push({name: 'Song'})
        }
    }
}

</script>

<style scoped>

button{
    border: none;
    border-radius: 4px; 
}

</style>