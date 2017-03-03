import _ from 'lodash';

export function getChromeStorage(local = false) {
    if (local) {
        return chrome.storage.local;
    }

    return chrome.storage.sync;
}

export default {
    utmUrl(url, source = EXTENSION_TYPE, medium = 'extension', name, term, content) {
        const query = _.chain({ source, medium, name, term, content })
            .map((value, name) => value ? `utm_${name}=${encodeURI(value)}` : null)
            .filter((param) => param !== null)
            .join('&');

        const firstSeparator = url.indexOf('?') === -1 ? '?' : '&';

        return `${url}${firstSeparator}${query}`;
    }
}
