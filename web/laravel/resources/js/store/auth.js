import axios from "axios"
import { OK, UNPROCESSABLE_ENTITY } from '../util'

const state = {
    user: null,
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null
}

const getters = {
    check: state => !!state.user,
    // 確実に真偽値を返すために二重否定
    username: state => state.user ? state.user.name : ''
    // 仮にuserがnullの場合に呼ばれてもエラーが発生しないように空文字を返す
}

const mutations = {
    setUser(state, user) {
        state.user = user
    },
    setApiStatus(state, status) {
        state.apiStatus = status
    },
    setLoginErrorMessages(state, messages) {
        state.loginErrorMessages = messages
    },
    setRegisterErrorMessages(state, messages) {
        state.registerErrorMessages = messages
    }
}

const actions = {

    // 会員登録
    async register(context, data) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/register', data)
        if (response.status === OK) {
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

    // ログイン
    async login(context, data) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/login', data)
        // .catch(err => err.response || err)
        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setLoginErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, { root: true })
        }
    },

    // ログアウト
    async logout(context) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/logout')
        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', null)
            return false
        }
        context.commit('setApiStatus', false)
        // 変更処理が発生しないので"UNPROCESSABLE_ENTITY"が返ってこないため
        context.commit('error/setCode', response.status, { root: true })
    },

    // ログインチェック
    async currentUser(context) {
        context.commit('setApiStatus', null)
        const response = await axios.get('api/user')
        const user = response.data || null

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', user)
            return false
        }
        context.commit('setApiStatus', false)
        // 変更処理が発生しないので"UNPROCESSABLE_ENTITY"が返ってこない
        // つまりバリデーションエラーを考慮しなくて良い
        context.commit('error/setCode', response.status, { root: true })
    }
}

export default {
    namespaced: true, //通常のアクション名ではなく、'auth/register'などのモジュール名でdispatch出来る様になる
    state,
    getters,
    mutations,
    actions,
}

