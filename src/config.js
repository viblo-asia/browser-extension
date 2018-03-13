export const isDev = process.isDev;
export const browser = process.browser;
export const webUrl = process.env.EXTENSION_ROOT_URL;
export const apiUrl = process.env.EXTENSION_API_URL;
export const echoUrl = process.env.EXTENSION_ECHO_URL;
export const analyticsTrackId = process.env.EXTENSION_GOOGLE_ANALYTICS_ID;
export const storePage = process.browser === 'firefox'
    ? process.env.STORE_PAGE_FIREFOX
    : process.env.STORE_PAGE_CHROME;
