import _ from 'lodash';
import Tab from '../services/Tab';
import Counter, {NEW_POSTS, UNREAD_NOTIFICATIONS} from '../services/Counter';
import {ROOT_URL} from '../constants';

const NotificationStore = {
    items: [],

    store(notification) {
        this.items = [...this.items, notification];
    },

    get(id, callback) {
        const notification = _.find(this.items, {id});

        if (typeof callback === 'function') {
            callback(notification);
        }

        return notification;
    },

    clear(id) {
        if (id) {
            this.items = _.filter(this.items, (item) => item.id !== id);
        }
    }
}

const getOptions = (message) => {
    const escapedMessage = message.replace(/(<([^>]+)>)/ig, '');

    return {
        iconUrl: '../../images/icon64.png',
        message: escapedMessage,
        type: 'basic',
        isClickable: true,
        title: 'New Viblo Notification'
    }
};

const send = (notification, type) => {
    chrome.notifications.create(notification.id, getOptions(notification.message), (id) => {
        NotificationStore.store(notification);

        Counter.increment(type);

        setTimeout(() => {
            chrome.notifications.clear(id);
            NotificationStore.clear(id);
        }, 5000);
    });
}

const dontNotify = [
    'Framgia\\Viblo\\Notifications\\PostPublished'
];

const targetUrl = (notification) => {
    if (notification.post) {
        const post = notification.post;

        return post.url || `${ROOT_URL}/${post.author}/posts/${post.slug}`;
    }

    return `${ROOT_URL}/notifications`;
}

export default {
    sendNotification(notification) {
        if (dontNotify.indexOf(notification.type) === -1) {
            send(notification, UNREAD_NOTIFICATIONS);
        }
    },

    sendNewPost(data) {
        send(data, NEW_POSTS)
    },

    open(id) {
        NotificationStore.get(id, (notification) => {
            if (notification) {
                const url = targetUrl(notification);
                Tab.create(url);
            }
        });
    }
}
