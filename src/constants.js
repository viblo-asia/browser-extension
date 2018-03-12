export const CHROME_SYNC_KEY = 'VIBLO_CHROME_SYNC_DATA';
export const CHROME_LOCAL_KEY = 'VIBLO_CHROME_LOCAL_DATA';

export const BROWSER = process.env.BROWSER;

export const STORE_PAGE = process.env.BROWSER === 'firefox'
    ? process.env.STORE_PAGE_FIREFOX
    : process.env.STORE_PAGE_CHROME;

export const WEB_URL = process.env.EXTENSION_ROOT_URL;
export const API_URL = process.env.EXTENSION_API_URL;
export const ECHO_URL = process.env.EXTENSION_ECHO_URL;

export const ANALYTICS_TRACK_ID = process.env.EXTENSION_GOOGLE_ANALYTICS_ID;

export const NEW_POSTS = 'newPosts';
export const UNREAD_NOTIFICATIONS = 'unreadNotifications';
