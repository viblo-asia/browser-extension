export function getChromeStorage(local = false) {
    if (local) {
        return chrome.storage.local;
    }

    return chrome.storage.sync;
}
