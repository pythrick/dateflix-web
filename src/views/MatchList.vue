<template>
  <v-container>
    <h1>Match List</h1>
    <v-row dense>
      <v-col v-for="(item, i) in items" :key="i" cols="12">
        <v-card class="mx-auto" max-width="434" tile>
          <v-img height="300px" :src="item.movie_cover">
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="164" tile>
                  <v-img :src="item.person_picture"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title
                      class="title"
                      style="text-shadow: 1px 1px #000"
                    >{{item.person_name}} | {{item.movie}}</v-list-item-title>
                    <v-btn color="pink" rounded dark>
                      Go to Instagram
                      <v-icon right dark>mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn color="red" rounded dark>
                      Watch on Netflix
                      <v-icon right dark>mdi-netflix</v-icon>
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "MatchList",
  data: () => ({
    items: [
      {
        movie: "Batman Begins",
        person_name: "João Silva",
        movie_cover:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        person_picture: "https://thispersondoesnotexist.com/image?234234234"
      },
      {
        movie: "Batman Begins",
        person_name: "João Silva",
        movie_cover:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/clolk7rB5lAjs41SD0Vt6IXYLMm.jpg",
        person_picture: "https://thispersondoesnotexist.com/image?34535"
      },
      {
        movie: "Batman Begins",
        person_name: "João Silva",
        movie_cover:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        person_picture: "https://thispersondoesnotexist.com/image?7567567"
      },
      {
        movie: "Batman Begins",
        person_name: "João Silva",
        movie_cover:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mfnkSeeVOBVheuyn2lo4tfmOPQb.jpg",
        person_picture: "https://thispersondoesnotexist.com/image?4565464"
      }
    ]
  })
};
</script>