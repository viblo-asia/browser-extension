export const isDev = process.env.EXTENSION_ENV !== 'production';
export const browser = process.env.BROWSER;
export const webUrl = process.env.EXTENSION_ROOT_URL;
export const apiUrl = process.env.EXTENSION_API_URL;
export const echoUrl = process.env.EXTENSION_ECHO_URL;
export const analyticsTrackId = process.env.EXTENSION_GOOGLE_ANALYTICS_ID;
export const storePage = process.env.BROWSER === 'firefox'
    ? process.env.STORE_PAGE_FIREFOX
    : process.env.STORE_PAGE_CHROME;
