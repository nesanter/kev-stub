const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;
const staticDir = process.env.STATIC || 'static';

const host = '127.0.0.1';

const options = {
    'extensions' : [ 'html' ], // if a file isn't found, try appending .html
    'index' : 'index.html', // file to index a directory, false to disable
    'redirect' : true, // treat /foo/bar as /foo/bar/ if bar is directory
};

// allow url encoded bodies
app.use(express.urlencoded());
// allow json encoded bodies
app.use(express.json());

// can add first argument (e.g. '/foo', express...) that will
// be used as virtual path, e.g. /foo/bar will look for staticDir/bar
app.use(express.static(staticDir, options));

// "heartbeat" to check if server is running
app.get('/ok', (req, res) => {
    res.send('ok');
});

// spin up server
var server = http.createServer(app);
server.listen(port, host, () => {
    var addr = server.address()
    console.log(`listening on ${addr.address}:${addr.port}`);
})
