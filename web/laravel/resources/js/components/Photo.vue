<template>
  <div class="photo">
    <figure class="photo__wrappe">
      <img :src="item.url" :alt="`Photo by ${item.owner.name}`" class="photo__image`" />
    </figure>
    <!-- マウスオーバーすると表示される黒半透明な背景にボタンや投稿者名が乗る要素 -->
    <!-- 写真詳細ページへのリンク -->
    <RouterLink
      class="photo__overlay"
      :to="`/photos/${item.id}`"
      :title="`View the photo by ${item.owner.name}`"
    >
      <!-- いいねボタン -->
      <div class="photo__controls">
        <button class="photo__action photo__action--like" title="Like photo">
          <i class="icon ion-md-heart"></i>12
        </button>
        <!-- ダウンロードボタン -->
        <!-- RouterLinkではなくaタグ -->
        <!-- 直接サーバーにGETリクエストを送信する必要があるため -->
        <a
          :href="`/photos/${item.id}/download`"
          class="photo__action"
          title="Download photo"
          @click.prevent
        >
          <i class="icon ion-md-arrow-round-down"></i>
        </a>
      </div>
      <!-- 投稿者名 -->
      <div class="photo__username">{{ item.owner.name }}</div>
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>