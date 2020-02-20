import _default from "vuex"

const state = {
    code: null
}

const mutations = {
    setCode(state, code) {
        state.code = code
    }
}

export default {
    namespaced: true,
    state,
    mutations
}