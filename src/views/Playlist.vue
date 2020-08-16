<template>
  <v-container fluid v-if="requestCompleted">
    <v-row dense>
      <v-col v-for="movie in movies" :key="movie.title" :cols="movie.flex">
        <v-card :to="'/find-a-match/' + movie.id" ref="card">
          <v-img
            :src="movie.image"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="movie.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon to="/movies-list/">
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { getPlaylist } from "../services/movies";

export default {
  name: "Playlist",
  data: () => ({
    movies: [],
    requestCompleted: false,
    page: 1,
    loadingNextPage: false
  }),
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  async mounted() {
    const resp = await getPlaylist(this.page);
    this.requestCompleted = true;
    this.movies = [];
    for (const movie of resp.data.results) {
      this.movies.push({
        image: movie.image,
        title: movie.title,
        description: movie.description,
        id: movie.id,
        url: movie.url,
        flex: 6
      });
    }
    this.page++;
  },
  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop + window.innerHeight;
      let offsetHeight = document.documentElement.offsetHeight;
      let bottomOfWindow = scrollTop >= offsetHeight - 300;
      if (bottomOfWindow && this.loadingNextPage === false) {
        this.loadingNextPage = true;
        this.getNextPage();
      }
    },
    getNextPage: async function() {
      const resp = await getPlaylist(this.page);
      this.page++;
      for (const movie of resp.data.results) {
        this.movies.push({
          image: movie.image,
          title: movie.title,
          description: movie.description,
          id: movie.id,
          url: movie.url,
          flex: 6
        });
      }
      this.loadingNextPage = false;
    }
  }
};
</script>
