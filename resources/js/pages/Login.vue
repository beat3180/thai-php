<template>
  <div class="container--small">
    <ul class="tab">
    <li
        class="tab__item"
        :class="{'tab__item--active': tab === 1 }"
        @click="tab = 1"
    >Login</li>
    <li
        class="tab__item"
        :class="{'tab__item--active': tab === 2 }"
        @click="tab = 2"
    >Register</li>
    </ul>
    <div class="panel" v-show="tab === 1">
        <form class="form" @submit.prevent="login">
          <!-- auth.jsのloginErrorMessagesがある場合内側へ -->
          <div v-if="loginErrors" class="errors">
            <ul v-if="loginErrors.email">
              <!-- loginErrorMessagesを回し、keyにバインドさせて表示する -->
              <li v-for="msg in loginErrors.email" :key="msg">{{ msg }}</li>
            </ul>
            <ul v-if="loginErrors.password">
              <li v-for="msg in loginErrors.password" :key="msg">{{ msg }}</li>
            </ul>
          </div>
          <label for="login-email">Email</label>
          <input type="text" class="form__item" id="login-email"  v-model="loginForm.email">
          <label for="login-password">Password</label>
          <input type="password" class="form__item" id="login-password" v-model="loginForm.password">
          <div class="form__button">
              <button type="submit" class="button button--inverse">login</button>
          </div>
        </form>
    </div>
    <div class="panel" v-show="tab === 2">
        <form class="form" @submit.prevent="register">
            <div v-if="registerErrors" class="errors">
              <ul v-if="registerErrors.name">
                <li v-for="msg in registerErrors.name" :key="msg">{{ msg }}</li>
              </ul>
              <ul v-if="registerErrors.email">
                <li v-for="msg in registerErrors.email" :key="msg">{{ msg }}</li>
              </ul>
              <ul v-if="registerErrors.password">
                <li v-for="msg in registerErrors.password" :key="msg">{{ msg }}</li>
              </ul>
            </div>
            <label for="username">Name</label>
            <input type="text" class="form__item" id="username" v-model="registerForm.name">
            <label for="email">Email</label>
            <input type="text" class="form__item" id="email" v-model="registerForm.email">
            <label for="password">Password</label>
            <input type="password" class="form__item" id="password" v-model="registerForm.password">
            <label for="password-confirmation">Password (confirm)</label>
            <input type="password" class="form__item" id="password-confirmation" v-model="registerForm.password_confirmation">
            <div class="form__button">
                <button type="submit" class="button button--inverse">register</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 1,
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  computed: {
    //apiメソッド設置。storeのapiStatusを参照、真偽値を出す。
    apiStatus () {
      return this.$store.state.auth.apiStatus
    },
    loginErrors () {
      return this.$store.state.auth.loginErrorMessages
    },
    registerErrors () {
      return this.$store.state.auth.registerErrorMessages
    },
    /*clearError () {
      this.$store.commit('auth/setLoginErrorMessages', null)
    },*/
  },
  methods: {
    login () {
      console.log(this.loginForm)
    },
    register () {
      console.log(this.registerForm)
    },

    async register () {
    /* authストアのresigterアクションを呼び出す。  this.$storeでストア呼び出しからのdeispatchはアクションを呼び出す。
    dispatch メソッドの第一引数はアクションの名前。auth ストアを作成したときに namespaced: true として名前空間を有効化させたので、
    モジュール名を頭につけた 'auth/register' という名前でアクションを指定します*/
    //第二引数はフォームの入力値。
    await this.$store.dispatch('auth/register', this.registerForm)

    if (this.apiStatus) {
    // トップページに移動する
    /*await で非同期なアクションの処理が完了するのを待ってから（難しく言うと Promise の解決を待ってから）、
    トップページに遷移するために this.$router の push メソッドを読んでいます。
    Vue Router の設定時に Vue.use(VueRouter) と記述して VueRouter プラグインの使用を宣言したため this にルーターオブジェクトを表す $router が追加されています。*/
        this.$router.push('/')
      }
    },

    async login () {
    // authストアのloginアクションを呼び出す
    await this.$store.dispatch('auth/login', this.loginForm)
    //apistatusの判定
    if (this.apiStatus) {
      // トップページに移動する
      this.$router.push('/')
      }
    },

    clearError () {
      this.$store.commit('auth/setLoginErrorMessages', null)
      this.$store.commit('auth/setRegisterErrorMessages', null)
    }
  },
  created () {
    this.clearError()
  },

}
</script>
