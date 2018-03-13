import Vue from 'vue';
import Vuex from 'vuex';
import { isDev } from '~/config';
import actions from './actions';
import mutations from './mutations';
import authPlugin from './authPlugin';

import badges from './modules/badges';
import options from './modules/options';

Vue.use(Vuex);

const state = {
    authToken: null,
    user: null,
    badges: {
        newPosts: 0,
        newQuestions: 0,
        unreadNotifications: 0
    }
};

const getters = {
    authenticated: state => state.authToken !== null
};

export default new Vuex.Store({
    strict: isDev,
    state,
    getters,
    actions,
    mutations,
    modules: {
        badges: {
            ...badges,
            namespaced: true
        },
        options: {
            ...options,
            namespaced: true
        }
    },
    plugins: [authPlugin]
});
