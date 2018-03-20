const _get = require('lodash/get');
const pkg = require('../package.json');

module.exports = buildEnv => (content) => {
    const manifest = JSON.parse(content.toString());
    const browser = _get(buildEnv, 'browser', 'chrome').toLowerCase();

    manifest.version = _get(buildEnv, 'version', pkg.version);
    manifest.permissions.push(process.env.ALLOW_ORIGIN);

    // Relax CSP for development to allow clearer source map
    if (process.env.NODE_ENV !== 'production') {
        manifest.content_security_policy = "script-src 'self' 'unsafe-eval'; object-src 'self'";
    }

    if (browser === 'firefox') {
        manifest.applications = {
            gecko: {
                strict_min_version: '53'
            }
        };
    }

    return Buffer.from(JSON.stringify(manifest, null, 4));
};
