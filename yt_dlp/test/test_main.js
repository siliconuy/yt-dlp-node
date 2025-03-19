const assert = require('assert');
const { main } = require('../main');
const { downloadMedia, processMedia } = require('../downloader/common');
const { getExternalDownloader } = require('../downloader/external');
const { parseOptions } = require('../utils');

describe('Main Function', function() {
    it('should download and process media', async function() {
        const options = parseOptions(['--output-dir=./test_output', '--output-file=test_output_file', 'http://example.com/media']);
        const downloader = getExternalDownloader(options);

        const mediaInfo = await downloadMedia(options.urls[0], options);
        processMedia(mediaInfo, options, downloader);

        // Check if the output file exists
        const fs = require('fs');
        const outputPath = './test_output/test_output_file';
        assert(fs.existsSync(outputPath), 'Output file should exist');
    });
});
