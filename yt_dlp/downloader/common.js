const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');

function downloadMedia(url, options) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(url);
        const protocol = parsedUrl.protocol === 'https:' ? require('https') : http;

        protocol.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
            }

            const data = [];
            response.on('data', (chunk) => data.push(chunk));
            response.on('end', () => resolve(Buffer.concat(data)));
        }).on('error', reject);
    });
}

function processMedia(mediaInfo, options, downloader) {
    const outputPath = path.resolve(options.outputDir, options.outputFile);
    fs.writeFileSync(outputPath, mediaInfo);
    if (downloader) {
        downloader.process(outputPath, options);
    }
}

module.exports = {
    downloadMedia,
    processMedia,
};
