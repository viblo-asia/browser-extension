export default {
    get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch(e) {/* error */}
    },

    set(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch(e) {/* error */}
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch(e) {/* error */}
    },

    clear() {
        try {
            localStorage.clear();
        } catch(e) {/* error */}
    }
}
