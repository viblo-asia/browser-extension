import api from '../api';

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
    }
}
