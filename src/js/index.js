import {Vue} from './bootstrap';
import App from './components/App.vue';
import {syncedStorage} from './storage/ChromeStorage';

import Link from './components/commons/Link.vue'

Vue.component('ext-link', Link)

new Vue({
    el: '#app',

    methods: {
        setAxiosHeaders(oauthToken) {
            window.axios.defaults.headers.common = {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': oauthToken
            };
        }
    },

    created() {
        syncedStorage.find('oauthToken', (oauthToken) => {
            if (oauthToken) {
                this.setAxiosHeaders(oauthToken);
            }
        });
    },

    render: (h) => h(App)
});
