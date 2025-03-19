const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function getExternalDownloader(options) {
    if (options.externalDownloader) {
        return new ExternalDownloader(options.externalDownloader);
    }
    return null;
}

class ExternalDownloader {
    constructor(command) {
        this.command = command;
    }

    process(filePath, options) {
        const command = `${this.command} ${filePath}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing external downloader: ${error.message}`);
                return;
            }
            console.log(`External downloader output: ${stdout}`);
            if (stderr) {
                console.error(`External downloader error output: ${stderr}`);
            }
        });
    }
}

module.exports = {
    getExternalDownloader,
    ExternalDownloader,
};
