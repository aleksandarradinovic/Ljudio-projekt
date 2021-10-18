<template>
    <div class="container1">
        <table class="table table-bordered">
            <tr v-for="artist in this.$store.state.searchedArtists" :key="artist.browseId" >
                <td>
                    <span class="artistSpan">Artist:  {{artist.name}}</span>  
                </td>
                <td>
                    <router-link class="routerlinkshowdetails" :to="{name: 'Artistbrowseid', params: {browseId: artist.browseId}}"><span class="showdetailsSpan">Show details</span></router-link>   
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default{
    name: 'Artistview',
    props: ['stringArtists'],

    beforeMount(){
        this.getArtistList()
    },
    methods:{
        ...mapActions(['fetchArtists']),
        getArtistList(){
            this.fetchArtists(this.stringArtists)
        }
    }
}
</script>

<style scoped>

.artistSpan{
    font-weight: bold;
    font-style: italic;
}

.routerlinkshowdetails:link{
    text-decoration: none;
    color: black
}
.showdetailsSpan:hover{
    color: rgb(43, 28, 129)
}

</style>