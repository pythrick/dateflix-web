import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MoviesList from "../views/MoviesList.vue";
import Playlist from "../views/Playlist.vue";
import FindAMatch from "../views/FindAMatch.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movies-list",
    name: "Movies List",
    component: MoviesList,
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: Playlist,
  },
  {
    path: "/find-a-match/:id",
    name: "Find a Match",
    component: FindAMatch,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
