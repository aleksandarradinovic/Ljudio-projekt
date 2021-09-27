<template> 
    <body>
        <div>
            <Header/>
        </div>
        <div>
            <Searchform />
        </div>
        <div class="Youtubecontainer2" id="yt-player">
        </div>
        <router-view></router-view>
    </body>
</template>

<script>
import Header from './components/layout/Header.vue'
import Searchform from './components/Searchform.vue'

export default{
    name: 'App',
    components: {
        Header,
        Searchform,
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
  border: 1px solid rgb(28, 60, 87);
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