import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'

import store from './store' // ★追加　ナビゲーションガード用

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどを使うことができる
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
    //ルートにアクセス、ページが切り替わる直前に呼び出される関数
    beforeEnter(to, from, next) {
      //storeのcheck関数呼び出し
      if (store.getters['auth/check']) {
        //ログインしていればホーム画面へ
        next('/')
      } else {
        //ログインしていなければそのままログイン画面へ
        next()
      }
    }
  },
  {
    path: '/500',
    component: SystemError
  }

]

// VueRouterインスタンスを作成する
const router = new VueRouter({
    mode: 'history', // ★ 追加
  routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router
