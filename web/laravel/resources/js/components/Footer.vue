<template>
  <footer class="footer">
    <button v-if="isLogin" @click="logout" class="button button--link">Logout</button>
    <RouterLink v-else class="button button--link" to="/login">Login / Register</RouterLink>
  </footer>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  methods: {
    async logout() {
      this.$store.dispatch("auth/logout");
      if (this.apiStatus) {
        this.$router.push("/login");
      }
    }
  },
  computed: {
    // isLogin() {
    //   return this.$store.getters["auth/check"];
    // },
    ...mapGetters({
      isLogin: "auth/check"
    }),
    ...mapState({
      apiStatus: state => state.auth.apiStatus
    })
  }
};
</script>