import _assign from 'lodash/assign';
import { get, set, StorageType } from '~/utils/storage';

export const Options = {
    NotifyNewPosts: 'notifyNewPosts',
    BadgeType: 'badgeType'
};

export const BadgeType = {
    All: 'all',
    UnreadNotifications: 'unreadNotifications',
    NewPosts: 'newPosts',
    NewQuestions: 'newQuestions'
};

export const defaultOptions = {
    [Options.BadgeType]: BadgeType.UnreadNotifications,
    [Options.NotifyNewPosts]: true
};

export const getAll = async () => await get('options', StorageType.Synced) || defaultOptions;

export function getSetting(key) {
    return getAll().then(options => options[key]);
}

export function updateSetting(settings) {
    const merge = all => set({ options: _assign({}, all, settings) }, StorageType.Synced);

    return getAll().then(merge);
}
