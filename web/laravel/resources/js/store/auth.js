import axios from "axios"

const state = {
    user: null
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
    }
}

const actions = {
    async register(context, data) {
        const response = await axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },
    async login(context, data) {
        const response = await axios.post('/api/login', data)
        context.commit('setUser', response.data)
    },
    async logout(context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
    }
}

export default {
    namespaced: true, //通常のアクション名ではなく、'auth/register'などのモジュール名でdispatch出来る様になる
    state,
    getters,
    mutations,
    actions,
}

