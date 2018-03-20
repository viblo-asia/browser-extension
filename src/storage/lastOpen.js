import moment from 'moment';
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import { get, set, StorageType } from '~/utils/storage';

const STORAGE_KEY = 'lastOpen';

export const getAll = () => get(STORAGE_KEY, StorageType.Local);

export function getLastOpen(tab) {
    return getAll().then(all => _get(all, tab));
}

export async function touchLastOpen(tab) {
    const all = await getAll();
    const now = moment().toISOString();
    const next = _assign({}, all, { [tab]: now });

    return set({ [STORAGE_KEY]: next }, StorageType.Local);
}
