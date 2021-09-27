<template>
    <div class="container1" style="border: none;">
        <table class="table table-bordered">
            <tr class="table-success">
                <td class="table-success" >
                    <div class="input-group">
                        <input type="text" v-model="searchstringartist" class="form-control" placeholder="Search Artist">
                        <router-link to="/artist">  <button @click="getArtistList(searchstringartist)" type="button" class="btn btn-secondary"><span class="fas fa-search"></span></button></router-link>
                    </div>
                </td>
                <td class="table-success">
                    <div class="input-group">
                        <input type="text" v-model="searchstringsong" class="form-control" placeholder="Search Song">
                        <router-link to="/songs"><button @click="getSongList(searchstringsong)" type="button" class="btn btn-secondary"><span class="fas fa-search"></span></button></router-link>
                    </div>
                </td>
            </tr>
        </table>
    </div>         
</template>

<script>
import { mapActions } from "vuex";

export default{
    name: 'Searchform',
    data() {
        return{
            searchstringsong: '',
            searchstringartist: '',
        }
    },
    
    methods: {
        ...mapActions(["fetchSongs"]),
        getSongList(searchstringsong) {
            this.$store.state.searchstring = searchstringsong;
            this.fetchSongs(searchstringsong);
        },
        
        ...mapActions(["fetchArtists"]),
        getArtistList(searchstringartist) {
            this.$store.state.searchstring = searchstringartist;
            this.fetchArtists(searchstringartist);
        },
    }
}

</script>