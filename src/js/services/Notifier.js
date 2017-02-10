import {NOTIFICATION_KEY} from '../constants';
import LocalStorage from '../storage/LocalStorage';

class Notifier {
    constructor(notification) {
        this.notification = notification;
    }

    send() {
        chrome.notifications.create(this.notification.id, this.getOptions(), (id) => {
            this.incrementCounter();
            setTimeout(() => this.close(id) , 3500);
        });
    }

    close(id) {
        chrome.notifications.clear(id);
    }

    incrementCounter() {
        let counter = LocalStorage.get(NOTIFICATION_KEY);
        let newCounter = counter ? parseInt(counter) + 1 : 1;
        LocalStorage.set(NOTIFICATION_KEY, newCounter);

        chrome.browserAction.setBadgeText({text: newCounter.toString()});
    }

    getOptions() {
        let iconUrl = '../../images/icon64.png';
        let message = this.notification.message.replace(/(<([^>]+)>)/ig, '');
        if (this.notification.hasOwnProperty('sender')) {
            iconUrl = this.notification.sender.avatar;
        }

        return {
            iconUrl,
            message,
            type: 'basic',
            isClickable: true,
            title: 'New Notification on Viblo'
        };
    }
}

export default Notifier;
