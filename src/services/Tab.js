import { utmUrl } from '../utils/url';

class Tab {
    static create(url, appendUtmParams = true, active = true) {
        return new Promise((resolve, reject) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            if (appendUtmParams) {
                url = utmUrl(url);
            }

            chrome.tabs.create({ url, active }, resolve);
        });
    }

    static update(url, appendUtmParams = true) {
        return new Promise((resolve, reject) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            if (appendUtmParams) {
                url = utmUrl(url);
            }

            chrome.tabs.update({ url }, resolve);
        });
    }
}

export default Tab;
