import _ from 'lodash';
import {localStorage} from '../storage/ChromeStorage';

const NEWEST_POST_STORAGE_KEY = 'feedNewest';

export default {
    clear() {
        this.set([]);
    },

    get() {
        return new Promise((resolve) => {
            localStorage.find(NEWEST_POST_STORAGE_KEY, (storedKeys) => {
                resolve(storedKeys);
            });
        });
    },

    set(posts, callback) {
        const data = {
            [NEWEST_POST_STORAGE_KEY]: posts
        };

        localStorage.set(data, callback);
    },

    push(post) {
        const key = post.slug;

        return new Promise((resolve) => {
            localStorage.find(NEWEST_POST_STORAGE_KEY, (storedKeys) => {
                let postKeys = storedKeys && _.isArray(storedKeys) ? storedKeys : [];

                const feedNewest = _.uniq([...postKeys, key]);
                localStorage.set({feedNewest}, resolve);
            });
        });
    }
}
