<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// APIのURL以外のリクエストに対してはindexテンプレートを返す
// 画面遷移はフロントエンドのVueRouterが制御する
// APIのルーティングはナビゲーションガードの上に記述していく。
// 記述順に実行されるため。


Route::get('/{any?}', fn () => view('index'))->where('any', '.+');


// Route::get('/', function () {
//     return view('welcome');
// });
