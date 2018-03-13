import Vue from 'vue';
import store from '~/popup/store';
import { setUpApi } from '~/utils/api';
import { isDev, analyticsTrackId } from '~/config';

import App from './components/App.vue';
import Link from './components/commons/Link.vue';

import analytics from './analytics';
import ElementUI from './element-ui';

setUpApi();

if (!isDev) {
    analytics(analyticsTrackId);
}

Vue.use(ElementUI);
Vue.component('ext-link', Link);

store.dispatch('getAuthToken').then(() => {
    const app = new Vue({
        store,

        beforeCreate() {
            store.dispatch('getAuthUser');
            store.dispatch('badges/get');
        },

        render: h => h(App)
    });

    app.$mount('#app');
});
