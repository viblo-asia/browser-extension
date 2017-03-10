import axios from 'axios';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client';
import Counter from '../services/Counter';
import Notifier from '../services/Notifier';
import {initStorages, syncedStorage} from '../storage/ChromeStorage'
import Auth from '../services/Auth';
import Settings from '../services/Settings';
import quickSearch from './quickSearch';

window.io = io;
initStorages().then(() => chrome.runtime.reload());
Counter.setBadgeTextContent();

chrome.notifications.onClicked.addListener((notificationId) => {
    Notifier.open(notificationId);
});

quickSearch.init();

syncedStorage.find('oauthToken', (oauthToken) => {
    let options = {
        host: EXTENSION_ECHO_URL,
        broadcaster: 'socket.io',
        namespace: 'Framgia.Viblo.Events',
        reconnectionAttempts: 2,
        reconnectionDelay: 5000
    };

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
    }

    let echo = new Echo(options);

    listen(echo, oauthToken ? true : false);
});

const listen = (echo, authenticated) => {
    const getUser = authenticated ? Auth.get() : new Promise((resolve) => resolve(null));

    getUser.then((user) => {
        Settings.get('newPostNotification', (value) => {
            if (value) {
                echo.channel('newly-published-post')
                    .listen('Posts\\Published', (data) => {
                        if (!user || user.id !== data.post.author.id) {
                            Notifier.sendNewPost(data);
                        }
                    });
            }
        });

        if (user) {
            echo.private(`Framgia.Viblo.Models.User.${user.id}`)
                .notification((notification) => {
                    Notifier.sendNotification(notification);
                });
        }
    });
}
