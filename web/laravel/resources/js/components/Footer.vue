<template>
  <footer class="footer">
    <button v-if="isLogin" @click="logout" class="button button--link">Logout</button>
    <RouterLink v-else class="button button--link" to="/login">Login / Register</RouterLink>
  </footer>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$store.dispatch("auth/logout");

      this.$router.push("/login");
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/check"];
    }
  }
};
</script>