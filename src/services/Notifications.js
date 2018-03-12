import moment from 'moment';
import api from '../api';
import Counter from './Counter';
import { localStorage } from '../storage/ChromeStorage';
import Auth from './Auth';
import { NEW_POSTS, UNREAD_NOTIFICATIONS } from '../constants';

const LAST_OPEN_STORAGE_KEY = 'lastOpen';

export default {
    clear(type) {
        Counter.clear(type)
            .then(this.updateLastOpen.bind(this, type))
            .then(Auth.authenticated ? this.sendClearToServer.bind(this, type) : null);
    },

    updateLastOpen(type) {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');

        localStorage.set({
            [LAST_OPEN_STORAGE_KEY]: {
                [type]: now
            }
        });
    },

    sendClearToServer(type) {
        switch (type) {
            case NEW_POSTS:
                return api.updateHomepageVisit();
            case UNREAD_NOTIFICATIONS:
                return api.clearNotification();
            default:
                return undefined;
        }
    },

    getLastOpen(type) {
        return new Promise((resolve) => {
            localStorage.find(LAST_OPEN_STORAGE_KEY, (result) => {
                const lastOpen = result ? result[type] : null;
                resolve(lastOpen);
            });
        });
    }
};
