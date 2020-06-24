<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Dateflix</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text rounded>Home</v-btn>
      <v-btn to="/movies-list" text rounded>Movies List</v-btn>
      <v-btn to="/about" text rounded>About</v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer padless>
      <v-layout justify-center wrap>
        <v-btn
          v-for="link in links"
          :key="link"
          :to="link.route"
          color="white"
          text
          rounded
          class="my-2"
          >{{ link.name }}</v-btn
        >
        <v-flex py-4 text-center white--text xs12>
          {{ new Date().getFullYear() }} —
          <strong>Dateflix</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      links: [
        {
          route: "/",
          name: "Home",
        },
        {
          route: "/about",
          name: "About",
        },
        {
          route: "/movies-list",
          name: "Movies List",
        },
      ],
    };
  },
};
</script>
