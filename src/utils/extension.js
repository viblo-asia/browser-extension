import _get from 'lodash/get';
import _flow from 'lodash/flow';
import _reduce from 'lodash/reduce';
import { webUrl } from '~/config';
import { utmUrl } from './url';

export function getExtensionIconBadge(badgeType, counters) {
    const badgeNumber = badgeType === 'all'
        ? _reduce(counters, (acc, value) => acc + value)
        : _get(counters, badgeType, 0);

    return badgeNumber > 0 ? badgeNumber.toString() : '';
}

export function renderBadge({ text, title, color }) {
    if (color) {
        chrome.browserAction.setBadgeBackgroundColor({ color });
    }

    if (title) {
        chrome.browserAction.setTitle({ title });
    }

    if (typeof text === 'string') {
        chrome.browserAction.setBadgeText({ text });
    }
}

const formatUrl = (url, utm) => _flow(
    (url) => {
        if (/^https?:\/\//.test(url)) {
            return url;
        }

        const path = url.replace(/^\/+/, '');

        return `${webUrl}/${path}`;
    },
    url => (utm ? utmUrl(url) : url)
)(url);

export function openNewTab(url, appendUtmParams = true, active = true) {
    if (chrome.runtime.lastError) {
        throw chrome.runtime.lastError;
    }

    chrome.tabs.create({
        url: formatUrl(url, appendUtmParams),
        active
    });
}

export function updateCurrentUrl(url, appendUtmParams = true) {
    if (chrome.runtime.lastError) {
        throw chrome.runtime.lastError;
    }

    chrome.tabs.update({
        url: formatUrl(url, appendUtmParams)
    });
}
