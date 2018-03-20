import _get from 'lodash/get';
import { openNewTab } from '~/utils/extension';
import NotificationsManager from './notifications-manager';

/**
 * @param   {object} notification
 * @returns {NotificationOptions}
 */
const formatNotification = notification => ({
    message: notification.message,
    iconUrl: notification.iconUrl || chrome.extension.getURL('images/icon64.png'),
    type: 'basic',
    isClickable: true,
    title: notification.title || 'Viblo'
});

/**
 * @param {object} notification
 * @param {string=} notification.title
 * @param {string} notification.message
 * @param {string=} notification.iconUrl
 * @param {string} notification.url
 */
function send(notification) {
    const notificationOptions = formatNotification(notification);

    chrome.notifications.create(null, notificationOptions, (id) => {
        NotificationsManager.push({ id, notification });

        setTimeout(() => {
            chrome.notifications.clear(id);
            NotificationsManager.pop(id);
        }, 5000);
    });
}

const dontNotify = [
    'Framgia\\Viblo\\Notifications\\PostPublished'
];

export function sendNotification(event) {
    if (dontNotify.indexOf(event.type) === -1) {
        const notification = event.notification.data;
        const sender = event.notification.sender;

        send({
            url: notification.url,
            message: notification.title.text,
            iconUrl: _get(sender, 'data.avatar.0')
        });
    }
}

export function sendNewPost(event) {
    const post = event.post;

    send({
        title: 'New post published on Viblo',
        message: `${post.title} by ${post.author.name}`,
        url: event.post.url
    });
}

export function open(id) {
    const notification = NotificationsManager.get(id);

    if (notification) {
        openNewTab(notification.url);
    }
}
