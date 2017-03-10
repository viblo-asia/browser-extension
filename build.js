const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const argv = require('yargs')
    .string('envfile')
    .string('browser')
    .string('version')
    .argv;

const envfile = argv.envfile ? `.env.${argv.envfile}` : '.env';

const config = require('./webpack.config')({
    envfile,
    browser: argv.browser
});

const writeManifest = (version) => {
    const manifest = require('./manifest.example.json');
    const manifestFile = path.resolve(__dirname, './build/manifest.json');

    if (version) {
        manifest.version = version;

        fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 4));
    } else if (!fs.existsSync(manifestFile)) {
        fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 4));
    }
};

const createArchive = (browser) => {
    const cmd = browser.toLowerCase() === 'chrome' ? 'zip -rq extension.chrome.zip build' :
        browser.toLowerCase() === 'firefox' ? 'cd build && zip -rq ../extension.firefox.zip *' : null;

    if (cmd !== null) {
        const zip = require('child_process').exec(cmd);
        zip.stdout.pipe(process.stdout);
    }
}

const compiler = webpack(config);
compiler.apply(new ProgressPlugin());

compiler.run((err) => {
    if (err) {
        return;
    }

    writeManifest(argv.version);
    createArchive(argv.browser);
});

