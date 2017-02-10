import axios from 'axios';
import Echo from 'laravel-echo';
import Tab from '../services/Tab';
import * as io from 'socket.io-client';
import Notifier from '../services/Notifier';
import Storage from '../storage/ChromeSyncStorage';
import LocalStorage from '../storage/LocalStorage';
import {ECHO_URL, USER_API, NOTIFICATION_KEY} from '../constants';

window.io = io;

let counter = LocalStorage.get(NOTIFICATION_KEY);
if (counter) {
    chrome.browserAction.setBadgeText({text: counter.toString()});
}

chrome.notifications.onClicked.addListener(() => {
    Tab.create('https://viblo.asia/notifications');
});

let storage = new Storage();
storage.find('oauthToken', (oauthToken) => {
    if (oauthToken) {
        let options = {
            host: ECHO_URL,
            broadcaster: 'socket.io',
            namespace: 'Framgia.Viblo.Events',
            reconnectionAttempts: 2,
            reconnectionDelay: 5000
        };

        options = Object.assign({}, options, {
            auth: {
                headers: {
                    'Authorization': oauthToken
                }
            }
        });

        axios.defaults.headers.common = {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': oauthToken
        };

        axios.get(USER_API)
            .then((response) => {
                let echo = new Echo(options);
                let user = response.data.data;

                echo.private(`Framgia.Viblo.Models.User.${user.id}`)
                    .notification((notification) => {
                        let notifier = new Notifier(notification);
                        notifier.send();
                    });
            });
    }
});
