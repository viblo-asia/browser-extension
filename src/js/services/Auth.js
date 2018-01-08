import {syncedStorage} from '../storage/ChromeStorage'
import {self} from 'viblo-sdk/api/me'

const auth = require('viblo-sdk/auth')

export default {
    authenticated: false,
    user: null,

    get() {
        return self().then((user) => {
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
        auth.setAccessToken({
            token_type: 'Bearer',
            access_token: token
        })

        return this.get()
            .then((user) => user ? this.storeToken(token) : Promise.reject());
    }
}
