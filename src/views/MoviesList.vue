<template>
  <!-- <div>
    <MovieSwiper v-if="requestCompleted" :items="movies" />
  </div>-->
  <v-container v-if="requestCompleted">
    <v-row>
      <v-card class="mx-auto" max-width="344">
        <v-img
          :src="currentItem.image"
          :alt="currentItem.title"
          :title="currentItem.title"
          height="300px"
          class="white--text align-end"
        >
          <v-card-title style="text-shadow: 1px 1px #000">{{ currentItem.title }}</v-card-title>
        </v-img>
        <v-card-actions>
          <v-btn class="mx-2" fab dark large color="red" v-on:click="getAnswer('LEFT')">
            <v-icon dark>mdi-heart-off</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" fab dark large color="green accent-3" v-on:click="getAnswer('RIGHT')">
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>{{ currentItem.description }}</v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { listMovies, likeMovie } from "../services/movies";

export default {
  name: "MoviesList",
  components: {},
  data() {
    return {
      movies: [],
      requestCompleted: false,
      show: false,
      currentItem: "",
      answers: [],
      itemIndex: 0,
      finished: false,
      page: 1
    };
  },
  async mounted() {
    const resp = await listMovies(this.page);
    this.requestCompleted = true;
    this.movies = [];
    for (const movie of resp.data.results) {
      this.movies.push({
        image: movie.image,
        title: movie.title,
        description: movie.description,
        id: movie.id,
        url: movie.url
      });
    }
    this.page++;
    this.currentItem = this.movies[this.itemIndex];
  },
  methods: {
    getAnswer: async function(action) {
      const like = action === "RIGHT";
      likeMovie(this.currentItem.id, like);
      this.itemIndex++;

      // Controls pagination workflow
      if (this.itemIndex == this.movies.length - 3) {
        const resp = await listMovies(this.page);
        this.page++;
        for (const movie of resp.data.results) {
          this.movies.push({
            image: movie.image,
            title: movie.title,
            description: movie.description,
            id: movie.id,
            url: movie.url
          });
        }
      }

      // Controls currentItem
      if (this.itemIndex == this.movies.length) {
        this.finished = true;
      } else {
        this.currentItem = this.movies[this.itemIndex];
      }
    }
  }
};
</script>
