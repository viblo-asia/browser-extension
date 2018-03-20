import { echoUrl } from '~/config';
import * as Echo from 'viblo-sdk/echo';
import { self as getSelf } from 'viblo-sdk/api/me';
import * as notifications from '~/utils/notifications';

import { increment } from '../storage/counters';
import { getSetting, Options, BadgeType } from '../storage/options';

export async function initNotifications() {
    chrome.notifications.onClicked.addListener(notifications.open);

    listenForBroadcastEvent();
}

async function listenForBroadcastEvent() {
    const connection = Echo.newConnection({
        host: echoUrl
    });

    const authUserId = await getSelf()
        .then(_ => _.data.id)
        .catch(() => null);

    const shouldNotifyNewPosts = await getSetting(Options.NotifyNewPosts);

    if (shouldNotifyNewPosts) {
        const newPostsChannel = Echo.joinNewPostsChannel(connection);
        newPostsChannel.onNewPostPublished(notifyNewPost(authUserId));
    }

    if (authUserId) {
        const privateChannel = Echo.joinPrivateChannel(authUserId, connection);
        privateChannel.onNewNotification(notifyNewNotification);
        privateChannel.onNotificationCleared(clearUnreadNotification);
    }
}

function notifyNewPost(authUserId) {
    return (event) => {
        if (authUserId !== event.post.author.id) {
            notifications.sendNewPost(event);
            increment(BadgeType.NewPosts);
        }
    };
}

function notifyNewNotification(notification) {
    notifications.sendNotification(notification);
    increment(BadgeType.UnreadNotifications);
}

function clearUnreadNotification(event) {
    increment(BadgeType.UnreadNotifications, -1 * event.ids.length);
}
