import {syncedStorage} from '../storage/ChromeStorage';

const OPTIONS_STORAGE_KEY = 'options';

export default {
    get(key, callback) {
        if (typeof callback !== 'function') {
            return;
        }

        syncedStorage.find(OPTIONS_STORAGE_KEY, (options) => {
            if (options === undefined) {
                options = {
                    badgeTextType: 'newPosts',
                    newPostNotification: true
                }
            }

            const value = key ? options[key] : options;
            callback(value);
        });
    }
}
