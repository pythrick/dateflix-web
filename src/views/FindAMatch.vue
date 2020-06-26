<template>
  <div>
    <ItemsSelector v-if="requestCompleted" :items="profiles" />
  </div>
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
      requestCompleted: false
    };
  },
  async mounted() {
    // const resp = await axios.get("https://matchflix.herokuapp.com/profiles");
    this.requestCompleted = true;
    this.profiles = [
      {
        image: "https://thispersondoesnotexist.com/",
        title: "Joana Dark",
        description: "Olá me chamo Joana e tenho 34 anos."
      },
      {
        image: "https://thispersondoesnotexist.com/?xpto",
        title: "João Silva",
        description: "Olá me chamo João e tenho 29 anos."
      },
      {
        image: "https://thispersondoesnotexist.com/?234324",
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
