import {Vue} from './bootstrap'
import App from './components/App.vue'
import {syncedStorage} from './storage/ChromeStorage'
import Link from './components/commons/Link.vue'
import axios from 'viblo-sdk/libs/axios'

Vue.component('ext-link', Link)

new Vue({
    el: '#app',

    methods: {
        initAxiosHeaders() {
            axios.defaults.baseURL = EXTENSION_API_URL
            axios.defaults.headers.common = {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        },
        loadAccessTokenFromStorage () {
            syncedStorage.find('oauthToken', (oauthToken) => {
                if (oauthToken) {
                    axios.defaults.headers.common['Authorization'] = oauthToken
                }
            })
        }
    },

    created() {
        this.initAxiosHeaders()
        this.loadAccessTokenFromStorage()
    },

    render: (h) => h(App)
})
