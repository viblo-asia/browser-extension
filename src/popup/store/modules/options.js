import _clone from 'lodash/clone';
import _assign from 'lodash/assign';
import { getAll, updateSetting, defaultOptions } from '~/storage/options';

const state = {
    allOptions: defaultOptions
};

const getters = {
    all: state => _clone(state.allOptions)
};

const actions = {
    fetchStoredOptions(store) {
        return getAll().then((options) => {
            store.commit('merge', options);
        });
    },

    updateOptions(store, options) {
        return updateSetting(options).then(() => {
            store.commit('merge', options);
        });
    }
};

const mutations = {
    merge(state, options) {
        state.allOptions = _assign({}, state.allOptions, options);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
