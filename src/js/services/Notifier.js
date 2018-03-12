import _ from 'lodash';

import Tab from '../services/Tab';
import Counter from '../services/Counter';
import { ROOT_URL, NEW_POSTS, UNREAD_NOTIFICATIONS } from '../constants';

const NotificationStore = {
    items: [],

    store(notification) {
        this.items = [...this.items, notification];
    },

    get(id, callback) {
        const notification = _.find(this.items, { id });

        if (typeof callback === 'function') {
            callback(notification);
        }

        return notification;
    },

    clear(id) {
        if (id) {
            this.items = _.filter(this.items, item => item.id !== id);
        }
    }
};

const getOptions = message => ({
    message,
    iconUrl: '../../images/icon64.png',
    type: 'basic',
    isClickable: true,
    title: 'New Viblo Notification'
});

const send = (notification, type) => {
    chrome.notifications.create(notification.id, getOptions(notification.data.title.text), (id) => {
        NotificationStore.store(notification);

        Counter.increment(type);

        setTimeout(() => {
            chrome.notifications.clear(id);
            NotificationStore.clear(id);
        }, 5000);
    });
};

const dontNotify = [
    'Framgia\\Viblo\\Notifications\\PostPublished'
];

const targetUrl = (notification) => {
    if (notification.post) {
        const post = notification.post;

        return post.url || `${ROOT_URL}/${post.author}/posts/${post.slug}`;
    }

    return `${ROOT_URL}/notifications`;
};

export default {
    /**
     * @param {NewNotificationEvent} event
     */
    sendNotification(event) {
        if (dontNotify.indexOf(event.type) === -1) {
            send(event.notification, UNREAD_NOTIFICATIONS);
        }
    },

    sendNewPost(data) {
        send(data, NEW_POSTS);
    },

    open(id) {
        NotificationStore.get(id, (notification) => {
            if (notification) {
                const url = targetUrl(notification);
                Tab.create(url);
            }
        });
    }
};
