import _find from 'lodash/find';
import _filter from 'lodash/filter';

export default {
    items: [],

    get(id) {
        const item = _find(this.items, { id });
        return item ? item.notification : null;
    },

    push(notification) {
        this.items = [...this.items, notification];
    },

    pop(id) {
        this.items = _filter(this.items, item => item.id !== id);
    }
};
