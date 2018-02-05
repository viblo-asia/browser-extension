import {clearNotifications} from 'viblo-sdk/api/me'
import {search, SearchType} from 'viblo-sdk/api/search'
import axios from 'viblo-sdk/libs/axios'

export default {
    clearNotification(shouldDelete = false) {
        const params = shouldDelete ? {delete: true} : {};

        return clearNotifications(params)
            .then(() => true)
            .catch(() => false);
    },

    updateHomepageVisit() {
        return axios.put(`${EXTENSION_API_URL}/me/activity/visit/newest`)
            .then(() => true)
            .catch(() => false);
    },

    searchPost(query) {
        return search(SearchType.Post, { q: query, s: '', o: '' })
            .then((response) => response.data)
    }
}
