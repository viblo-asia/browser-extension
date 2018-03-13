import { setAuthToken } from '~/utils/api';

function subscribeToMutation(type, callback, store) {
    store.subscribe((mutation) => {
        if (mutation.type === type) {
            callback(mutation.payload);
        }
    });
}

export default (store) => {
    subscribeToMutation('setAuthToken', setAuthToken, store);
};
