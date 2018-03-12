import _ from 'lodash';
import { webUrl } from '../config';

export function utmUrl(url, source, medium = 'extension', name, term, content) {
    if (!source && webUrl) {
        source = `${webUrl}_extension`;
    }

    const query = _.chain({ source, medium, name, term, content })
        .map((value, name) => (value ? `utm_${name}=${encodeURI(value)}` : null))
        .filter(param => param !== null)
        .join('&');

    const firstSeparator = url.indexOf('?') === -1 ? '?' : '&';

    return `${url}${firstSeparator}${query}`;
}

export function toPost(post) {
    if (post.url) {
        return post.url;
    }

    const path = post.system
        ? `${post.system}/${post.slug}`
        : `p/${post.slug}`;

    return `${webUrl}/${path}`;
}

export function toQuestion(question) {
    if (question.url) {
        return question.url;
    }

    const questionUrl = `q/${question.title_slug}-${question.hash_id}`;

    return `${webUrl}/${questionUrl}`;
}

export function toUser(user) {
    const username = typeof user === 'string' ? user : _.get(user, 'username');

    if (!username) {
        throw new Error('Invalid user');
    }

    return `${webUrl}/u/${user.username}`;
}
