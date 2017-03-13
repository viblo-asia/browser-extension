import _ from 'lodash';
import Storage from './Storage';
import {CHROME_SYNC_KEY} from '../constants';
import {CHROME_LOCAL_KEY} from '../constants';

class ChromeStorage {
    constructor(local, key) {
        this.key = key;
        this.storage = new Storage(local);
    }

    find(search, callback) {
        this.storage.find(this.key, search, callback);
    }

    set(data, callback) {
        this.storage.setData(this.key, data, callback);
    }

    delete(search, callback) {
        this.storage.delete(this.key, search, callback);
    }

    clear(callback) {
        this.storage.clear(callback);
    }

    getInstance() {
        return this.storage;
    }
}

let localStorage = new ChromeStorage(true, CHROME_LOCAL_KEY);
let syncedStorage = new ChromeStorage(false, CHROME_SYNC_KEY);

export {
    localStorage,
    syncedStorage
}

export function initStorages() {
    return new Promise((resolve) => {
        syncedStorage.find('options', (options) => {
            if (_.isUndefined(options)) {
                syncedStorage.set({
                    options: {
                        badgeTextType: 'newPosts',
                        newPostNotification: true
                    }
                }, () => resolve());
            }
        });

        localStorage.find('counters', (counters) => {
            if (_.isUndefined(counters)) {
                localStorage.set({
                    counters: {
                        newPosts: 0,
                        unreadNotifications: 0
                    }
                }, () => resolve());
            }
        });
    });
}
