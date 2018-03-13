import moment from 'moment';
import _get from 'lodash/get';
import { getPostsFeed } from 'viblo-sdk/api/posts';
import { getNotifications } from 'viblo-sdk/api/me';
import { getExtensionIconBadge, renderBadge } from '~/utils/extension';

import { getToken } from '../storage/oauthToken';
import { getLastOpen } from '../storage/lastOpen';
import { getAll, setBadge } from '../storage/counters';
import { getSetting, Options, BadgeType } from '../storage/options';

export async function initBadge() {
    chrome.storage.onChanged.addListener(updateExtensionIconBadge);

    Promise.all([getLastOpen(BadgeType.NewPosts), getPostsFeed('newest')])
        .then(([lastOpen, posts]) => {
            const lastOpenMoment = moment(lastOpen);
            const newPostsCount = posts.data.filter(post => lastOpenMoment < moment(post.published_at)).length;

            setBadge(BadgeType.NewPosts, newPostsCount);
        });

    const token = await getToken();
    if (token) {
        const { counter: unreadNotificationsCount } = await getNotifications();
        setBadge(BadgeType.UnreadNotifications, unreadNotificationsCount);
    }

    const allCounters = await getAll();
    setExtensionBadge(allCounters);
}

function updateExtensionIconBadge(changes, areaName) {
    const countersChanged = _get(changes, 'counters');

    if (!countersChanged || areaName !== 'local') {
        return;
    }

    setExtensionBadge(countersChanged.newValue);
}

async function setExtensionBadge(counters) {
    const badgeType = await getSetting(Options.BadgeType);
    const badgeText = getExtensionIconBadge(badgeType, counters);
    renderBadge({ text: badgeText });
}
