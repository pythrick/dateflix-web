<template>
  <div class="text-center">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Logout",
  components: {},
  data() {
    return {};
  },
  async mounted() {
    localStorage.removeItem("token");
    this.$router.go({
      path: "/",
      query: { logout: "success" },
      force: true
    });
  }
};
</script>
