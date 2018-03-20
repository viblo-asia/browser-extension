import _get from 'lodash/get';
import _flow from 'lodash/flow';
import _fp_pick from 'lodash/fp/pick';
import _fp_join from 'lodash/fp/join';
import _fp_defaults from 'lodash/fp/defaults';
import { browser, webUrl } from '../config';

const _fp_map = require('lodash/fp/map').convert({ cap: false });

export function utmUrl(url, params) {
    const query = _flow(
        _fp_pick(['source', 'medium', 'name', 'term', 'content']),
        _fp_defaults({ source: browser, medium: 'extension' }),
        _fp_map((value, name) => `utm_${name}=${encodeURI(value)}`),
        _fp_join('&')
    )(params);

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
    const username = typeof user === 'string' ? user : _get(user, 'username');

    if (!username) {
        throw new Error('Invalid user');
    }

    return `${webUrl}/u/${username}`;
}
