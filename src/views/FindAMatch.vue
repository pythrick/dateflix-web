<template>
  <v-container>
    <v-row dense>
      <v-alert
        type="info"
        v-if="profilesLoaded && profiles.length === 0"
      >You're the first one who wants to watch this movie.</v-alert>
      <v-col cols="12" v-if="movieLoaded">
        <v-card
          :href="movie.url"
          target="_blank"
          color="#1F7087"
          dark
          class="mx-auto"
          max-width="344"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">{{ movie.title }}</v-card-title>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="movie.cover"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <MatchSwiper
        v-if="profilesLoaded && profiles.length > 0"
        :profiles="profiles"
        :movie="movie"
      />
    </v-row>
  </v-container>
</template>

<script>
import MatchSwiper from "@/components/MatchSwiper.vue";
import { getMovie } from "../services/movies";
import { listProfiles } from "../services/profiles";

export default {
  name: "FindAMatch",
  components: {
    MatchSwiper
  },
  data() {
    return {
      profiles: [],
      movie: {
        id: "",
        title: "",
        description: "",
        cover: ""
      },
      profilesLoaded: false,
      movieLoaded: false,
      page: 1
    };
  },
  async mounted() {
    const movieId = this.$route.params.id;
    // Get movie
    const movieResp = await getMovie(movieId);
    this.movie = {
      id: movieResp.data.id,
      title: movieResp.data.title,
      description: movieResp.data.description,
      cover: movieResp.data.image,
      url: movieResp.data.netflix_url
    };
    this.movieLoaded = true;

    // List profiles
    const profilesResp = await listProfiles(movieId);
    this.profiles = [];
    for (const profile of profilesResp.data.results) {
      this.profiles.push({
        pictures: profile.pictures,
        name: profile.name,
        bio: profile.bio,
        id: profile.id
      });
    }
    this.page++;
    this.profilesLoaded = true;
  }
};
</script>
