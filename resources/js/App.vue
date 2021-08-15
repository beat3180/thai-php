<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { INTERNAL_SERVER_ERROR } from './util'

export default {
  components: {
    Navbar,
    Footer
  },

  computed: {
    errorCode () {
      //storeからエラーコードステート取得
      return this.$store.state.error.code
    }
  },
  watch: {
    //errorCodeを監視
    errorCode: {
      //ハンドラ（関数）を定義
      handler (val) {
        //エラーコードが一致していた場合、エラーページに飛ぶ
        if (val === INTERNAL_SERVER_ERROR) {
          this.$router.push('/500')
        }
      },
      //初期読み込み時にも呼び出す。
      immediate: true
    },
    //上記の処理の後、エラーコードをnullに戻す
    $route () {
      this.$store.commit('error/setCode', null)
    }
  }
}
</script>
