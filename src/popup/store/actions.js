import { sendVisit } from '~/utils/api';
import { TabTypes } from '~/utils/enums';
import { setBadge } from '~/storage/counters';
import { touchLastOpen } from '~/storage/lastOpen';
import { self as getSelf, clearNotifications } from 'viblo-sdk/api/me';
import { getToken, storeToken, removeToken } from '~/storage/oauthToken';

export default {
    getAuthToken: async (store) => {
        const token = await getToken();
        store.commit('setAuthToken', token);
    },

    getAuthUser: async (store) => {
        if (!store.state.authToken) {
            return null;
        }

        const { data: user } = await getSelf();
        store.commit('setAuthUser', user);

        return user;
    },

    storeAuthToken: (store, token) => storeToken(token).then(() => {
        store.commit('setAuthToken', token);
    }),

    logout: store => removeToken().then(() => {
        store.commit('setAuthToken', null);
    }),

    clearNewPosts: store => (store.state.user
        ? Promise.all([
            sendVisit('newest'),
            touchLastOpen(TabTypes.NewPosts),
            setBadge(TabTypes.NewPosts, 0)
        ])
        : Promise.resolve()
    ),

    clearNewQuestions: store => (store.state.user
        ? Promise.all([
            sendVisit('questions-newest'),
            touchLastOpen(TabTypes.NewQuestions),
            setBadge(TabTypes.NewQuestions, 0)
        ])
        : Promise.resolve()
    ),

    clearNotifications: store => (store.state.user
        ? Promise.all([
            clearNotifications('newest'),
            touchLastOpen(TabTypes.Notifications),
            setBadge(TabTypes.Notifications, 0)
        ])
        : Promise.resolve()
    )
};
