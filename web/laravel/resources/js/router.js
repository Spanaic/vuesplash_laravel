import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポート
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'

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
        component: Login
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// VueRouterをexportする
// app.jsでimportする

export default router