<template>
    <div class="container1" style="border: none;">
        <table class="table table-bordered">
            <tr class="table-success">
                <td class="table-success" >
                    <div class="input-group">
                        <input type="text" v-model="searchstringartist" class="form-control" placeholder="Search Artist">
                        <button @click="getArtistList(searchstringartist)" type="button" class="btn btn-secondary"><span class="fas fa-search"></span></button>
                    </div>
                </td>
                <td class="table-success">
                    <div class="input-group">
                        <input type="text" v-model="searchstringsong" class="form-control" placeholder="Search Song">
                        <button @click="getSongList(searchstringsong)" type="button" class="btn btn-secondary"><span class="fas fa-search"></span></button>
                            
                    </div>
                </td>
            </tr>
        </table>
    </div>         
</template>

<script>
import { mapActions } from "vuex";
import router from '../router/index'

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
            this.fetchSongs(searchstringsong);
            router.push({name: 'Song', params: {stringSongs: searchstringsong}})
        },
        
        ...mapActions(["fetchArtists"]),
        getArtistList(searchstringartist) {
            this.fetchArtists(searchstringartist);
            router.push({name: 'Artist', params: {stringArtists: searchstringartist}})
        },
    }
}

</script>