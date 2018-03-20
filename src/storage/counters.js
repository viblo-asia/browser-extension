import _get from 'lodash/get';
import _assign from 'lodash/assign';
import { get, set, StorageType } from '~/utils/storage';

const COUNTERS_STORAGE_KEY = 'counters';

export const getAll = () => get(COUNTERS_STORAGE_KEY, StorageType.Local);

export async function getBadge(type) {
    const all = await getAll();
    return _get(all, type, 0);
}

export async function setBadge(type, value) {
    const all = await getAll();
    const next = _assign({}, all, {
        [type]: value
    });

    return set({ [COUNTERS_STORAGE_KEY]: next }, StorageType.Local);
}

export async function increment(type, value = 1) {
    const all = await getAll();
    const current = _get(all, type, 0);
    const next = _assign({}, all, {
        [type]: current + value
    });

    return set({ [COUNTERS_STORAGE_KEY]: next }, StorageType.Local);
}
