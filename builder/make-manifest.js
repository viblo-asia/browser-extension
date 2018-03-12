const _get = require('lodash/get');
const pkg = require('../package.json');

module.exports = buildEnv => (content) => {
    const manifest = JSON.parse(content.toString());
    const browser = _get(buildEnv, 'browser', 'chrome').toLowerCase();

    manifest.version = _get(buildEnv, 'version', pkg.version);

    if (browser === 'firefox') {
        manifest.applications = {
            gecko: {
                strict_min_version: '52.0a1'
            }
        };
    }

    return Buffer.from(JSON.stringify(manifest, null, 4));
};
