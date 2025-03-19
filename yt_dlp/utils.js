const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function parseOptions(argv) {
    const options = {
        urls: [],
        outputDir: '.',
        outputFile: 'output',
        externalDownloader: null,
    };

    argv.forEach(arg => {
        if (arg.startsWith('--output-dir=')) {
            options.outputDir = arg.split('=')[1];
        } else if (arg.startsWith('--output-file=')) {
            options.outputFile = arg.split('=')[1];
        } else if (arg.startsWith('--external-downloader=')) {
            options.externalDownloader = arg.split('=')[1];
        } else {
            options.urls.push(arg);
        }
    });

    return options;
}

module.exports = {
    parseOptions,
};
