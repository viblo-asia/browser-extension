const storePage = process.env.BROWSER === 'firefox'
    ? process.env.STORE_PAGE_FIREFOX
    : process.env.STORE_PAGE_CHROME;

export default {
    browser: process.env.BROWSER,
    webUrl: process.env.EXTENSION_ROOT_URL,
    apiUrl: process.env.EXTENSION_API_URL,
    echoUrl: process.env.EXTENSION_ECHO_URL,
    analyticsTrackId: process.env.EXTENSION_GOOGLE_ANALYTICS_ID,
    storePage
};
