// all code to spin up the node server
const http = require('http');
const app = require('./app');

// port setting
const port = process.env.PORT || 3000;

// handles the req res
const server = http.createServer(app);

server.listen(port);