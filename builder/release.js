const yargs = require('yargs'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const pkg = require('../package.json');
const createArchive = require('./create-archive');

const argv = yargs
    .version(false)
    .string('envfile')
    .string('browser')
    .string('version')
    .argv;

const browser = argv.browser || 'chrome';
const version = argv.version || pkg.version;

const provideEnv = webpackConfig =>
    webpackConfig({
        envfile: argv.envfile || '.env',
        browser,
        version
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

        process.stdout.write('Packing extension...\n');

        const packageName = `extension.${browser}-${version}.zip`;
        const archive = createArchive('build', 'dist', packageName);

        process.stdout.write(`Extension packed: ${archive}\n\n`);
    }
});
