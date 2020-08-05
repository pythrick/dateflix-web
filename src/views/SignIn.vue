<template>
  <div class="text-center">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
import { getToken } from "../services/auth";

export default {
  name: "SignIn",
  components: {},
  data() {
    return {};
  },
  async mounted() {
    const code = this.$route.query.code;
    try {
      const resp = await getToken(code);
      localStorage.setItem("token", resp.data.access);
      this.$router.push({ path: '/movies-list' });
    } catch (e) {
      this.$router.push({ path: '/', query: { login: 'failed' }  });
    }
  }
};
</script>
