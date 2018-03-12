import _ from 'lodash';
import { WEB_URL, BROWSER } from '~/js/constants';

export function getChromeStorage(local = false) {
    if (local) {
        return chrome.storage.local;
    }

    if (BROWSER === 'chrome') {
        return chrome.storage.sync;
    }

    // TODO: Check for Firefox version that support storage.sync (when there's one available)
    return chrome.storage.local;
}

export default {
    utmUrl(url, source, medium = 'extension', name, term, content) {
        if (!source && BROWSER) {
            source = `${BROWSER}_extension`;
        }

        const query = _.chain({ source, medium, name, term, content })
            .map((value, name) => (value ? `utm_${name}=${encodeURI(value)}` : null))
            .filter(param => param !== null)
            .join('&');

        const firstSeparator = url.indexOf('?') === -1 ? '?' : '&';

        return `${url}${firstSeparator}${query}`;
    },

    postUrl(post, isUserPost = true, systemCategory = 'help') {
        if (post.url) {
            return post.url;
        }

        const category = isUserPost ? _.get(post, 'user.username') : systemCategory;

        if (!category || !post.slug) {
            throw new Error('Invalid argument');
        }

        const postUrl = isUserPost ? `${category}/posts/${post.slug}` :
            `${category}/${post.slug}`;

        return `${WEB_URL}/${postUrl}`;
    },

    questionUrl(question) {
        if (question.url) {
            return question.url;
        }

        const questionUrl = `q/${question.title_slug}-${question.hash_id}`;

        return `${WEB_URL}/${questionUrl}`;
    },

    userUrl(user) {
        const username = typeof user === 'string' ? user : _.get(user, 'username');

        if (!username) {
            throw new Error('Invalid user');
        }

        return `${WEB_URL}/u/${user.username}`;
    }
};
