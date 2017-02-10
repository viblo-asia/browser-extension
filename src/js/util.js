export function getChromeStorage(isLocal = false) {
    if (!isLocal) {
        return chrome.storage.sync;
    }

    return chrome.storage.local;
}
