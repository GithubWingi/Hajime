const state = {
    loading: false,
    list: []
}

const getters = {
    count: state => state.list.length,
    list_visible: state => state.list.filter(el => el.visible),
    list_hidden: state => state.list.filter(el => !el.visible),
    getByCode: state => code => state.list.find(el => el.code === code)
}

const mutations = {
    START_LOADING(state) {
        state.loading = true
    },
    STOP_LOADING(state) {
        state.loading = false
    },
    SET_LIST(state, list) {
        if (!Array.isArray(list))
            return
        state.list = list
    }
}

const actions = {
    LOAD_ALL({ commit, rootGetters }) {
        let promise = rootGetters["database/getModel"]("ScoreType").findAll({ raw: true })

        promise
            .then(score_type_list => commit("SET_LIST", score_type_list))
            .catch(() => this.$notify.error('Impossible de récupérer la liste des types de score'))
            .finally(() => commit("STOP_LOADING"))

        return promise
    },
    GET_SCORE_ID_BY_CODE({ rootGetters }, score_code) {
        return new Promise((resolve, reject) =>
            rootGetters["database/getModel"]("ScoreType").findOne({ where: { code: score_code } })
                .then(score_type => resolve(score_type.id))
                .catch(reject)
        )
    }
}

export default {
    namespaced: true,
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    mutations,
    actions
}