<template>
  <footer class="footer">
    <button @click="logout" class="button button--link">Logout</button>
    <RouterLink class="button button--link" to="/login">Login / Register</RouterLink>
  </footer>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$store.dispatch("auth/logout");

      this.$router.push("/login");
    }
  }
};
</script>