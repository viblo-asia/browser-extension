class Tab {
    static create(url) {
        return new Promise((resolve, reject) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }

            chrome.tabs.create({url}, resolve);
        });
    }
}

export default Tab;
