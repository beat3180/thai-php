//エラーコードの入れ物
const state = {
  code: null
}

//更新用のミューテーション。ほぼテンプレ
const mutations = {
  setCode (state, code) {
    state.code = code
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
