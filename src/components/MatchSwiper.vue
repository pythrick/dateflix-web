<template>
  <v-container>
    <v-row>
      <v-card class="mx-auto" min-width="344">
        <v-carousel cycle height="400" hide-delimiters show-arrows>
          <v-carousel-item
            v-for="(picture, i) in currentProfile.pictures"
            :key="i"
            :src="picture"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
        <v-card-actions>
          <v-btn
            class="mx-2"
            fab
            dark
            large
            color="red"
            v-on:click="getAnswer('LEFT')"
          >
            <v-icon dark>mdi-heart-off</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-2"
            fab
            dark
            large
            color="green accent-3"
            v-on:click="getAnswer('RIGHT')"
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
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">It's a Match!</v-card-title>
          <v-card-text>You and Fulano have liked each other.</v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="6">
                <v-img
                  :src="currentProfile.pictures[0]"
                  :alt="currentProfile.name"
                  :title="currentProfile.name"
                  class="rounded-circle mx-2"
                  height="100px"
                  width="100px"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-img
                  :src="currentProfile.pictures[0]"
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
                    <v-btn large color="pink" rounded dark>
                      Go to Instagram
                      <v-icon right dark>mdi-instagram</v-icon>
                    </v-btn>
                  </div>
                  <div class="my-2">
                    <v-btn large color="primary" rounded dark>
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
export default {
  name: "MatchSwiper",
  props: ["profiles"],
  data: function() {
    return {
      show: false,
      answers: [],
      finished: false,
      dialog: true,
      currentProfile: "",
      profileIndex: 0,
    };
  },
  async mounted() {
    this.currentProfile = this.profiles[this.profileIndex];
  },
  methods: {
    getAnswer: function(action) {
      this.profileIndex++;
      console.log(action);
      if (this.profileIndex == this.profiles.length) {
        this.finished = true;
        this.dialog = true;
      } else {
        this.currentProfile = this.profiles[this.profileIndex];
      }
    },
  },
};
</script>
