import api from '../api';
import {syncedStorage} from '../storage/ChromeStorage';
import axios from 'axios';

export default {
    authenticated: false,
    user: null,

    get() {
        return api.getUser().then((user) => {
            this.authenticated = user !== null;
            this.user = user;

            return user;
        });
    },

    getToken(callback) {
        syncedStorage.find('oauthToken', callback);
    },

    storeToken(token) {
        const data = {
            authenticated: true,
            oauthToken: `Bearer ${token}`,
            options: {
                badgeTextType: 'all',
                newPostNotification: true
            }
        };

        return new Promise((resolve) => {
            syncedStorage.set(data, resolve);
        });
    },

    login(token) {
        if (/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)) {
            const oauthToken = `Bearer ${token}`;

            axios.defaults.headers.common = {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': oauthToken
            };

            return this.get()
                .then((user) => user ? this.storeToken(token) : Promise.reject());
        }

        return Promise.reject();
    }
}
