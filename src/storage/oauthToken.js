import { get, set, StorageType } from '~/utils/storage';

export function getToken() {
    return get('oauthToken', StorageType.Synced);
}

export function storeToken(token) {
    return set({ oauthToken: token }, StorageType.Synced);
}

export function removeToken() {
    return storeToken(null);
}
