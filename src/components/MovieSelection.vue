<template>
  <div class="container master" v-if="!acabou">
    <div>
      <button
        type="button"
        class="button downvote"
        v-on:click="getAnswer('LEFT')"
      >
        <i class="fa fa-times fa-3x"></i>
      </button>
    </div>

    <div class="movie-card">
      <img
        :src="currentMovie.cover"
        :alt="currentMovie.title"
        :title="currentMovie.title"
      />
      <div class="text">
        <h4>
          <b>{{ currentMovie.title }}</b>
        </h4>
        <hr />
        <p>{{ currentMovie.description }}</p>
      </div>
    </div>

    <div>
      <button class="button heart" v-on:click="getAnswer('RIGHT')">
        <i class="fa fa-heart fa-2x"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  min-width: 300px;
  border-radius: 5px;
}

p {
  color: rgb(140, 140, 140);
  margin-bottom: 6px !important;
}

.marker {
  margin-bottom: 1px !important;
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
  margin-top: 10px;
  max-height: 400px;
}

hr {
  margin: 10px 0 !important;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.text {
  text-align: justify !important;
  padding: 0 0 0 0 !important;
  width: 100% !important;
}

span {
  font-weight: 500;
}

.container {
  padding: 2px 16px;
  text-align: center;
}
.container > div {
  display: inline-block;
  padding: 0 10px;
  vertical-align: middle;
}
.container:after {
  content: " ";
  display: inline-block;
  width: 100%;
}

.button {
  width: 50px;
  height: 50px;
  background-color: blue;
  border-radius: 50%;
  color: white;
  border: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.downvote {
  background-image: linear-gradient(rgb(249, 54, 96), rgb(252, 93, 67));
}

.heart {
  background-image: linear-gradient(rgb(37, 225, 143), rgb(76, 236, 202));
}

.watch {
  margin-top: 10px;
  width: auto !important;
  height: 36px !important;
  border-radius: 6px !important;
  font-size: 16px !important;
  background-image: linear-gradient(rgb(45, 156, 255), rgb(29, 194, 255));
}
</style>

<script>
import Axios from "axios";

// Cria instância do axios
const axios = Axios.create();

export default {
  name: "MovieSelection",
  data: function() {
    return {
      currentMovie: "",
      answers: [],
      movieIndex: 0,
      acabou: false,
      parabens: false,
      email: "",
    };
  },
  async mounted() {
    const resp = await axios.get("https://matchflix.herokuapp.com/movies");
    this.movies = resp.data;
    this.currentMovie = this.movies[this.movieIndex];
    console.log(this.currentMovie);
  },
  methods: {
    getAnswer: function(action) {
      this.answers.push({
        movie_id: this.currentMovie.id,
        action: action,
      });
      this.movieIndex++;
      this.currentMovie = this.movies[this.movieIndex];
      if (this.movieIndex == this.movies.length) {
        this.acabou = true;
      }
      console.log(this.answers);
    },
    sendAnswers: async function() {
      const resp = await axios.post(
        "https://matchflix.herokuapp.com/user-movies",
        {
          email: this.email,
          answers: this.answers,
        }
      );
      if (resp.status == 201) {
        this.parabens = true;
      }
    },
  },
};
</script>
