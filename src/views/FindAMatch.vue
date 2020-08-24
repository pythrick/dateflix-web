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
    </v-row>
    <v-row v-if="profilesLoaded && profiles.length > 0">
      <v-card class="mx-auto" min-width="344">
        <v-carousel cycle height="400" hide-delimiters show-arrows>
          <v-carousel-item
            v-for="(picture, i) in currentProfile.pictures"
            :key="i"
            :src="picture.url"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
        <v-card-actions>
          <v-btn class="mx-2" fab dark large color="red" v-on:click="likeOrDislike('LEFT')">
            <v-icon dark>mdi-heart-off</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-2"
            fab
            dark
            large
            color="green accent-3"
            v-on:click="likeOrDislike('RIGHT')"
          >
            <v-icon dark>mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-title>{{ currentProfile.name }}</v-card-title>
        <v-expand-transition>
          <div>
            <v-divider></v-divider>
            <v-card-text>{{ currentProfile.bio }}</v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      <v-dialog v-if="match" v-model="match" max-width="290" persistent>
        <v-card>
          <v-card-title class="headline">It's a Match!</v-card-title>
          <v-card-text>You and {{match.name}} have liked each other for this movie.</v-card-text>
          <v-container>
            <v-row justify="center">
              <!-- TODO: Carregar a foto e o nome do usuário logado -->
              <!-- <v-col cols="6">
                <v-img
                  :src="currentProfile.pictures[0]"
                  :alt="currentProfile.name"
                  :title="currentProfile.name"
                  class="rounded-circle mx-2"
                  height="100px"
                  width="100px"
                ></v-img>
              </v-col>-->
              <v-col cols="6">
                <v-img
                  :src="currentProfile.pictures[0].url"
                  :alt="currentProfile.name"
                  :title="currentProfile.name"
                  class="rounded-circle mx-2"
                  height="100px"
                  width="100px"
                ></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <div class="text-center">
                  <div class="my-2">
                    <v-btn large color="pink" rounded dark :href="match.instagram" target="_blank">
                      Go to Instagram
                      <v-icon right dark>mdi-instagram</v-icon>
                    </v-btn>
                  </div>
                  <div class="my-2">
                    <v-btn large color="red" rounded dark :href="movie.url" target="_blank">
                      Go to Netflix
                      <v-icon right dark>mdi-netflix</v-icon>
                    </v-btn>
                  </div>
                  <div class="my-2">
                    <v-btn large color="primary" rounded dark @click="keepPlaying()">
                      Keep Playing
                      <v-icon right dark>mdi-gesture-swipe</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { getMovie } from "../services/movies";
import { listProfiles, likeProfile } from "../services/profiles";

export default {
  name: "FindAMatch",
  components: {},
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
      page: 1,
      show: false,
      answers: [],
      finished: false,
      // dialog: false,
      currentProfile: "",
      profileIndex: 0,
      match: false
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
    this.currentProfile = this.profiles[this.profileIndex];
    this.profilesLoaded = true;
  },
  methods: {
    keepPlaying: function() {
      this.match = false;
      this.profileIndex++;
      if (this.profileIndex == this.profiles.length) {
        this.finished = true;
      } else {
        this.currentProfile = this.profiles[this.profileIndex];
      }
    },
    likeOrDislike: async function(action) {
      const like = action === "RIGHT";
      const resp = await likeProfile(
        this.movie.id,
        this.currentProfile.id,
        like
      );

      if (resp.data.match) {
        this.match = {
          name: resp.data.profile.name,
          instagram: resp.data.profile.instagram
        };
      } else {
        this.profileIndex++;
      }

      if (this.profileIndex == this.profiles.length) {
        const resp = await listProfiles(this.movie.id);
        if (resp.data.results.length === 0) {
          this.profiles = [];
        }
        for (const profile of resp.data.results) {
          this.profiles.push({
            pictures: profile.pictures,
            name: profile.name,
            bio: profile.bio,
            id: profile.id
          });
        }
      }

      if (this.profileIndex != this.profiles.length) {
        this.currentProfile = this.profiles[this.profileIndex];
      }
    }
  }
};
</script>
