const express = require('express');
const SocketServer = require('ws').Server;
const ChatServer = require('./ChatServer');

let WS_PORT = 80;
if (process.env.WS_PORT) {
    WS_PORT = process.env.WS_PORT;
}
let REDIS_HOST = process.env.REDIS_HOST;
let REDIS_PORT = process.env.REDIS_PORT;

console.log("env WS_PORT=", WS_PORT);
console.log("env REDIS_HOST=", REDIS_HOST);
console.log("env REDIS_PORT=", REDIS_PORT);

// create express object, bind & listen port
const app = express()
const server = app.listen(WS_PORT, () => console.log(`Listening on ${WS_PORT}`));

// health check api
app.get('/healthCheck', (req, res) => {
    res.send('Hello, I am good!');
});

// pass express to SocketServer to start WebSocket service
const wsServer = new SocketServer({ server })

const chatServer = new ChatServer(wsServer, REDIS_HOST, REDIS_PORT);
