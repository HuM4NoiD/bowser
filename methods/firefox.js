//jshint esversion: 8
const { exec, spawn } = require('child_process');
require('dotenv').config({ path: '../.env'});
const axios = require('axios').default;
const prompt = require('prompt-sync')({ sigint: true });

function cleanup() {
    exec(`rm -rf ${process.env.FRFX_DATA_PATH}/*`);
}

function openURL(url) {
    exec(`${process.env.FRFX_CMD} --new-tab ${url}`);
}

function listTargets() {
    return axios.get(`http://localhost:${process.env.FRFX_PORT}/json/list`)
        .then(value => { return value.data; });
}


exports.firefox = async () => {
    console.log(`${process.env.FRFX_CMD}, ${process.env.FRFX_PORT}, ${process.env.FRFX_DATA_PATH}`);

    var firefox;

    const commands = {
        open: 'Open Browser',
        kill: 'Kill Browser',
        clean: 'Cleanup Data',
        url: 'Open a URL in new tab',
        list: 'List firefox targets',
        end: 'END THIS!!!!!!!!!!'
    };
    
    var last = []


    while(true) {
        console.table(commands);
        let cmd = prompt('Command: ');
        switch (cmd) {
            case 'open': 
                if (!firefox) {
                    exec(`${process.env.FRFX_CMD} -CreateProfile "bowser-test ${process.env.FRFX_DATA_PATH}"`);
                    firefox = spawn(process.env.FRFX_CMD, [
                        `--remote-debugging-port 9223`
                    ]);
                }
                break;
            case 'kill': if (firefox) firefox.kill('SIGINT'); break;
            case 'clean':
                if (firefox) {
                    firefox.kill('SIGINT');
                }
                cleanup(); break;
            case 'url':
                let url = prompt('URL: ');
                openURL(url);
                break;
            case 'list':
                data = await listTargets();
                console.log(data);
                break;
            case 'end':
                if (firefox) {
                    firefox.kill('SIGINT');
                }
                cleanup();
                process.exit(0);
                break;
            default:
                console.error(`Invalid choice: ${cmd}`);
        }
    }
};