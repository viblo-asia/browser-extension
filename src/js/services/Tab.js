import utils from '../util';

class Tab {
    static create(url) {
        return new Promise((resolve, reject) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            url = utils.utmUrl(url);
            chrome.tabs.create({url}, resolve);
        });
    }
}

export default Tab;
