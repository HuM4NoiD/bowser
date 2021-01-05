//jshint esversion: 8
const { exec, spawn } = require('child_process');
require('dotenv').config({ path: '../.env'});
const axios = require('axios').default;
const prompt = require('prompt-sync')({ sigint: true });

function cleanup() {
    exec(`rm -rf ${process.env.CHRM_DATA_PATH}`);
}

async function openURL(url) {
    return axios.get(`http://localhost:${process.env.CHRM_PORT}/json/new?${url}`)
        .then(res => {
           console.log(res.data); 
           return res.data;
        });
}

async function highlightTarget(id) {
    return axios.get(`http://localhost:${process.env.CHRM_PORT}/json/activate/${id}`)
        .then(res => {
            console.log(res.data);
            return id;
        });
}

exports.chrome = async () => {
    var chrome;
    
    const commands = {
        open: 'Open Browser',
        kill: 'Kill Browser',
        clean: 'Cleanup Data',
        url: 'Open a URL in new tab',
        last: 'Open last accessed URL',
        end: 'END THIS!!!!!!!!!!'
    };

    var last = [];

    while(true) {
        console.table(commands);
        let cmd = prompt('Enter Command: ');
        switch(cmd) {
            case 'open':
                if (!chrome) {
                    chrome = spawn(process.env.CHRM_CMD, [
                        `--remote-debugging-port=${process.env.CHRM_PORT}`,
                        `--user-data-dir=${process.env.CHRM_DATA_PATH}`
                    ]);
                } else console.log('Chrome Opened');
                break;
            case 'kill':
                if (chrome) chrome.kill('SIGHUP');
                break;
            case 'clean':
                if (chrome) {
                    console.log('Cleanup needs killing');
                    chrome.kill('SIGINT');
                }
                cleanup();
                break;
            case 'url': 
                let url = prompt('URL: ');
                let data = await openURL(url);
                last.unshift({url, id: data.id});
                break;
            case 'last':
                console.table(last[0]);
                await highlightTarget(last[0].id);
                break;
            case 'end':
                process.exit(0);
                break;
            default: console.error(`Invalid choice: ${cmd}`);
        }
    }
};