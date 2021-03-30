<template>
  <div class="text-center">
    <h1>
      The Netflix's Tinder
      <br />
      <small>Find someone to watch a Netflix movie with you remotely.</small>
    </h1>
    <br />Do you already have a Dateflix account?
    <div class="my-2">
      <v-btn
        rounded
        color="secondary"
        dark
        large
        href="https://www.instagram.com/oauth/authorize?client_id=147195077222459&redirect_uri=https://localhost:8080/signin&scope=user_profile,user_media&response_type=code"
      >
        Sign In with Instagram
        <v-icon right dark>mdi-instagram</v-icon>
      </v-btn>
    </div>New here? Create your new account:
    <div class="my-2">
      <v-btn
        rounded
        color="success"
        dark
        large
        href="https://www.instagram.com/oauth/authorize?client_id=147195077222459&redirect_uri=https://localhost:8080/signup&scope=user_profile,user_media&response_type=code"
      >
        Sign Up with Instagram
        <v-icon right dark>mdi-instagram</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",

  data: () => ({})
};
</script>
