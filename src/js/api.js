import axios from 'axios';
import * as Constants from './constants';

export default {
    getUser() {
        return axios.get(Constants.API_USER)
            .then((response) => Promise.resolve(response.data.data));
    },

    getNewestPosts() {
        return axios.get(Constants.API_FEED_NEWEST)
            .then((response) => Promise.resolve(response.data.data.posts));
    },

    clearNotification(shouldDelete = false) {
        const params = shouldDelete ? {delete: true} : {};

        return axios.get(Constants.API_NOTIFICATION_CLEAR, {params})
            .then(() => Promise.resolve(true))
            .catch(() => Promise.resolve(false));
    },

    updateHomepageVisit() {
        return axios.post(Constants.API_UPDATE_VISIT)
            .then(() => Promise.resolve(true))
            .catch(() => Promise.resolve(false));
    }
}
