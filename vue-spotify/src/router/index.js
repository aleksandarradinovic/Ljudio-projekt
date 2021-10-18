import { createWebHistory, createRouter } from "vue-router"
import Artistview from '../views/Artistview.vue'
import Songview from '../views/Songview.vue'
import Artistidview from '../views/Artistidview.vue'
import Songidview from '../views/Songidview.vue'
import Home from '../views/homeview.vue'

const routes = [
  {
    path: "/",
    name: "homeview",
    component: Home,
  },
  {
    path: "/artist/:browseId",
    name: "Artistbrowseid",
    component: Artistidview,
    props: true,
  },
  {
    path: "/artists/:stringArtists",
    name: "Artist",
    component: Artistview,
    props: true,
  },
  {
    path: "/song/:videoId",
    name: "SongId",
    component: Songidview,
    props: true,
  },
  {
    path: "/songs/:stringSongs",
    name: "Song",
    component: Songview,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;