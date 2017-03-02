import _ from 'lodash';
import Badge from './Badge';
import {localStorage} from '../storage/ChromeStorage';
import Settings from './Settings';

const COUNTERS_STORAGE_KEY = 'counters';

export const NEW_POSTS = 'newPosts';
export const UNREAD_NOTIFICATIONS = 'unreadNotifications';

export default {
    increment(type) {
        this.get(type, (value) => {
            const next = value ? value + 1 : 1;
            this.set(type, next);
        })
    },

    set(type, value) {
        return new Promise((resolve) => {
            localStorage.set({
                [COUNTERS_STORAGE_KEY]: {
                    [type]: value
                }
            }, () => {
                this.setBadgeTextContent();
                resolve();
            });
        });
    },

    get(type, callback) {
        if (typeof callback !== 'function') {
            return;
        }

        localStorage.find(COUNTERS_STORAGE_KEY, (counters) => {
            if (!counters) {
                callback(null);
            }

            const value = type ? counters[type] : counters;
            callback(value);
        });
    },

    clear(type) {
        return this.set(type, 0);
    },

    setBadgeTextContent() {
        Settings.get('badgeTextType', (type) => {
            if (type) {
                if (type === 'all') {
                    type = null;
                }

                this.get(type, (value) => {
                    const count = type ? value || 0 : _.sum(_.values(value));

                    let badge = new Badge(count);
                    badge.render();
                })
            }
        });
    }
}
