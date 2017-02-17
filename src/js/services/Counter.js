import Badge from './Badge';
import {localStorage, syncedStorage} from '../storage/ChromeStorage';
let deepAssign = require('deep-assign');

class Counter {
    static increment(isNewPost) {
        localStorage.find('counters', (counters) => {
            let data = {};
            let keys = ['unreadNotifications'];
            if (isNewPost) {
                keys = keys.concat('newPosts');
            }

            keys.forEach((key) => {
                let counter = 0;
                if (counters.hasOwnProperty(key) && counters[key] >= 0) {
                    counter = counters[key] + 1;
                }

                data[key] = counter;
            });

            counters = deepAssign({}, counters, data);
            localStorage.set({counters}, () => this.setBadgeTextContent());
        });
    }

    static setBadgeTextContent() {
        this.getBagdeCounterKey().then((key) => {
            if (key) {
                localStorage.find('counters', (counters) => {
                    if (counters.hasOwnProperty(key) && counters[key] > 0) {
                        let badge = new Badge(counters[key]);
                        badge.render();
                    }
                });
            }
        });
    }

    static getBagdeCounterKey() {
        return new Promise((resolve) => {
            syncedStorage.find('options', (options) => {
                if (options && options.hasOwnProperty('badgeTextType')) {
                    let type = options.badgeTextType === 'all'
                        ? 'unreadNotifications'
                        : 'newPosts';

                    resolve(type);
                }
            });
        });
    }
}

export default Counter;
