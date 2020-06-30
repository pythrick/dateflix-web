<template>
  <div>
    <MovieSwiper v-if="requestCompleted" :items="movies" />
  </div>
</template>

<script>
import MovieSwiper from "@/components/MovieSwiper.vue";
import Axios from "axios";

// Cria instância do axios
const axios = Axios.create();

export default {
  name: "MoviesList",
  components: {
    MovieSwiper
  },
  data() {
    return {
      movies: [],
      requestCompleted: false
    };
  },
  async mounted() {
    const resp = await axios.get("https://matchflix.herokuapp.com/movies");
    this.requestCompleted = true;
    this.movies = [];
    for (const movie of resp.data) {
      this.movies.push({
        image: movie.cover,
        title: movie.title,
        description: movie.description
      });
    }
    console.log(this.movies);
  }
};
</script>
