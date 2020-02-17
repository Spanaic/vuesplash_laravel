import axios from "axios"

const state = {
    user: null
}

const getters = {}

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

