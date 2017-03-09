const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

module.exports = (envfile = '.env') => {
    if (!fs.existsSync(path.resolve(__dirname, envfile))) {
        throw new Error(`${envfile} file not found`);
    }

    const envVars = dotenv.parse(fs.readFileSync(envfile));

    return Object.keys(envVars).reduce((previous, current) => {
        previous[current] = JSON.stringify(envVars[current]);

        return previous;
    }, {});
}
