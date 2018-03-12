import { echoUrl } from '~/config';
import * as auth from 'viblo-sdk/auth';
import * as Echo from 'viblo-sdk/echo';

import AuthService from '../services/Auth';
import Settings from '../services/Settings';
import Notifier from '../services/Notifier';

export function listenForBroadcastNotifications() {
    const connection = Echo.newConnection({
        host: echoUrl
    });

    const getUser = auth.getCurrentToken() ? AuthService.get() : new Promise(resolve => resolve(null));

    getUser.then((user) => {
        Settings.get('newPostNotification', (value) => {
            if (value) {
                const newPostsChannel = Echo.joinNewPostsChannel(connection);
                newPostsChannel.onNewPostPublished((data) => {
                    if (!user || user.id !== data.post.author.id) {
                        Notifier.sendNewPost(data);
                    }
                });
            }
        });

        if (user) {
            const privateChannel = Echo.joinPrivateChannel(user.id, connection);
            privateChannel.onNewNotification(Notifier.sendNotification);
        }
    });
}
