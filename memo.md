# install-composer.shとは？

* PHPのパッケージ管理ツール
    * 利用するパッケージ(ライブラリ)間の依存関係も解決してくれる。

# Laravelのインストール方法

[ララ帳](https://laravel10.wordpress.com/2015/02/13/laravel%e3%81%ae%e3%82%a4%e3%83%b3%e3%82%b9%e3%83%88%e3%83%bc%e3%83%ab/#more-13)

## composer経由の場合

* `composer create-project --prefer-dist laravel/laravel PROJECT_NAME`

## Laravelインストーラーの場合

1. `composer global require "laravel/installer"`
2. PATHを通す
    ```~/.composer/vendor/bin
    # ~/.bashrc
    export PATH=$HOME/.compser/vendor/bin:$PATH
    ```
3. `laravel new PROJECT_NAME`

# Laravel Mixとは？

1. js, vue,　scssなどをコンパイルするライブラリ
    * webpackの設定がビルド時に自動で生成される

```js
mix.browserSync({
    proxy: '0.0.0.0:8081', //アプリの起動アドレス
    open: false //ブラウザを自動で開かない
}) //jsやphpファイル変更時にhot reloadする
```
```js
mix.browserSync('vuesplash.test')
    .js('resources/js/app.js', 'public/js')
    //第一引数 = コンパイル対象のファイル
    //第二引数 = コンパイル結果の配置先
    .version()
    // バージョニングが有効になる
    // ブラウザがキャッシュを読み込まないようにビルドの度にランダムな文字列をurlにつける
```

* **dockerでbuildしてる場合は(.js().version()は要らない)**

2. テンプレート側でmix関数と組み合わせて使う。

```html
<script src="{{ mix('js/app.js) }}" defer></script>
```

3. バージョニングすることで以下のHTMLに変換される
    1. クエリパラメータにランダムなidが付与され
    る。
    2. コンパイルされる度にURLが変わるのでブラウザからは異なるリクエストと見なされてキャッシュを読まずにサーバとの通信を行う。


```html
<script src="/js/app.js?id=87459a9d906e11120dd5" defer=""></script>
```

# .blade.php

`.blade.html`じゃないよ！`.blade.php`だよ！

# 開発環境の立ち上げについて

**`npm run watch`と`php artisan serve --host 0.0.0.0 --port 8081`の2つを行い、サーバー側とクライアント側の双方を起動しないとVueページは表示されない**

# npm install -D　の-Dオプションについて

カレントディレクトリに指定のパッケージをインストールするときに package.json の devDependencies欄 にパッケージ名が記録される。

# コンポーネントのルーティングが上手くいかないとき（表示されない）

[初心者向：Vue.js コンポーネント作成がうまくいかないときにチェックする5つのこと](https://qiita.com/kokoe/items/a5f4b950c36bfcd61ad9)

```js
import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
// ルートコンポーネントをインポートする
import App from './App.vue'

new Vue({
    el: '#app',
    router, //ルーティングの定義を読み込む
    components: { App }, //ルートコンポーネントの使用を宣言する
    template: '<App />' //ルートコンポーネントを描画する
})
```

1. コンポーネントの読み込み、router.jsでは一つのパスにつき一つのコンポーネントを読み込むため`component: Hogehoge`
2. app.jsなどの複数のコンポーネントを読み込むファイルでは、**`components: { App }`のように's'と’{}’を忘れない！**

# RouteServiceProvider.phpとは？

1. アプリケーションの起動時にルート定義を読み込むためのクラス
2. `routes/api.php`に記述したルートを定義に適用されるミドルウェアグループを`api`から`web`に変更している。
3. ミドルウェアの定義は`app/Http/Kernel.php`に記述されている。
4. apiミドルウェアグループでは本来外部から呼び出される**ステートレスなWeb API**が想定されているので、セッションやクッキー、CSRFトークンを扱うミドルウェアが含まれない。
5. 今回は内部からしか呼ばれない + クッキー認証を行う _ステートフルなAPI_なので`web`を使用

# ->　アロー演算子とは？

1. 左辺にクラスのインスタンスを取る。
2. 右辺に左辺のクラスが持つプロパティやメソッドを指定し、プロパティへアクセス・メソッドの呼び出しを実行する。

```php
class クラス名 {
    $プロパティ名1 = "プロパティ1";
    $プロパティ名2 = "プロパティ2";

    function メソッド名1() {
        // 処理
    }

    function メソッド名2 () {
        // 処理
    }
}

$instance = new クラス名();
```

## アロー演算子の書き方

```php
// 各プロパティを取り出す
$instance->プロパティ名1;
$instance->プロパティ名2;

// 各メソッドを呼び出す
$instance->メソッド名1();
$instance->メソッド名2();
```

3. イメージとしてはrubyの`.`

# アクセス修飾子

[アクセス修飾子の違い](https://uxmilk.jp/26435)

1. public
    1. どこからでもアクセス可能
    2. アクセス修飾子がない場合は、publicを指定したものと同じ
2. protected
    1. そのクラス自身と継承クラスからアクセス可能
    2. つまり、非公開だけど継承は可能な状態
3. private
    1. 同じクラスの中のみでアクセス可能
    2. 非公開で継承クラスからもアクセス不可

# $this 疑似変数の使い方

[$thisの使い方](https://www.sejuku.net/blog/23897)

1. メソッド外にあるクラス内変数にアクセスできる
    1. thisを使用しなければメソッド内のローカル変数を参照する。

# namespaced: trueの価値 & vuexのstoreをモジュール毎に作成する場合

1. Vuexでモジュール毎に分けてファイルを作成している場合、`namespaced: true`にしておくと2つのメリットが有る。
    1. dispatchで呼び出す時に、`'auth/register'`という名前でアクションを指定できる
    2. 仮に他のストアモジュールにもregisterというアクションがあったとしても、このように名前空間を有効にしておくと呼び出しで区別ができる。

```js
const state{
    user: null
};
const getters{};
const mutations{
    setUser(state, payload) {
        state.user = payload
    }
};
const actions = {
    async register(context, data) {
        let res = await axios.post("auth/register",data)
        store.commit('setUser', res.data)
    }
}

export default {
    namespaced: true
    state,
    getters,
    mutations,
    actions
}
```

# もしかしてthisの参照って（vue編）

1. `Vue.use(VueRouter)`とか`Vue.use(Vuex)`は、thisから参照させるために宣言してる？
    2. `this.$router`や`this.$store`など

    ```js
    Vue.use(VueRouter)

    <!-- 中略 -->

    export default router
    ```
# 新たなcurrentUser取得の切り口

1. App.vueでvueのインスタンスが作成される前に呼び出す

```js
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
```

# middlewareをピュアvueで書いた場合はrouter.jsに記述する

```js
        path: '/login',
        component: Login,
        beforeEnter(to, from, next) {
            if (store.getters['auth/check']) {
                next('/') // ログインしていればトップページへ
            } else {
                next() // ログインしていなければそのままloginコンポーネントをレンダリング
            }
        }
```

1. to = ルートオブジェクト
2. from = アクセス元のルート
3. next = ページの移動先
    1. next()を引数なしで呼ぶとそのまま切り替わる
    2. next()を引数有りで呼ぶと**引数のページに切り替わり、リダイレクトのような役割を果たす**

# laravelに記述したテスト(test)ファイルを実行するコマンド

`./vendor/bin/phpunit --testdox`