import { createWebHistory, createRouter } from "vue-router"
import Artistview from '../views/Artistview.vue'
import Songview from '../views/Songview.vue'
import Artistidview from '../views/Artistidview.vue'
import Songidview from '../views/Songidview.vue'

const routes = [
  {
    path: "/artist/:browseId",
    name: "Artistbrowseid",
    component: Artistidview,
    props: true,
  },
  {
    path: "/artist",
    name: "Artist",
    component: Artistview,

  },
  {
    path: "/songs/:videoId",
    name: "SongId",
    component: Songidview,
    props: true,
  },
  {
    path: "/songs",
    name: "Song",
    component: Songview,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;