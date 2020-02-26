<template>
  <div v-show="value" class="photo-form">
    <h2 class="title">Submit a photo</h2>
    <form class="form">
      <input type="file" class="form__item" @change="onFileChange" />
      <output class="form__output" v-if="preview">
        <img :src="preview" alt />
      </output>
      <div class="form__button">
        <button class="button button--inverse" type="submit">submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      preview: null
    };
  },
  methods: {
    // フォームでファイルが選択されたら実行される
    onFileChange(event) {
      // 何も選択されてなかったら処理を中断
      if (event.target.files.length === 0) {
        this.reset();
        return false;
      }
      // ファイルが画像ではなかったら処理を中断
      if (!event.target.files[0].type.match("image.*")) {
        this.reset();
        return false;
      }

      // FileReaderクラスのインスタンスを取得
      const reader = new FileReader();

      // ファイルを読み込み終わったタイミングで実行する処理
      reader.onload = e => {
        // previewに読み込み結果(データURL)を代入する
        // previewに値が入ると<output>に付けたv-ifがtrueと判定される
        // また<output>内部の<img>のsrc属性はpreviewの値を参照しているので
        // 結果として画像が表示される
        this.preview = e.target.result;
      };
      // ファイルを読み込む
      // 読み込まれたファイルはデータデータ形式で受け取れる(上記onload参照)
      reader.readAsDataURL(event.target.files[0]);
    },
    reset() {
      this.preview = "";
      this.$el.querySelector('input[type="file"]').value = null;
      // this.$elはコンポーネントそのもののDOM要素を示す
    }
  }
};
</script>

<style>
</style>