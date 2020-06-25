<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card>
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
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
import Axios from "axios";

// Cria instância do axios
const axios = Axios.create();

export default {
  name: "MovieGrid",
  data: () => ({
    cards: []
  }),
  async mounted() {
    const resp = await axios.get("https://matchflix.herokuapp.com/movies");

    for (const movie of resp.data) {
      this.cards.push({
        title: movie.title,
        src: movie.cover,
        flex: 6
      });
    }
  }
};
</script>