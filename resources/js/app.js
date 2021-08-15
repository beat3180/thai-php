import './bootstrap'
require('./bootstrap');


import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
// ルートコンポーネントをインポートする
import App from './App.vue'
import store from './store' // ★追加

//インスタンス生成前にアクション起動、メソッドにまとめる。すでにstoreはインポート
const createApp = async () => {
  //dispatchはアクション呼び出し
  await store.dispatch('auth/currentUser')

  new Vue({
    el: '#app',
    router, // ルーティングの定義を読み込む
    store, // ★追加
    components: { App }, // ルートコンポーネントの使用を宣言する
    template: '<App />' // ルートコンポーネントを描画する
  })
}
  //ログインユーザー呼び出しメソッドをインスタンス生成後に発動。
  createApp()
