<template>
  <div class="photo-list">
    <div class="grid">
      <Photo class="grid__item" v-for="photo in photos" :key="photo.id" :item="photo" />
    </div>
    <Pagination :current-page="currentPage" :last-page="lastPage" />
  </div>
</template>

<script>
import { OK } from "../util";
import Photo from "../components/Photo.vue";
import Pagination from "../components/Pagination.vue";

export default {
  // router.jsからプロパティを受け取るために`props`を追加する
  props: {
    page: {
      type: Number,
      required: false,
      default: 1
    }
  },
  components: {
    Photo,
    Pagination
  },
  data() {
    return {
      photos: [],
      currentPage: 0,
      lastPage: 0
    };
  },
  methods: {
    async fetchPhotos() {
      const response = await axios.get(`/api/photos/?page=${this.page}`);

      if (response.status !== OK) {
        this.$store.commit("error/setCode", response.status);
        return false;
      }

      this.photos = response.data.data;
      this.currentPage = response.data.current_page;
      this.lastPage = response.data.last_page;
    }
  },
  watch: {
    $route: {
      // $routeを監視して、ページが切り替わった時に関数`fetchPhotos()`を実行させる
      async handler() {
        await this.fetchPhotos();
      },
      immediate: true //コンポーネントが生成されたタイミングでも実行される
    }
  }
};
</script>

<style>
</style>