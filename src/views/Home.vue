<template>
  <div>
    <v-alert type="error" v-if="error">{{ errorMessage }}</v-alert>
    <v-alert type="success" v-if="success">{{ successMessage }}</v-alert>
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
    Login,
  },
  data() {
    return { error: false, success: false };
  },
  mounted() {
    const loginParam = this.$route.query.login;
    if (loginParam === "failed") {
      this.error = true;
      this.errorMessage = "Authentication failed, please try again.";
    }
    const registrationParam = this.$route.query.registration;
    if (registrationParam === "failed") {
      this.error = true;
      this.errorMessage = "Registration failed, please try again.";
    }
    const logoutParam = this.$route.query.logout;
    if (logoutParam === "success") {
      this.success = true;
      this.successMessage = "You have securely logged out.";
    }
  },
};
</script>
