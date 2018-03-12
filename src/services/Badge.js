import _ from 'lodash';

class Badge {
    constructor(text, title = '', color = '') {
        this.text = text;
        this.title = title;
        this.color = color;
        this.action = chrome.browserAction;
    }

    render() {
        if (this.text === null) {
            return;
        }

        this.normalize();
        this.action.setBadgeText({text: this.text});

        if (this.title) {
            this.action.setTitle({title: this.title});
        }

        if (this.color) {
            this.action.setBadgeBackgroundColor({color: this.color});
        }
    }

    normalize() {
        let original = this.text;
        let counter = parseInt(this.text, 10);

        if (_.isInteger(counter)) {
            if (counter === 0) {
                counter = '';
            } else if (counter > 100) {
                counter = '∞';
            }

            this.setText(_.toString(counter));

            return;
        }

        this.setText(original);
    }

    setText(text) {
        if (_.isString(text)) {
            this.text = text;

            return;
        }

        this.text = '';
    }

    static reset() {
        chrome.browserAction.setBadgeText({text: ''});
    }
}

export default Badge;
