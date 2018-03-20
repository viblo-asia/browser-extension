import { setUpApi, setAuthToken } from '~/utils/api';

import { initBadge } from './badge';
import { initQuickSearch } from './quickSearch';
import { getToken } from '../storage/oauthToken';
import { initNotifications } from './notifications';

setUpApi();
initQuickSearch();

getToken().then((token) => {
    setAuthToken(token);

    initBadge();
    initNotifications();
});
