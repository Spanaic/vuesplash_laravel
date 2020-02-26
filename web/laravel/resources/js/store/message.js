const state = {
    content: ''
}

const mutations = {
    setContent(state, { content, timeout }) {
        state.content = content

        if (typeof timeout === 'undefined') {
            timeout = 3000
        }

        // メッセージの非表示処理をmutations内に記述する
        setTimeout(() => (state.content = ''), timeout)
    }
}

export default {
    namespaced: true,
    state,
    mutations
}