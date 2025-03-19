const fs = require('fs');
const http = require('http');
const path = require('path');
const { downloadMedia, processMedia } = require('./downloader/common');
const { getExternalDownloader } = require('./downloader/external');
const { parseOptions } = require('./utils');

function main() {
    const options = parseOptions(process.argv.slice(2));
    const downloader = getExternalDownloader(options);

    options.urls.forEach(url => {
        const mediaInfo = downloadMedia(url, options);
        processMedia(mediaInfo, options, downloader);
    });
}

module.exports = { main };
