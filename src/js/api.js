import axios from 'axios';
import * as Constants from './constants';

export default {
    getUser() {
        return new Promise((resolve) => {
            axios.get(Constants.API_USER)
                .then((response) => {
                    resolve(response.data.data);
                }, () => {
                    resolve(null);
                });
        });
    },

    getNewestPosts() {
        return new Promise((resolve) => {
            axios.get(Constants.API_FEED_NEWEST)
                .then((response) => {
                    resolve(response.data.data.posts);
                }, () => {
                    resolve(null);
                })
        });
    },

    clearNotification(shouldDelete = false) {
        const params = shouldDelete ? {delete: true} : {};

        return new Promise((resolve) => {
            axios.get(Constants.API_NOTIFICATION_CLEAR, {params}).then(() => resolve(true))
            .catch(() => resolve(false));
        });
    },

    updateHomepageVisit() {
        return new Promise((resolve) => {
            axios.post(Constants.API_UPDATE_VISIT)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        })
    }
}
