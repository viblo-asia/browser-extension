const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

try {
    fs.accessSync(path.resolve(__dirname, '.env'), fs.R_OK);
} catch (e) {
    throw new Error('The .env file must present in your project root directory.');
}

const envVars = dotenv.parse(fs.readFileSync('.env'));

module.exports = () => {
    return Object.keys(envVars).reduce((previous, current) => {
        previous[current] = JSON.stringify(envVars[current]);

        return previous;
    }, {});
}
