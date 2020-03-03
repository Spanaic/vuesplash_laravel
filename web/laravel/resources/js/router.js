// 'vue'と'vue-router'をインポート
import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポート
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'

import store from './store'

// エラーページのコンポーネントをインポート
import SystemError from './pages/errors/System.vue';

// 写真詳細ページのコンポーネントをインポート
import PhotoDetail from './pages/PhotoDetail.vue';


// VueRouterプラグインを使用
// これで<RouterView />コンポーネントが使用できる
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList,
        props: route => {
            const page = route.query.page
            return { page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1 }
        }
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
    },
    // 写真詳細ページへのルートを設定
    {
        path: '/photos/:id', //pureなvueであればページ名に`_id`としなくてもrouterの記述でどうにか出来る
        component: PhotoDetail,
        props: true //変数部分のIDの値をpropsとして受け取る
    },
]

// histroyモードでURLの'#'をなくす
// VueRouterインスタンスを生成
const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes
})

// VueRouterをexportする
// app.jsでimportする

export default router