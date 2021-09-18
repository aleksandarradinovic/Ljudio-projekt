<template> 
    <body>
        <Header/>
        <div class="container">
            <form>
                <label for="inputText" class="form-label">Search</label>
                <input type="text" id="inputText5" class="form-control">
                <button type="button" class="btn btn-secondary">Search</button>
            </form>
        </div >
        <div class="container2">
        </div>
    </body>
</template>

<script>

import Header from './components/Header.vue'

export default{
    name: 'App',
    components: {
        Header,
    }
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

.container {
  width: 800px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
  background-color: white;
}

.container2 {
  width: 1000px;
  margin: 30px auto;
  overflow: auto;
  min-height: 100px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
  background-color: white;
  align-content: center;
  align-items: center;
}

</style>