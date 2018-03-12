import { browser } from '~/config';

export function getChromeStorage(local = false) {
    if (local) {
        return chrome.storage.local;
    }

    if (browser === 'chrome') {
        return chrome.storage.sync;
    }

    // TODO: Check for Firefox version that support storage.sync (when there's one available)
    return chrome.storage.local;
}
