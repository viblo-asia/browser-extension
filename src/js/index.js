import Vue from 'vue';
import axios from 'viblo-sdk/libs/axios';

import config from '../config';
import App from './components/App.vue';
import Link from './components/commons/Link.vue';

import analytics from './extensions/analytics';
import { syncedStorage } from './storage/ChromeStorage';

Vue.component('ext-link', Link);

axios.defaults.baseURL = config.apiUrl;

syncedStorage.find('oauthToken', (oauthToken) => {
    if (oauthToken) {
        axios.defaults.headers.common.Authorization = oauthToken;
    }
});

if (config.isDev) {
    analytics(config.analyticsTrackId);
}

const app = new Vue({
    render: h => h(App)
});

app.$mount('#app');
