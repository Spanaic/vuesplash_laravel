<template>
  <div v-show="value" class="photo-form">
    <h2 class="title">Submit a photo</h2>
    <div v-show="loading" class="panel">
      <Loader>Sending your photo...</Loader>
    </div>
    <form v-show="! loading" class="form" @submit.prevent="submit">
      <div class="errors" v-if="errors">
        <ul v-if="errors.photo">
          <li v-for="msg in errors.photo" :key="msg">{{ msg }}</li>
        </ul>
      </div>
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
import { CREATED, UNPROCESSABLE_ENTITY } from "../util";
import Loader from "./Loader.vue";

export default {
  components: {
    Loader
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      preview: null,
      photo: null,
      errors: null,
      loading: false
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
      this.photo = event.target.files[0];
    },
    reset() {
      this.preview = "";
      this.photo = null;
      this.$el.querySelector('input[type="file"]').value = null;
      // this.$elはコンポーネントそのもののDOM要素を示す
    },
    // fileを送信するメソッド
    async submit() {
      this.loading = true;
      // FormDataのインスタンスを生成
      // FormData APIを使用
      const formData = new FormData();
      formData.append("photo", this.photo);
      console.log("this.photo", this.photo);
      console.log("formData", formData);
      const response = await axios.post("/api/photos", formData);
      console.log("response", response);
      // Loaderコンポーネントの表示をoffにする
      this.loading = false;

      //   バリデーションエラー処理
      //   エラーメッセージを表示するタイミング上、formを閉じる前に表示させる
      if (response.status === UNPROCESSABLE_ENTITY) {
        this.errors = response.data.errors;
        // エラーをセットして表示する処理が終わったあとに、returnすることで処理を中断する
        return false;
      }

      // 送信が終わったらresetを呼んで入力値をクリアする。
      this.reset();
      // inputイベントで発行される値をfalseにすることで、Navbarの`showForm`がfalseになる => 自動でフォームが閉じる
      this.$emit("input", false);
      // 投稿完了後、axiosのresに入ってるidの詳細ページに遷移する

      if (response.status !== CREATED) {
        //   vuexのerror codeにステータスをsetする
        this.$store.commit("error/setCode", response.status);
        console.log("error", this.$store.error.status);
        return false;
      }

      // サクセスメッセージの登録
      this.$store.commit("message/setContent", {
        content: "写真が投稿されました!",
        timeout: 6000
      });

      this.$router.push(`/photos/${response.data.id}`);
    }
  }
};
</script>

<style>
</style>