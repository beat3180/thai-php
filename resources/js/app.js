import './bootstrap'
require('./bootstrap');


import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
// ルートコンポーネントをインポートする
import App from './App.vue'
import store from './store' // ★　追加

new Vue({
  el: '#app',
  router, // ルーティングの定義を読み込む
  store, // ★　追加
  components: { App }, // ルートコンポーネントの使用を宣言する
  template: '<App />' // ルートコンポーネントを描画する
})
