const yargs = require('yargs'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const createArchive = require('./create-archive');

const argv = yargs
    .version(false)
    .string('envfile')
    .string('browser')
    .string('version')
    .argv;

const browser = argv.browser || 'chrome';

const provideEnv = webpackConfig =>
    webpackConfig({
        envfile: argv.envfile || '.env',
        browser: argv.browser,
        version: argv.version
    });

const config = require('../webpack.config').map(provideEnv);

const compiler = webpack(config);

compiler.run((err, stats) => {
    if (!err) {
        const statsString = stats.toString({
            colors: true,
            modules: false,
            entrypoints: false
        });
        process.stdout.write(`${statsString}\n\n`);
        console.log('Packing extension...');
        createArchive('build', 'dist', `extension.${browser}.zip`);
        console.log(`Extension packed: dist/extension.${browser}.zip\n`);
    }
});
