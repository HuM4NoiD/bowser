//jshint esversion: 8
require('dotenv').config({ path: '.env'});
const express = require('express');
const { spawn } = require('child_process');
const { readFileSync } = require('fs');

const reqFormat = 'http://localhost:PORT/chrome?action=open'

var chrm;
var frfx;

const chrmDir = __dirname + '/chromeData/';
const frfxDir = __dirname + '/firefoxData/';

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/chrome', (req, res) => {
    if (chrome === undefined) {
        chrome = spawn(`google-chrome --remote-debugging-port=${process.env.CHRM_PORT} --user-data-dir=${process.env.CHRM_DATA_PATH}`);
    }
});

app.get('/firefox', (req, res) => {

});