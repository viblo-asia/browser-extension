import _clone from 'lodash/clone';
import _assign from 'lodash/assign';

import { TabTypes } from '~/utils/enums';
import { getAll, setBadge } from '~/storage/counters';

const state = {
    allBadges: {
        [TabTypes.NewPosts]: 0,
        [TabTypes.NewQuestions]: 0,
        [TabTypes.Notifications]: 0
    }
};

const getters = {
    all: state => _clone(state.allBadges)
};

const actions = {
    get(store) {
        return getAll().then((storedBadges) => {
            store.commit('merge', storedBadges);
        });
    },

    clearVisibleBadge(store, type) {
        store.commit('merge', { [type]: 0 });
    },

    set(store, { type, value }) {
        return setBadge(type, value).then(() => {
            store.commit('merge', { [type]: value });
        });
    }
};

const mutations = {
    merge(state, badges) {
        state.allBadges = _assign({}, state.allBadges, badges);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
