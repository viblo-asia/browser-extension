const path = require('path');
const fsExtra = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies
const archiver = require('archiver'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = (buildDirectory, distDirectory, archiveFile) => {
    const archive = archiver('zip', {
        zlib: {
            level: 9
        }
    });

    const buildDirectoryPath = path.resolve(__dirname, '..', buildDirectory);
    const distDirectoryPath = path.resolve(__dirname, '..', distDirectory);
    const archiveFilePath = path.resolve(distDirectoryPath, archiveFile);

    fsExtra.ensureDirSync(distDirectoryPath);
    const outputStream = fsExtra.createWriteStream(archiveFilePath);

    archive.pipe(outputStream);
    archive.directory(buildDirectoryPath, false).finalize();

    return outputStream.path;
};
