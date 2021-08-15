<template>
  <nav class="navbar">
    <RouterLink class="navbar__brand" to="/">
      Vuesplash
    </RouterLink>
    <div class="navbar__menu">
      <!-- ログインチェック後、表示 -->
      <div v-if="isLogin" class="navbar__item">
        <button class="button">
          <i class="icon ion-md-add"></i>
          Submit a photo
        </button>
      </div>
      <!--ログインしていればネーム表示-->
      <span v-if="isLogin" class="navbar__item">
      {{ username }}
      </span>
      <!--ログインしていなければ表示-->
      <div v-else class="navbar__item">
        <RouterLink class="button button--link" to="/login">
          Login / Register
        </RouterLink>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  computed: {
    //storeのcheckメソッド呼び出し
    isLogin () {
      return this.$store.getters['auth/check']
    },
    //storeのusername呼び出し
    username () {
      return this.$store.getters['auth/username']
    }
  }
}
</script>
