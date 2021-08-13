//ステートはデータの入れ物そのものです。ログイン中のユーザーデータなどが該当します。
const state = {
    //ユーザーのデータを保持する。
    user: null
}

/*ゲッターはステートの内容から算出される値です。ステートとゲッターの関係はコンポーネントでいうとデータ変数と算出プロパティの関係と同様でしょう。
上の例を用いると「ユーザーがログイン中であるかどうか」をゲッターで表現することができます。*/
const getters = {}

/*ミューテーションはステートを更新するためのメソッドです。
コンポーネントはステートを直接変更することができない仕組みになっていて、ミューテーションを介してステートを更新します。
後述のアクションと異なり、ミューテーションは同期処理でなければいけません。*/
const mutations = {
    //メソッド。第一引数はstate固定。第二引数にuser、更新目的。
    setUser (state, user) {
        state.user = user
    }
}

/*アクションもミューテーションと同様にステートを更新するメソッドですが、ミューテーションとの違いはアクションは非同期処理である点です。
アクションは API との通信などの非同期処理を行った後にミューテーションを呼び出してステートを更新する、といった*/
//全体的な流れ　「アクション→コミットでミューテーション呼び出し→ステート更新」
const actions = {
    //メソッド。contextは固定、ミューテーションのコミット。
    async register (context, data) {
        //axiosを使って会員登録apiを呼び出し。
        const response = await axios.post('/api/register', data)
        //commitする。
        context.commit('setUser', response.data)
    },
    async login (context, data) {
        const response = await axios.post('/api/login', data)
        context.commit('setUser', response.data)
    },

    async logout (context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
      }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
