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

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

            <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ItemsSelector",
  props: ["items"],
  data: function() {
    return {
      show: false,
      currentItem: "",
      answers: [],
      itemIndex: 0,
      finished: false,
      dialog: false
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
      console.log(this.itemIndex);
      console.log(this.movies.length);
      if (this.itemIndex == this.movies.length) {
        this.finished = true;
        this.dialog = true;
        console.log("Acabou bebe");
      } else {
        this.currentItem = this.movies[this.itemIndex];
      }
    }
  }
};
</script>
