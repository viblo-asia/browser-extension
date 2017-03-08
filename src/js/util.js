import _ from 'lodash';

export function getChromeStorage(local = false) {
    if (local) {
        return chrome.storage.local;
    }

    if (EXTENSION_TYPE === 'chrome-extension') {
        return chrome.storage.sync;
    }

    // TODO: Check for Firefox version that support storage.sync (when there's one available)
    return chrome.storage.local;
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
