# Keyboard Firmware Builder
## Reasons for updating this project so much
1. Origin repo had stopped update and do not reply any issues since 21 Jan 2017
2. Readme for that is not enough for people make the project work.
3. The master of the project seems not familiar with coding in font-end

## New feature
1. support async await
2. add localstorage for separate different user
3. add database to store configuration for everybody(couch DB)
4. add watch file updating to auto compile to .js
5. add bulma.io as a new face
6. have not done yet...

## Setup
To set up the project for development, run `npm install` in the root of the project to install dependencies.

Create a `local.json` file in `src/const`, in the format(like me):

    {
    	"DB_URL": "database url",
    	"DB_NAME": "database name",
    	"API": "http://localhost:5004"
    }

## run your own compile server
First, `dfu-programmer` and `avr-gcc` is required.
```bash
$ cd server
$ node index.js
```
And then `http://localhost:5004` is your builder server(look up to local.json)

## developing
```bash
$ npm run deploy
```
And then it will auto compile your updating into `/static` folder, until you stop this server

## preview your work
```bash
$npm i -g http-server
$ cd static
$ http-server
```
voilà, `http://127.0.0.1` is your work

## deploy
1. upload folders `server` and `static` to your vps
2. start your builder server(see above)
3. http-server or apache or nginx whatever, open a link for `static`
