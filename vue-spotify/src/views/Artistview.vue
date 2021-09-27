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

export default{
    name: 'Artistview',
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