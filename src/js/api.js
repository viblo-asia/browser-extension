import axios from 'axios';
import {API_USER, API_FEED_NEWEST} from './constants';

export default {
    getUser() {
        return new Promise((resolve) => {
            axios.get(API_USER)
                .then((response) => {
                    resolve(response.data.data);
                }, () => {
                    resolve(null);
                });
        });
    },

    getNewestPosts() {
        return new Promise((resolve) => {
            axios.get(API_FEED_NEWEST)
                .then((response) => {
                    resolve(response.data.data.posts);
                }, () => {
                    resolve(null);
                })
        });
    }
}
