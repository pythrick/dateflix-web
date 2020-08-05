<template>
  <div>
    <v-alert type="error" v-if="error">
      {{errorMessage}}
    </v-alert>
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    Login
  },
  data() {
    return {error: false}
  },
  mounted() {
    const loginParam = this.$route.query.login;
    if(loginParam === 'failed'){
      this.error = true;
      this.errorMessage = 'Authentication failed, please try again.'
    }
  }
};
</script>
