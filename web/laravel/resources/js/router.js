// 'vue'と'vue-router'をインポート
import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポート
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'

import store from './store'

// エラーページのコンポーネントをインポート
import SystemError from './pages/errors/System.vue';


// VueRouterプラグインを使用
// これで<RouterView />コンポーネントが使用できる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList
    },
    {
        path: '/login',
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters['auth/check']) {
                next('/') // ログインしていればトップページへ
            } else {
                next() // ログインしていなければそのままloginコンポーネントをレンダリング
                console.log("store.getters", store.getters['auth/check'])
            }
        }
    },
    // エラーページへのルートを設定
    {
        path: '/500',
        component: SystemError
    }
]

// histroyモードでURLの'#'をなくす
// VueRouterインスタンスを生成
const router = new VueRouter({
    mode: 'history',
    routes
})

// VueRouterをexportする
// app.jsでimportする

export default router