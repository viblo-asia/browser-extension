import * as config from '~/config';
import * as auth from 'viblo-sdk/auth';
import axios from 'viblo-sdk/libs/axios';

import AuthService from '../services/Auth';
import Notifier from '../services/Notifier';
import { initStorages } from '../storage/ChromeStorage';
import { updateBadgeCounters } from './badge';
import { initQuickSearch } from './quickSearch';
import { listenForBroadcastNotifications } from './notifications';

axios.defaults.baseURL = config.apiUrl;

initStorages().then(() => chrome.runtime.reload());

chrome.notifications.onClicked.addListener((notificationId) => {
    Notifier.open(notificationId);
});

AuthService.getToken((oauthToken) => {
    auth.setAccessToken({
        token_type: 'Bearer',
        access_token: oauthToken
    });

    axios.defaults.headers.common.Accept = 'application/json';
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    initQuickSearch();
    listenForBroadcastNotifications();
    updateBadgeCounters(!!oauthToken);
});
