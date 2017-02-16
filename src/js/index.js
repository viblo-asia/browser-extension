import {Vue} from './bootstrap';
import App from './components/App.vue';
import Login from './components/auth/Login.vue';
import Storage from './storage/ChromeSyncStorage';

new Vue({
    el: '#app',

    data() {
        return {
            oauthToken: ''
        };
    },

    methods: {
        setAxiosHeaders() {
            window.axios.defaults.headers.common = {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': this.oauthToken
            };
        }
    },

    created() {
        let storage = new Storage();

        storage.find('oauthToken', (oauthToken) => {
            if (oauthToken) {
                this.oauthToken = oauthToken;
                this.setAxiosHeaders();
            }
        });
    },

    render(h) {
        if (this.oauthToken) {
            return h(App);
        }

        return h(Login);
    }
});
