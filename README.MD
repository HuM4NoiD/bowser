# Bowser
![Bowser](public/bowser.jpeg)

Trying out HTTP/JSON endpoints of Google Chrome and Firefox Remote Devtools

### Files 
 - [bowser.js](bowser.js): Simple command line program to interact with chrome
 - [server.js](server.js): express app

### Setup
 - Install initial packages
    ```
    yarn install
    ```
 - Set up `.env` file:
    ```
    CHRM_CMD=/path/to/google-chrome
    FRFX_CMD=/path/to/firefox
    CHRM_PORT=9222
    FRFX_PORT=9223
    CHRM_DATA_PATH=/path/to/chrome/data
    FRFX_DATA_PATH=/path/to/firefox/data
    ```
