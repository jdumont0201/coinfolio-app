// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');

var fs = require('fs');

var privateKey = fs.readFileSync('/coinfolio/app/server/coinamics.pem');
var certificate = fs.readFileSync('/coinfolio/app/server/coinamics.crt');
var credentials = {key: privateKey, cert: certificate};
console.log(credentials)
// Get our API routes
const api = require('./routes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 80;
app.set('port', port);

const server = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
server.listen(port, () => console.log(`App running on localhost:${port}`));
httpsServer.listen(443);