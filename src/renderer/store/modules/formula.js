import { mapModel } from '@root/database'

const FormulaModel = mapModel('Formula')

const state = {
    loading: false,
    list: []
}

const getters = {
    list: state => state.list,
    count: state => state.list.length,
    getFormula: state => id => state.list.find(el => el.id == id),
    getFormulaComponentList: (state, getters) => id => {
        const formula = getters.getFormula(id)
        return undefined == formula ? [] : formula.component_list
    }
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
    LOAD_ALL({ dispatch, commit }) {
        let promise = FormulaModel.findAll({ raw: true })

        promise
            .then(formula_list => commit("SET_LIST", formula_list))
            .catch(() => dispatch('NOTIFY_ERROR', '[DBERR-FF] Impossible de récupérer la liste des formules de compétition', { root: true }))
            .finally(() => commit("STOP_LOADING"))

        return promise
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