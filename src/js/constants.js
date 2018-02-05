/* eslint-disable */

export const CHROME_SYNC_KEY = 'VIBLO_CHROME_SYNC_DATA';
export const CHROME_LOCAL_KEY = 'VIBLO_CHROME_LOCAL_DATA';

export const STORE_PAGE = BROWSER === 'chrome' ? STORE_PAGE_CHROME :
                          BROWSER === 'firefox' ? STORE_PAGE_FIREFOX :
                          STORE_PAGE_CHROME;

export const ROOT_URL = EXTENSION_ROOT_URL;
export const ECHO_URL = EXTENSION_ECHO_URL;

export const NEW_POSTS = 'newPosts';
export const UNREAD_NOTIFICATIONS = 'unreadNotifications';
