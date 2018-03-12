import { getPostsFeed } from 'viblo-sdk/api/posts';
import { getNotifications } from 'viblo-sdk/api/me';
import { NEW_POSTS, UNREAD_NOTIFICATIONS } from '~/constants';

import Counter from '../services/Counter';
import Notifications from '../services/Notifications';

export function updateBadgeCounters(authenticated) {
    Promise.all([Notifications.getLastOpen(NEW_POSTS), getPostsFeed('newest')])
        .then(([lastOpen, posts]) => {
            const newPostsCount = posts.data.filter(post => post.published_at > lastOpen).length;

            Counter.set(NEW_POSTS, newPostsCount);
        });

    if (authenticated) {
        getNotifications()
            .then(data => Counter.set(UNREAD_NOTIFICATIONS, data.counter));
    }
}
