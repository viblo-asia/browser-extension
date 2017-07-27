import axios from 'axios';
import * as Constants from './constants';

export default {
    getUser() {
        return axios.get(Constants.API_USER)
            .then((response) => response.data.data);
    },

    getNewestPosts() {
        return axios.get(Constants.API_FEED_NEWEST)
            .then((response) => response.data.posts);
    },

    getNotifications(page) {
        return axios.get(Constants.API_NOTIFICATIONS, { params: {page} })
            .then((response) => response.data)
    },

    clearNotification(shouldDelete = false) {
        const params = shouldDelete ? {delete: true} : {};

        return axios.post(Constants.API_NOTIFICATION_CLEAR, {params})
            .then(() => true)
            .catch(() => false);
    },

    updateHomepageVisit() {
        return axios.put(Constants.API_UPDATE_VISIT)
            .then(() => true)
            .catch(() => false);
    },

    searchPost(query) {
        return axios.get(`${Constants.API_POST_SEARCH}/?q=${query}`)
            .then((response) => response.data)
    }
}
