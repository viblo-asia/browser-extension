import Storage from './Storage';
import {CHROME_SYNC_KEY} from '../constants';

class ChromeSyncStorage {
    constructor() {
        this.storage = new Storage(false);
        this.key = CHROME_SYNC_KEY;
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

    getInstance() {
        return this.storage;
    }
}

export default ChromeSyncStorage;
