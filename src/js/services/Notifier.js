import Counter from '../services/Counter';
import {localStorage} from '../storage/ChromeStorage';

class Notifier {
    constructor(notification) {
        this.notification = notification;
    }

    send() {
        let isNewPost = this.isPostPublishedNotification();
        this.storePostKey().then(() => this.buildNotification(isNewPost));
    }

    buildNotification(isNewPost) {
        chrome.notifications.create(this.notification.id, this.getOptions(), (id) => {
            Counter.increment(isNewPost);
            setTimeout(() => this.close(id) , 5000);
        });
    }

    close(id) {
        chrome.notifications.clear(id);
    }

    getOptions() {
        let iconUrl = '../../images/icon64.png';
        let message = this.notification.message.replace(/(<([^>]+)>)/ig, '');

        return {
            iconUrl,
            message,
            type: 'basic',
            isClickable: true,
            title: 'New Viblo Notification'
        };
    }

    storePostKey() {
        return new Promise((resolve) => {
            if (!this.isPostPublishedNotification()) {
                resolve();

                return;
            }

            let feedNewest = [];
            let key = this.notification.post.slug;
            localStorage.find('feedNewest', (storedKeys) => {
                if (!(storedKeys && Array.isArray(storedKeys))) {
                    storedKeys = [];
                }

                feedNewest = storedKeys.concat(key);
                localStorage.set({feedNewest}, () => resolve());
            });
        });
    }

    isPostPublishedNotification() {
        return this.notification.type === 'Framgia\\Viblo\\Notifications\\PostPublished';
    }
}

export default Notifier;
