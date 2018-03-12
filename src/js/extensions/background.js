import config from '~/config';
import * as auth from 'viblo-sdk/auth';
import * as Echo from 'viblo-sdk/echo';
import axios from 'viblo-sdk/libs/axios';
import { getPostsFeed } from 'viblo-sdk/api/posts';
import { getNotifications } from 'viblo-sdk/api/me';

import quickSearch from './quickSearch';
import * as Constants from '../constants';
import Counter from '../services/Counter';
import AuthService from '../services/Auth';
import Settings from '../services/Settings';
import Notifier from '../services/Notifier';
import Notifications from '../services/Notifications';
import { initStorages } from '../storage/ChromeStorage';

axios.defaults.baseURL = config.apiUrl;

initStorages().then(() => chrome.runtime.reload());

chrome.notifications.onClicked.addListener((notificationId) => {
    Notifier.open(notificationId);
});

quickSearch.init();

AuthService.getToken((oauthToken) => {
    auth.setAccessToken({
        token_type: 'Bearer',
        access_token: oauthToken
    });

    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    listen();

    updateBadgeCounters(!!oauthToken);
});

function listen() {
    const connection = Echo.newConnection({
        host: config.echoUrl
    });

    const getUser = auth.getCurrentToken() ? AuthService.get() : new Promise(resolve => resolve(null));

    getUser.then((user) => {
        Settings.get('newPostNotification', (value) => {
            if (value) {
                const newPostsChannel = Echo.joinNewPostsChannel(connection);
                newPostsChannel.onNewPostPublished((data) => {
                    if (!user || user.id !== data.post.author.id) {
                        Notifier.sendNewPost(data);
                    }
                });
            }
        });

        if (user) {
            const privateChannel = Echo.joinPrivateChannel(user.id, connection);
            privateChannel.onNewNotification(Notifier.sendNotification);
        }
    });
}

function updateBadgeCounters(authenticated) {
    Promise.all([Notifications.getLastOpen(Constants.NEW_POSTS), getPostsFeed('newest')])
        .then(([lastOpen, posts]) => {
            const newPostsCount = posts.data.filter(post => post.published_at > lastOpen).length;

            Counter.set(Constants.NEW_POSTS, newPostsCount);
        });

    if (authenticated) {
        getNotifications()
            .then(data => Counter.set(Constants.UNREAD_NOTIFICATIONS, data.counter));
    }
}
