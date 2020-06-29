<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#1F7087" dark class="mx-auto" max-width="344">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">{{movie.title}}</v-card-title>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="movie.cover"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <ItemsSelector v-if="requestCompleted" :items="profiles" />
    </v-row>
  </v-container>
</template>

<script>
import ItemsSelector from "@/components/ItemsSelector.vue";
// import Axios from "axios";

// // Cria instância do axios
// const axios = Axios.create();

export default {
  name: "FindAMatch",
  components: {
    ItemsSelector
  },
  data() {
    return {
      profiles: [],
      movie: {
        id: "",
        title: "",
        description: "",
        cover: "",
        tmdb_id: ""
      },
      requestCompleted: false
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
    // const resp = await axios.get("https://matchflix.herokuapp.com/profiles");

    this.movie = {
      id: "977bc202-2305-48fb-972e-cf392aa1fb1e",
      title: "Dilwale Dulhania Le Jayenge",
      description:
        "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
      cover:
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
      tmdb_id: 19404
    };

    this.requestCompleted = true;
    this.profiles = [
      {
        image: "https://thispersondoesnotexist.com/image?234234",
        title: "Joana Dark",
        description: "Olá me chamo Joana e tenho 34 anos."
      },
      {
        image: "https://thispersondoesnotexist.com/image?sdfsf",
        title: "João Silva",
        description: "Olá me chamo João e tenho 29 anos."
      },
      {
        image: "https://thispersondoesnotexist.com/image?23534543",
        title: "Sandra Santana",
        description: "Olá me chamo Sandra, gosto de gatos e tenho 32 anos."
      }
    ];
    // for (const movie of resp.data) {
    //   this.profiles.push();
    // }
  }
};
</script>
