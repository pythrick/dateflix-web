<template>
  <v-container>
    <v-row>
      <v-card class="mx-auto" min-width="344" v-if="!finished">
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
      <v-dialog v-if="match" v-model="match" max-width="290">
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
                    <v-btn large color="pink" rounded dark :href="match.instagram">
                      Go to Instagram
                      <v-icon right dark>mdi-instagram</v-icon>
                    </v-btn>
                  </div>
                  <div class="my-2">
                    <v-btn large color="red" rounded dark :href="movie.url">
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
import { likeProfile } from "../services/profiles";

export default {
  name: "MatchSwiper",
  props: ["profiles", "movie"],
  data: function() {
    return {
      show: false,
      answers: [],
      finished: false,
      // dialog: false,
      currentProfile: "",
      profileIndex: 0,
      match: false
    };
  },
  async created() {
    this.currentProfile = this.profiles[this.profileIndex];
  },
  methods: {
    keepPlaying: function() {
      // this.dialog = false;
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
        // this.dialog = true;
      } else {
        this.profileIndex++;
        if (this.profileIndex == this.profiles.length) {
          this.finished = true;
        } else {
          this.currentProfile = this.profiles[this.profileIndex];
        }
      }
    }
  }
};
</script>
