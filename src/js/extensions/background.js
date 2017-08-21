import api from '../api';
import axios from 'axios';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client';
import Auth from '../services/Auth';
import quickSearch from './quickSearch';
import * as Constants from '../constants';
import Counter from '../services/Counter';
import Settings from '../services/Settings';
import Notifier from '../services/Notifier';
import Notifications from '../services/Notifications';
import { initStorages } from '../storage/ChromeStorage'

window.io = io;
initStorages().then(() => chrome.runtime.reload());

chrome.notifications.onClicked.addListener((notificationId) => {
    Notifier.open(notificationId);
});

quickSearch.init();

Auth.getToken((oauthToken) => {
    let options = {
        host: Constants.ECHO_URL,
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
    updateBadgeCounters(oauthToken ? true : false);
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

const updateBadgeCounters = (authenticated) => {
    Promise.all([Notifications.getLastOpen(Constants.NEW_POSTS), api.getNewestPosts()])
        .then(([lastOpen, posts]) => {
            const newPostsCount = posts.data.filter((post) => post.published_at > lastOpen).length;

            Counter.set(Constants.NEW_POSTS, newPostsCount);
        });

    if (authenticated) {
        api.getNotifications()
            .then((data) => Counter.set(Constants.UNREAD_NOTIFICATIONS, data.counter));
    }
}
