<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary app v-if="isAuthenticated">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="link in links" :key="link" :to="link.route" link>
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <img
        class="mr-3"
        :src="require('../assets/img/dateflix-logo.png')"
        alt="Dateflix Logo"
        title="Dateflix Logo"
        height="40"
      />
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isAuthenticated"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer padless>
      <v-layout justify-center wrap>
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
  computed: {
    isAuthenticated() {
      return localStorage.getItem("token") !== null;
    }
  },
  data() {
    return {
      drawer: null,
      links: [
        {
          route: "/",
          name: "Home",
          icon: "mdi-instagram"
        },
        {
          route: "/movies-list",
          name: "Movies List",
          icon: "mdi-instagram"
        },
        {
          route: "/playlist",
          name: "Playlist",
          icon: "mdi-instagram"
        },
        {
          route: "/match-list",
          name: "Match List",
          icon: "mdi-instagram"
        },
        {
          route: "/logout",
          name: "Logout",
          icon: "mdi-instagram"
        }
      ]
    };
  }
};
</script>
