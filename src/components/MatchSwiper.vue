<template>
  <v-container>
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
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">It's a Match!</v-card-title>
          <v-card-text>You and Fulano have liked each other.</v-card-text>
          <v-container>
            <v-row justify="center">
              <v-col cols="6">
                <v-img
                  :src="currentItem.image"
                  :alt="currentItem.title"
                  :title="currentItem.title"
                  class="rounded-circle mx-2"
                  height="100px"
                  width="100px"
                ></v-img>
              </v-col>
              <v-col cols="6">
                <v-img
                  :src="currentItem.image"
                  :alt="currentItem.title"
                  :title="currentItem.title"
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
  props: ["items"],
  data: function() {
    return {
      show: false,
      currentItem: "",
      answers: [],
      itemIndex: 0,
      finished: false,
      dialog: true
    };
  },
  async mounted() {
    this.movies = this.items;
    this.currentItem = this.movies[this.itemIndex];
  },
  methods: {
    getAnswer: function(action) {
      this.answers.push({
        movie_id: this.currentItem.id,
        action: action
      });
      this.itemIndex++;

      if (this.itemIndex == this.movies.length) {
        this.finished = true;
        this.dialog = true;
      } else {
        this.currentItem = this.movies[this.itemIndex];
      }
    }
  }
};
</script>
