import './bootstrap'
import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
// ルートコンポーネントをインポートする
import store from './store'
// vuexのstoreをインポートする
import App from './App.vue'

const createApp = async () => {
    await store.dispatch('auth/currentUser')
}

new Vue({
    el: '#app',
    router, //ルーティングの定義を読み込む
    store, //storeを追加
    components: { App }, //ルートコンポーネントの使用を宣言する
    template: '<App />' //ルートコンポーネントを描画する
})

createApp()