import axios from "axios"
import { OK } from '../util'

const state = {
    user: null,
    apiStatus: null
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
    }
}

const actions = {
    async register(context, data) {
        const response = await axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },
    async login(context, data) {
        const response = await axios.post('/api/login', data).catch(err => err.response || err)
        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true })
    },
    async logout(context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
    },
    async currentUser(context) {
        const response = await axios.get('api/user')
        const user = response.data || null
        context.commit('setUser', user)
    }
}

export default {
    namespaced: true, //通常のアクション名ではなく、'auth/register'などのモジュール名でdispatch出来る様になる
    state,
    getters,
    mutations,
    actions,
}

