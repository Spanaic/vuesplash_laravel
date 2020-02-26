<template>
  <nav class="navbar">
    <RouterLink class="navbar__brand" to="/">Vuesplash</RouterLink>
    <div class="navbar__menu">
      <div v-if="isLogin" class="navbar__item">
        <button @click="showForm = ! showForm" class="button">
          <i class="icon ion-md-add">Submit a photo</i>
        </button>
      </div>
      <span v-if="isLogin" class="navbar__item">{{username}}</span>
      <div v-else class="navbar__item">
        <RouterLink class="button button--link" to="/login">login / Register</RouterLink>
      </div>
    </div>
    <PhotoForm v-model="showForm" />
  </nav>
</template>

<script>
import PhotoForm from "./PhotoForm.vue";
export default {
  components: {
    PhotoForm
  },
  data() {
    return {
      showForm: false
    };
  },
  computed: {
    // 算出プロパティで値の変化に応じてコンポーネントの表示を切り換える
    // 変化を見るのにv-ifを活用する
    isLogin() {
      return this.$store.getters["auth/check"];
    },
    username() {
      return this.$store.getters["auth/username"];
    }
  }
};
</script>