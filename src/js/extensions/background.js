import axios from 'axios';
import Echo from 'laravel-echo';
import Tab from '../services/Tab';
import {API_USER} from '../constants';
import * as io from 'socket.io-client';
import Counter from '../services/Counter';
import Notifier from '../services/Notifier';
import {initStorages, syncedStorage} from '../storage/ChromeStorage'

window.io = io;
initStorages().then(() => chrome.runtime.reload());
Counter.setBadgeTextContent();

chrome.notifications.onClicked.addListener(() => {
    // TODO: create new tab which linked to post
    Tab.create('https://viblo.asia/notifications');
});

let options = {
    host: EXTENSION_ECHO_URL,
    broadcaster: 'socket.io',
    namespace: 'Framgia.Viblo.Events',
    reconnectionAttempts: 2,
    reconnectionDelay: 5000
};
let echo = new Echo(options);

echo.channel('newly-published-post')
    .notification((notification) => {
        let notifier = new Notifier(notification);
        notifier.send();
    });

syncedStorage.find('oauthToken', (oauthToken) => {
    if (oauthToken) {
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

        axios.get(API_USER)
            .then((response) => {
                let user = response.data.data;
                echo.private(`Framgia.Viblo.Models.User.${user.id}`)
                    .notification((notification) => {
                        if (notification.type === 'Framgia\\Viblo\\Notifications\\PostPublished') {
                            return;
                        }

                        let notifier = new Notifier(notification);
                        notifier.send();
                    });
            });
    }
});
