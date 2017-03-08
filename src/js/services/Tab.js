import utils from '../util';

class Tab {
    static create(url, appendUtmParams = true) {
        return new Promise((resolve, reject) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            if (appendUtmParams) {
                url = utils.utmUrl(url);
            }

            chrome.tabs.create({url}, resolve);
        });
    }
}

export default Tab;
