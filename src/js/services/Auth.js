import api from '../api';
import {syncedStorage} from '../storage/ChromeStorage';
import axios from 'axios';

export default {
    authenticated: false,
    user: null,

    get() {
        return new Promise((resolve) => {
            api.getUser().then((user) => {
                this.authenticated = user !== null;
                this.user = user
                resolve(user);
            });
        })
    },

    login(token) {
        return new Promise((resolve, reject) => {
            if (/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)) {
                const oauthToken = `Bearer ${token}`;

                const data = {
                    authenticated: true,
                    oauthToken,
                    options: {
                        badgeTextType: 'all',
                        newPostNotification: true
                    }
                };

                axios.defaults.headers.common = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': oauthToken
                };

                syncedStorage.set(data, resolve);
            } else {
                reject();
            }
        });
    }
}
