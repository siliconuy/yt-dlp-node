const assert = require('assert');
const { downloadMedia, processMedia } = require('../downloader/common');
const { getExternalDownloader } = require('../downloader/external');
const fs = require('fs');
const path = require('path');

describe('Downloader Functions', function() {
    it('should download media', async function() {
        const url = 'http://example.com/media';
        const options = {};
        const mediaInfo = await downloadMedia(url, options);

        assert(mediaInfo.length > 0, 'Media should be downloaded');
    });

    it('should process media', function() {
        const mediaInfo = Buffer.from('test media data');
        const options = {
            outputDir: './test_output',
            outputFile: 'test_output_file'
        };
        const downloader = getExternalDownloader(options);

        processMedia(mediaInfo, options, downloader);

        const outputPath = path.resolve(options.outputDir, options.outputFile);
        assert(fs.existsSync(outputPath), 'Output file should exist');
    });
});
