export const CHROME_SYNC_KEY = 'VIBLO_CHROME_SYNC_DATA';
export const CHROME_LOCAL_KEY = 'VIBLO_CHROME_LOCAL_DATA';

export const STORE_PAGE = BROWSER === 'chrome' ? STORE_PAGE_CHROME :
                          BROWSER === 'firefox' ? STORE_PAGE_FIREFOX :
                          STORE_PAGE_CHROME;

export const ROOT_URL = EXTENSION_ROOT_URL;
export const ECHO_URL = EXTENSION_ECHO_URL;
export const API_USER = `${EXTENSION_ROOT_URL}/api/user`;
export const API_FEED_NEWEST = `${EXTENSION_ROOT_URL}/api/feed/newest`;
export const API_NOTIFICATIONS = `${EXTENSION_ROOT_URL}/api/notifications`;
export const API_NOTIFICATION_CLEAR = `${EXTENSION_ROOT_URL}/api/notifications/clear`;
export const API_UPDATE_VISIT = `${EXTENSION_ROOT_URL}/api/updateVisit`;
export const API_POST_SEARCH = `${ROOT_URL}/api/search`;

export const NEW_POSTS = 'newPosts';
export const UNREAD_NOTIFICATIONS = 'unreadNotifications';
