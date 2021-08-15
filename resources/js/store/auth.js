import { OK, CREATED, UNPROCESSABLE_ENTITY  } from '../util'

//ステートはデータの入れ物そのものです。ログイン中のユーザーデータなどが該当します。
const state = {
    //ユーザーのデータを保持する。
  user: null,
  //apiのデータを保持する
  apiStatus: null,
  loginErrorMessages: null,
  loginErrorMessages: null,
  registerErrorMessages: null
}

/*ゲッターはステートの内容から算出される値です。ステートとゲッターの関係はコンポーネントでいうとデータ変数と算出プロパティの関係と同様でしょう。
上の例を用いると「ユーザーがログイン中であるかどうか」をゲッターで表現することができます。*/
const getters = {
  //二重否定により空文字やnullでも確実に真偽値が返る
　check: state => !!state.user,
　//条件→true返し→false返しという式
  username: state => state.user ? state.user.name : ''
}

/*ミューテーションはステートを更新するためのメソッドです。
コンポーネントはステートを直接変更することができない仕組みになっていて、ミューテーションを介してステートを更新します。
後述のアクションと異なり、ミューテーションは同期処理でなければいけません。*/
const mutations = {
  //メソッド。第一引数はstate固定。第二引数にuser、更新目的。
  setUser(state, user) {
    state.user = user
  },
  setApiStatus(state, status) {
    state.apiStatus = status
  },
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  },
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  },
  setRegisterErrorMessages (state, messages) {
    state.registerErrorMessages = messages
  }
}

/*アクションもミューテーションと同様にステートを更新するメソッドですが、ミューテーションとの違いはアクションは非同期処理である点です。
アクションは API との通信などの非同期処理を行った後にミューテーションを呼び出してステートを更新する、といった*/
//全体的な流れ「アクション→コミットでミューテーション呼び出し→ステート更新」
const actions = {
  //メソッド。contextは固定、ミューテーションのコミット。
  //会員登録
  async register (context, data) {
    context.commit('setApiStatus', null)
    //axiosを使って会員登録apiを呼び出し。
    const response = await axios.post('/api/register', data)

    if (response.status === CREATED) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }

    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setRegisterErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },
  //ログイン
  async login(context, data) {
    //api呼び出しをコミット、statusを取得しnullに
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data)
      //login が失敗すると responseには errが代入。成功するとerr.response
      .catch(err => err.response || err)
      console.log(response.data.errors)

    //api呼び出しに成功すると内側へ
    if (response.status === OK) {
      //statusをtrueに更新。成功
      context.commit('setApiStatus', true)
      //ユーザーデータ更新
      context.commit('setUser', response.data)
      return false
    }
    //apistatusをfalseに更新。失敗
    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      /*バリデーションエラーの場合はルートコンポーネントに制御を渡さず、ページコンポーネント内でエラーの表示を行う必要があるので、
      ステータスコードが UNPROCESSABLE_ENTITY の場合は error/setCode ミューテーションを呼びません。
      代わりに loginErrorMessages にエラーメッセージをセットします。  */
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      //エラーモジュール呼び出しからの、response.statusに代入。root: trueは別モジュールを使う際に記載
      context.commit('error/setCode', response.status, { root: true })
    }
  },

    //ログアウト
    async logout (context) {
      context.commit('setApiStatus', null)
      const response = await axios.post('/api/logout')

      if (response.status === OK) {
        context.commit('setApiStatus', true)
        context.commit('setUser', null)
        return false
      }

      context.commit('setApiStatus', false)
      context.commit('error/setCode', response.status, { root: true })
  },

    // ログインユーザーチェック
  async currentUser(context) {
    context.commit('setApiStatus', null)
    //axiosを使ってuserapiの呼び出し。userデータ取得
    const response = await axios.get('/api/user')
    //axiosでresponse.dataが空文字の場合、nullを取得。||は真偽値チェックjavascript
    const user = response.data || null
    context.commit('setUser', user)
    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', user)
      return false
    }

    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true })
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
