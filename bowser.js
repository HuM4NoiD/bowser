//jshint esversion: 8
require('dotenv').config({ path: '.env'});
const { chrome } = require('./methods/chrome');
const { firefox } = require('./methods/firefox');

function showHelp() {
    console.log("Usage:");
    console.log("node bowser [chrome|firefox]");
}

(async () => {
    if (!process.argv[2]) {
        showHelp();
        process.exit(1);
    }

    switch(process.argv[2]) {
        case 'chrome' : await chrome(); break;
        case 'firefox' : await firefox(); break;
        case '-h':
        case '--help': showHelp(); break;
        default: showHelp(); process.exit(1); 
    }
})();