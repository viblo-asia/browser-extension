import Errors from './Errors';

class Form {
    constructor(data) {
        this.originalData = data;
        for (let field in data) {
            this[field] = data[field];
        }

        this.errors = new Errors();
    }

    data() {
        let data = {};
        for (let property in this.originalData) {
            data[property] = this[property];
        }

        return data;
    }

    reset() {
        for (let field in this.originalData) {
            this[field] = '';
        }

        this.errors.clear();
    }

    submit(requestType, url) {
        return new Promise((resolve, reject) => {
            window.axios[requestType](url, this.data())
                .then((response) => {
                    this.reset();
                    resolve(response.data);
                })
                .catch((error) => {
                    this.errors.record(error.response.data);
                    reject(error.response.data);
                });
        });
    }
}

export default Form;
